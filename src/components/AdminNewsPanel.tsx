import React, { useState, useRef, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addNews, updateNews, storage } from '../lib/firebase';
import { 
  X, Upload, Loader, Bold, Italic, List, Link, Undo, Redo,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Calendar, Globe
} from 'lucide-react';

interface AdminNewsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  editingNews?: {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    createdAt: Date;
    originalTitle?: string;
    originalContent?: string;
    translations?: Record<string, { title: string; content: string }>;
  } | null;
}

const AdminNewsPanel = ({ isOpen, onClose, editingNews }: AdminNewsPanelProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [publishDate, setPublishDate] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [translations, setTranslations] = useState<Record<string, { title: string; content: string }>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  useEffect(() => {
    if (editingNews) {
      setTitle(editingNews.originalTitle || editingNews.title);
      if (editorRef.current) {
        editorRef.current.innerHTML = editingNews.originalContent || editingNews.content;
      }
      setImagePreview(editingNews.imageUrl);
      setPublishDate(editingNews.createdAt.toISOString().slice(0, 16));
      setTranslations(editingNews.translations || {});
    } else {
      const now = new Date();
      setPublishDate(now.toISOString().slice(0, 16));
    }
  }, [editingNews]);

  const handleLanguageChange = (langCode: string) => {
    // Save current content before switching
    if (currentLanguage !== 'es') {
      // Save to translations (only for non-Spanish languages)
      setTranslations(prev => ({
        ...prev,
        [currentLanguage]: {
          title: title,
          content: editorRef.current?.innerHTML || ''
        }
      }));
    }
    // Note: Spanish content is automatically saved in the main title and content state variables

    // Load content for new language
    setCurrentLanguage(langCode);
    if (langCode === 'es') {
      // Load main content (Spanish)
      setTitle(editingNews?.originalTitle || editingNews?.title || '');
      if (editorRef.current) {
        editorRef.current.innerHTML = editingNews?.originalContent || editingNews?.content || '';
      }
    } else {
      // Load translation
      const translation = translations[langCode] || editingNews?.translations?.[langCode];
      setTitle(translation?.title || '');
      if (editorRef.current) {
        editorRef.current.innerHTML = translation?.content || '';
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('La imagen no debe superar los 5MB');
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
    setContent('');
    setImage(null);
    setImagePreview('');
    setError(null);
    setIsLoading(false);
    setCurrentLanguage('es');
    setTranslations({});
    const now = new Date();
    setPublishDate(now.toISOString().slice(0, 16));
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save current content before submitting
    const currentContent = editorRef.current?.innerHTML || '';
    let finalTranslations = { ...translations };
    
    // Determine base content (Spanish)
    let baseTitle = title;
    let baseContent = currentContent;
    
    if (currentLanguage !== 'es') {
      // If we're currently editing a non-Spanish language, save it as translation
      finalTranslations[currentLanguage] = {
        title: title,
        content: currentContent
      };
      // Use the original Spanish content as base
      baseTitle = editingNews?.originalTitle || editingNews?.title || '';
      baseContent = editingNews?.originalContent || editingNews?.content || '';
    }

    if (!baseTitle || !baseContent) {
      setError('El título y el contenido en español son obligatorios');
      return;
    }

    if (!editingNews && !image) {
      setError('La imagen es obligatoria para nuevas noticias');
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
        title: baseTitle,
        content: baseContent,
        imageUrl,
        createdAt: new Date(publishDate).getTime(),
        translations: finalTranslations
      };

      if (editingNews) {
        await updateNews(editingNews.id, newsData);
      } else {
        await addNews(newsData);
      }

      resetForm();
      onClose();
    } catch (error) {
      console.error('Error publishing news:', error);
      setError('Error al publicar la noticia. Por favor, inténtalo de nuevo.');
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
            {editingNews ? 'Editar Noticia' : 'Publicar Noticia'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
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

          {/* Language Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Globe className="w-4 h-4 inline mr-2" />
              Idioma de edición
            </label>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentLanguage === lang.code
                      ? 'bg-teal-100 text-teal-700 border-2 border-teal-300'
                      : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.name}</span>
                  {lang.code === 'es' && <span className="text-xs">(Base)</span>}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título ({languages.find(l => l.code === currentLanguage)?.name})
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required={currentLanguage === 'es'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de publicación
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
              Contenido ({languages.find(l => l.code === currentLanguage)?.name})
            </label>
            <div className="border rounded-lg overflow-hidden">
              <div className="flex items-center gap-1 p-2 border-b bg-gray-50 flex-wrap">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => execCommand('bold')}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Negrita"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => execCommand('italic')}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Cursiva"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                </div>

                <div className="w-px h-5 bg-gray-300 mx-1"></div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => execCommand('justifyLeft')}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Alinear a la izquierda"
                  >
                    <AlignLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => execCommand('justifyCenter')}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Centrar"
                  >
                    <AlignCenter className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => execCommand('justifyRight')}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Alinear a la derecha"
                  >
                    <AlignRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => execCommand('justifyFull')}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Justificar"
                  >
                    <AlignJustify className="w-4 h-4" />
                  </button>
                </div>

                <div className="w-px h-5 bg-gray-300 mx-1"></div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => execCommand('insertUnorderedList')}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Lista"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt('Introduce la URL:');
                      if (url) execCommand('createLink', url);
                    }}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Enlace"
                  >
                    <Link className="w-4 h-4" />
                  </button>
                </div>

                <div className="w-px h-5 bg-gray-300 mx-1"></div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => execCommand('undo')}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Deshacer"
                  >
                    <Undo className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => execCommand('redo')}
                    className="p-1.5 hover:bg-gray-200 rounded"
                    title="Rehacer"
                  >
                    <Redo className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                ref={editorRef}
                contentEditable
                className="min-h-[200px] p-4 focus:outline-none"
                onInput={(e) => setContent(e.currentTarget.innerHTML)}
              ></div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen
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
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-48 mx-auto rounded-lg"
                />
              ) : (
                <div className="text-gray-500">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p>Haz clic para subir una imagen (máx. 5MB)</p>
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
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  {editingNews ? 'Guardando...' : 'Publicando...'}
                </>
              ) : (
                editingNews ? 'Guardar cambios' : 'Publicar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminNewsPanel;