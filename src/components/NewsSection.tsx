import React, { useState, useEffect, useMemo } from 'react';
import { fetchNews, deleteNews } from '../lib/firebase';
import {
  loadCachedTranslations,
  requestTranslation,
  type NewsTranslation
} from '../lib/newsTranslations';
import { Calendar, Lock, Trash2, Loader, CreditCard as Edit, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getLanguageConfig } from '../i18n/languages';
import NewsModal from './NewsModal';
import AdminNewsPanel from './AdminNewsPanel';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
  originalTitle?: string;
  originalSummary?: string;
  originalContent?: string;
  translations?: Record<string, { title: string; content: string }>;
}

interface NewsProps {
  onAdminClick: () => void;
}

const NewsSection = ({ onAdminClick }: NewsProps) => {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Per-news translation state for the current language.
  const [translations, setTranslations] = useState<Record<string, NewsTranslation>>({});
  const [translatingIds, setTranslatingIds] = useState<Set<string>>(new Set());
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());

  const currentLang = i18n.language?.slice(0, 2) || 'es';
  const locale = getLanguageConfig(currentLang).locale;

  // Load news from Firebase (always in Spanish, the source language).
  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await fetchNews('es');
        setNews(newsData as NewsItem[]);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [isAdminPanelOpen]);

  // When the language or the news list changes, resolve translations.
  useEffect(() => {
    if (currentLang === 'es' || news.length === 0) {
      setTranslations({});
      setTranslatingIds(new Set());
      setFailedIds(new Set());
      return;
    }

    const ids = news.map((n) => n.id);
    let cancelled = false;

    const resolve = async () => {
      // 1. Fast path: load cached translations from Supabase.
      const cached = await loadCachedTranslations(ids, currentLang);
      if (cancelled) return;

      const missing = ids.filter((id) => !cached[id]);
      setTranslations(cached);
      setFailedIds(new Set());

      // 2. For any without a cached translation, call the edge function.
      if (missing.length > 0) {
        setTranslatingIds(new Set(missing));
        for (const id of missing) {
          try {
            const result = await requestTranslation(id, currentLang);
            if (cancelled) return;
            setTranslations((prev) => ({ ...prev, [id]: result }));
            setTranslatingIds((prev) => {
              const next = new Set(prev);
              next.delete(id);
              return next;
            });
          } catch (err) {
            console.error(`Translation failed for ${id}:`, err);
            if (cancelled) return;
            setFailedIds((prev) => new Set(prev).add(id));
            setTranslatingIds((prev) => {
              const next = new Set(prev);
              next.delete(id);
              return next;
            });
          }
        }
      } else {
        setTranslatingIds(new Set());
      }
    };

    resolve();
    return () => {
      cancelled = true;
    };
  }, [currentLang, news]);

  const handleAdminClick = () => {
    const password = prompt('Introduce la clave de administrador:');
    if (password === 'AfricaguaCanarias@fuerte') {
      setIsAdmin(true);
      setIsAdminPanelOpen(true);
    }
  };

  const handleDelete = async (newsId: string, imageUrl: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta noticia?')) {
      setDeletingId(newsId);
      try {
        await deleteNews(newsId, imageUrl);
        setNews(news.filter((item) => item.id !== newsId));
      } catch (error) {
        console.error('Error deleting news:', error);
        alert('Error al eliminar la noticia. Por favor, inténtalo de nuevo.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleEdit = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setIsAdminPanelOpen(true);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Resolve the displayed title/summary/content for a news item in the active
  // language, falling back to the Spanish original when no translation exists.
  const getDisplayFields = (item: NewsItem) => {
    if (currentLang === 'es') {
      return {
        title: item.title,
        summary: item.summary || item.originalSummary || '',
        content: item.content
      };
    }
    const tr = translations[item.id];
    if (tr) {
      return { title: tr.title, summary: tr.summary, content: tr.content };
    }
    return {
      title: item.originalTitle || item.title,
      summary: item.originalSummary || item.summary || '',
      content: item.originalContent || item.content
    };
  };

  const displayNews = useMemo(
    () => news.map((item) => ({ ...item, ...getDisplayFields(item) })),
    [news, translations, currentLang]
  );

  return (
    <section className="py-32 relative" id="news">
      <div className="absolute inset-0 z-0">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/612-scaled.jpg?alt=media&token=0eed06cc-b14b-4466-bbb5-6105597c5ba2"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-12">
          <h2 className="section-title mb-0">{t('news.title')}</h2>
          <button
            onClick={isAdmin ? () => setIsAdminPanelOpen(true) : handleAdminClick}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              isAdmin ? 'bg-teal-100 hover:bg-teal-200' : 'hover:bg-gray-100'
            }`}
            title={t('news.admin_title')}
          >
            <Lock className={`w-4 h-4 ${isAdmin ? 'text-teal-600' : 'text-gray-400'}`} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
          </div>
        ) : displayNews.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayNews.map((item) => {
              const isTranslating = translatingIds.has(item.id);
              const failed = failedIds.has(item.id);
              const isTranslated = currentLang !== 'es' && !!translations[item.id];
              const showFallback = currentLang !== 'es' && !translations[item.id];

              return (
                <article
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    {isAdmin && (
                      <div className="absolute top-2 right-2 flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors"
                          title={t('news.edit')}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.imageUrl)}
                          disabled={deletingId === item.id}
                          className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                          title={t('news.delete')}
                        >
                          {deletingId === item.id ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(item.createdAt)}
                      </span>
                      {isTranslating && (
                        <span className="flex items-center gap-1 text-teal-600 text-xs">
                          <Loader className="w-3 h-3 animate-spin" />
                          {t('news.translating')}
                        </span>
                      )}
                      {failed && (
                        <span className="flex items-center gap-1 text-amber-600 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          {t('news.translation_unavailable')}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    {item.summary ? (
                      <p className="text-gray-600 line-clamp-3 mb-2">{item.summary}</p>
                    ) : (
                      <div
                        className="text-gray-600 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    )}
                    {showFallback && !isTranslating && (
                      <p className="text-xs text-gray-400 italic mb-2">
                        {t('news.showing_original')}
                      </p>
                    )}
                    <button
                      onClick={() => setSelectedNews(item)}
                      className="mt-4 text-teal-600 font-medium hover:text-teal-700 transition-colors"
                      title={t('news.read_more_title', { title: item.title })}
                    >
                      {t('news.read_more')}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">{t('news.no_news')}</p>
          </div>
        )}
      </div>

      <NewsModal
        news={selectedNews}
        translations={translations}
        translatingIds={translatingIds}
        failedIds={failedIds}
        onClose={() => setSelectedNews(null)}
      />

      <AdminNewsPanel
        isOpen={isAdminPanelOpen}
        onClose={() => {
          setIsAdminPanelOpen(false);
          setEditingNews(null);
        }}
        editingNews={editingNews}
      />
    </section>
  );
};

export default NewsSection;
