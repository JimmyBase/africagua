import React from 'react';
import { X, Calendar, Loader, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getLanguageConfig } from '../i18n/languages';
import type { NewsTranslation } from '../lib/newsTranslations';

interface NewsModalProps {
  news: {
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
  translations?: Record<string, NewsTranslation>;
  translatingIds?: Set<string>;
  failedIds?: Set<string>;
  onClose: () => void;
}

const NewsModal = ({
  news,
  translations = {},
  translatingIds = new Set(),
  failedIds = new Set(),
  onClose
}: NewsModalProps) => {
  const { t, i18n } = useTranslation();

  if (!news) return null;

  const currentLang = i18n.language?.slice(0, 2) || 'es';
  const locale = getLanguageConfig(currentLang).locale;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const isTranslating = translatingIds.has(news.id);
  const failed = failedIds.has(news.id);
  const tr = translations[news.id];

  let displayTitle = news.title;
  let displaySummary = news.summary || '';
  let displayContent = news.content;
  let showingOriginal = false;

  if (currentLang !== 'es') {
    if (tr) {
      displayTitle = tr.title;
      displaySummary = tr.summary;
      displayContent = tr.content;
    } else {
      displayTitle = news.originalTitle || news.title;
      displaySummary = news.originalSummary || news.summary || '';
      displayContent = news.originalContent || news.content;
      showingOriginal = true;
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={t('news.close')}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="aspect-video overflow-hidden rounded-lg mb-6">
            <img
              src={news.imageUrl}
              alt={displayTitle}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 flex-wrap">
            <Calendar className="w-4 h-4" />
            {formatDate(news.createdAt)}
            {isTranslating && (
              <span className="flex items-center gap-1 text-teal-600 text-xs ml-2">
                <Loader className="w-3 h-3 animate-spin" />
                {t('news.translating')}
              </span>
            )}
            {failed && (
              <span className="flex items-center gap-1 text-amber-600 text-xs ml-2">
                <AlertCircle className="w-3 h-3" />
                {t('news.translation_unavailable')}
              </span>
            )}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">{displayTitle}</h2>

          {displaySummary && (
            <p className="text-lg text-gray-700 mb-6 leading-relaxed font-medium">
              {displaySummary}
            </p>
          )}

          <div
            className="prose prose-lg max-w-none text-justify"
            dangerouslySetInnerHTML={{ __html: displayContent }}
          />

          {showingOriginal && !isTranslating && (
            <p className="text-xs text-gray-400 italic mt-6">
              {t('news.showing_original')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
