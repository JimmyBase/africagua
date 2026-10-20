import React, { useState, useRef, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addNews, updateNews, storage } from '../lib/firebase';
import { requestTranslation } from '../lib/newsTranslations';
import { TRANSLATABLE_LANGUAGES } from '../i18n/languages';
import {
  X, Upload, Loader, Bold, Italic, List, Link, Undo, Redo,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Calendar, Sparkles
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AdminNewsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  editingNews?: {
    id: string;
    title: string;
    summary: string;
    content: string;
    imageUrl: string;
    createdAt: Date;
    originalTitle?: string;
    originalSummary?: string;
    originalContent?: string;
  } | null;
}

const AdminNewsPanel = ({ isOpen, onClose, editingNews }: AdminNewsPanelProps) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [publishDate, setPublishDate] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editingNews) {
      setTitle(editingNews.originalTitle || editingNews.title);
      setSummary(editingNews.originalSummary || editingNews.summary || '');
      if (editorRef.current) {
        editorRef.current.innerHTML = editingNews.originalContent || editingNews.content;
      }
      setImagePreview(editingNews.imageUrl);
      setPublishDate(editingNews.createdAt.toISOString().slice(0, 16));
    } else {
      const now = new Date();
      setPublishDate(now.toISOString().slice(0, 16));
    }
  }, [editingNews]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(t('news.admin_image_too_large'));
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const resetForm = () => {
    setTitle('');
    setSummary('');
    setImage(null);
    setImagePreview('');
    setError(null);
    setIsLoading(false);
    setIsTranslating(false);
    const now = new Date();
    setPublishDate(now.toISOString().slice(0, 16));
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentContent = editorRef.current?.innerHTML || '';

    if (!title || !currentContent) {
      setError(t('news.admin_required_fields'));
      return;
    }

    if (!editingNews && !image) {
      setError(t('news.admin_image_required'));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let imageUrl = editingNews?.imageUrl;

      if (image) {
        const imageRef = ref(storage, `news/${Date.now()}_${image.name}`);
        const uploadResult = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(uploadResult.ref);
      }

      const newsData = {
        title,
        summary,
        content: currentContent,
        imageUrl,
        createdAt: new Date(publishDate).getTime()
      };

      let newsId: string | undefined;
      if (editingNews) {
        await updateNews(editingNews.id, newsData);
        newsId = editingNews.id;
      } else {
        newsId = await addNews(newsData);
      }

      // Trigger automatic translation to all non-Spanish languages so they are
      // ready before visitors read them. Done in the background; failures are
      // non-fatal (the edge function will retry on next read).
      if (newsId) {
        setIsTranslating(true);
        try {
          await Promise.all(
            TRANSLATABLE_LANGUAGES.map((lang) =>
              requestTranslation(newsId!, lang).catch((err) =>
                console.error(`Auto-translation to ${lang} failed:`, err)
              )
            )
          );
        } catch (err) {
          console.error('Auto-translation step failed:', err);
        } finally {
          setIsTranslating(false);
        }
      }

      resetForm();
      onClose();
    } catch (error) {
      console.error('Error publishing news:', error);
      setError(t('news.admin_publish_error'));
      setIsLoading(false);
    }
  };

  const execCommand = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white z-10 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingNews ? t('news.admin_edit') : t('news.admin_publish')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={t('news.close')}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-teal-800">
              {t('news.admin_auto_translate_hint')}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('news.admin_title_label')}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('news.admin_summary_label')}
            </label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-y"
              placeholder={t('news.admin_summary_placeholder')}
            />
            <p className="text-xs text-gray-500 mt-1">
              {t('news.admin_summary_help')}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('news.admin_date_label')}
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('news.admin_content_label')}
            </label>
            <div className="border rounded-lg overflow-hidden">
              <div className="flex items-center gap-1 p-2 border-b bg-gray-50 flex-wrap">
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => execCommand('bold')} className="p-1.5 hover:bg-gray-200 rounded" title={t('news.admin_bold')}><Bold className="w-4 h-4" /></button>
                  <button type="button" onClick={() => execCommand('italic')} className="p-1.5 hover:bg-gray-200 rounded" title={t('news.admin_italic')}><Italic className="w-4 h-4" /></button>
                </div>
                <div className="w-px h-5 bg-gray-300 mx-1"></div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => execCommand('justifyLeft')} className="p-1.5 hover:bg-gray-200 rounded" title={t('news.admin_align_left')}><AlignLeft className="w-4 h-4" /></button>
                  <button type="button" onClick={() => execCommand('justifyCenter')} className="p-1.5 hover:bg-gray-200 rounded" title={t('news.admin_align_center')}><AlignCenter className="w-4 h-4" /></button>
                  <button type="button" onClick={() => execCommand('justifyRight')} className="p-1.5 hover:bg-gray-200 rounded" title={t('news.admin_align_right')}><AlignRight className="w-4 h-4" /></button>
                  <button type="button" onClick={() => execCommand('justifyFull')} className="p-1.5 hover:bg-gray-200 rounded" title={t('news.admin_justify')}><AlignJustify className="w-4 h-4" /></button>
                </div>
                <div className="w-px h-5 bg-gray-300 mx-1"></div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-1.5 hover:bg-gray-200 rounded" title={t('news.admin_list')}><List className="w-4 h-4" /></button>
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt(t('news.admin_link_prompt'));
                      if (url) execCommand('createLink', url);
                    }}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title={t('news.admin_link')}
                  ><Link className="w-4 h-4" /></button>
                </div>
                <div className="w-px h-5 bg-gray-300 mx-1"></div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => execCommand('undo')} className="p-1.5 hover:bg-gray-200 rounded" title={t('news.admin_undo')}><Undo className="w-4 h-4" /></button>
                  <button type="button" onClick={() => execCommand('redo')} className="p-1.5 hover:bg-gray-200 rounded" title={t('news.admin_redo')}><Redo className="w-4 h-4" /></button>
                </div>
              </div>

              <div
                ref={editorRef}
                contentEditable
                className="min-h-[200px] p-4 focus:outline-none"
              ></div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('news.admin_image_label')}
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
              required={!editingNews}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-teal-500 transition-colors"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
              ) : (
                <div className="text-gray-500">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p>{t('news.admin_image_hint')}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t('news.admin_cancel')}
            </button>
            <button
              type="submit"
              disabled={isLoading || isTranslating}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading || isTranslating ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  {isTranslating ? t('news.admin_translating') : t('news.admin_saving')}
                </>
              ) : (
                editingNews ? t('news.admin_save') : t('news.admin_publish_button')
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminNewsPanel;
