import React from 'react';
import { X, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface NewsModalProps {
  news: {
    title: string;
    content: string;
    imageUrl: string;
    createdAt: Date;
  } | null;
  onClose: () => void;
}

const NewsModal = ({ news, onClose }: NewsModalProps) => {
  const { i18n } = useTranslation();

  if (!news) return null;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(i18n.language === 'en' ? 'en-US' : i18n.language === 'fr' ? 'fr-FR' : i18n.language === 'it' ? 'it-IT' : i18n.language === 'de' ? 'de-DE' : 'es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="aspect-video overflow-hidden rounded-lg mb-6">
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Calendar className="w-4 h-4" />
            {formatDate(news.createdAt)}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">{news.title}</h2>

          <div
            className="prose prose-lg max-w-none text-justify"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsModal;