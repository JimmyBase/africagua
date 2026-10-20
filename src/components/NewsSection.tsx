import React, { useState, useEffect } from 'react';
import { fetchNews, deleteNews } from '../lib/firebase';
import { Calendar, Lock, Trash2, Loader, CreditCard as Edit } from 'lucide-react';
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
          <h2 className="section-title mb-0">Noticias Africagua</h2>
          <button
            onClick={isAdmin ? () => setIsAdminPanelOpen(true) : handleAdminClick}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              isAdmin ? 'bg-teal-100 hover:bg-teal-200' : 'hover:bg-gray-100'
            }`}
            title="Administrador de noticias Africagua"
          >
            <Lock className={`w-4 h-4 ${isAdmin ? 'text-teal-600' : 'text-gray-400'}`} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
          </div>
        ) : news.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={`Noticia Africagua: ${item.title}`}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  {isAdmin && (
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors"
                        title="Editar noticia Africagua"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.imageUrl)}
                        disabled={deletingId === item.id}
                        className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        title="Eliminar noticia Africagua"
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
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <div 
                    className="text-gray-600 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                  <button 
                    onClick={() => setSelectedNews(item)}
                    className="mt-4 text-teal-600 font-medium hover:text-teal-700 transition-colors"
                    title={`Leer más sobre ${item.title}`}
                  >
                    {t('news.read_more')}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No hay noticias de Africagua disponibles en este momento.</p>
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