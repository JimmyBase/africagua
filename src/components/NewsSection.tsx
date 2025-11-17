import React, { useState, useEffect } from 'react';
import { fetchNews, deleteNews } from '../lib/firebase';
import { Calendar, Lock, Trash2, Loader, Edit2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NewsModal from './NewsModal';
import AdminNewsPanel from './AdminNewsPanel';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
  originalTitle?: string;
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

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await fetchNews(i18n.language);
        setNews(newsData as NewsItem[]);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [isAdminPanelOpen, i18n.language]);

  const handleAdminClick = () => {
    const password = prompt('Introduce la clave de administrador:');
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAdmin(true);
      setIsAdminPanelOpen(true);
    }
  };

  const handleDelete = async (newsId: string, imageUrl: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta noticia?')) {
      setDeletingId(newsId);
      try {
        await deleteNews(newsId, imageUrl);
        setNews(news.filter(item => item.id !== newsId));
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
    return new Intl.DateTimeFormat(i18n.language === 'en' ? 'en-US' : i18n.language === 'fr' ? 'fr-FR' : i18n.language === 'it' ? 'it-IT' : i18n.language === 'de' ? 'de-DE' : 'es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <section className="section-bg-alt" id="news">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4 mb-12">
          <h2 className="section-title mb-0">{t('news.title')}</h2>
          <button
            onClick={isAdmin ? () => setIsAdminPanelOpen(true) : handleAdminClick}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              isAdmin ? 'bg-ocean-100 hover:bg-ocean-200 text-ocean-600' : 'hover:bg-neutral-100 text-neutral-400'
            }`}
            title="Administrador de noticias"
          >
            <Lock className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-ocean-200 border-t-ocean-600"></div>
          </div>
        ) : news.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article
                key={item.id}
                className="card-elevated overflow-hidden group"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {isAdmin && (
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="w-9 h-9 bg-ocean-600 text-white rounded-lg flex items-center justify-center hover:bg-ocean-700 transition-colors shadow-medium"
                        title="Editar noticia"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.imageUrl)}
                        disabled={deletingId === item.id}
                        className="w-9 h-9 bg-coral-600 text-white rounded-lg flex items-center justify-center hover:bg-coral-700 transition-colors shadow-medium"
                        title="Eliminar noticia"
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
                  <div className="flex items-center gap-2 text-body-sm text-neutral-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    {formatDate(item.createdAt)}
                  </div>
                  <h3 className="text-h4 mb-3 line-clamp-2">{item.title}</h3>
                  <div
                    className="text-body text-neutral-600 line-clamp-3 mb-4"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                  <button
                    onClick={() => setSelectedNews(item)}
                    className="text-ocean-600 font-semibold hover:text-ocean-700 transition-colors inline-flex items-center gap-1"
                  >
                    {t('news.read_more')}
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-body-lg text-neutral-600">
              {t('news.no_news')}
            </p>
          </div>
        )}
      </div>

      <NewsModal
        news={selectedNews}
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
