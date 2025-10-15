import React, { useState } from 'react';
import { Award, Globe as Globe2, Video, Users, ChevronDown, Calendar, MapPin, Building2, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HistoricalSection = () => {
  const { t } = useTranslation();
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const timelineEvents = t('history.editions', { returnObjects: true }) as Array<{
    year: string;
    title: string;
    description: string;
    details: string[];
  }>;

  return (
    <section className="py-32 relative" id="history">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/612-scaled.jpg?alt=media&token=0eed06cc-b14b-4466-bbb5-6105597c5ba2"
          alt="Historia de Africagua - Foro Internacional de Agua y Energías Renovables"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="section-title">{t('history.title')}</h2>
        
        {/* General Information */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <Globe2 className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{t('history.general.title')}</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <span className="font-medium text-gray-900">{t('history.general.first_edition_label')}</span>
                  <p className="text-gray-600">{t('history.general.first_edition')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <span className="font-medium text-gray-900">{t('history.general.frequency_label')}</span>
                  <p className="text-gray-600">{t('history.general.frequency')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <span className="font-medium text-gray-900">{t('history.general.location_label')}</span>
                  <p className="text-gray-600">{t('history.general.location')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <span className="font-medium text-gray-900">{t('history.general.organizer_label')}</span>
                  <p className="text-gray-600">{t('history.general.organizer')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{t('history.impact.title')}</h3>
            </div>
            <p className="text-gray-700 mb-6">{t('history.impact.description')}</p>
            <ul className="space-y-3">
              {t('history.impact.objectives', { returnObjects: true }).map((objective, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-gray-700">{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Featured Editions - Clickable Timeline */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
          <button
            onClick={() => setIsTimelineVisible(!isTimelineVisible)}
            className="w-full p-8 flex items-center justify-between group cursor-pointer hover:bg-gray-50/50 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{t('history.featured_editions')}</h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-teal-600 font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                {isTimelineVisible ? 'Cerrar' : 'Ver más'}
              </span>
              <ChevronDown
                className={`w-8 h-8 text-teal-600 transition-all duration-500 group-hover:scale-110 ${
                  isTimelineVisible ? 'rotate-180' : 'animate-bounce'
                }`}
              />
            </div>
          </button>
          
          {/* Timeline Container with Animation */}
          <div 
            className={`
              transition-all duration-1000 ease-in-out overflow-hidden
              ${isTimelineVisible ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <div className="px-8 pb-8">
              {/* Timeline */}
              <div className="relative">
                {/* Timeline line */}
                <div 
                  className={`
                    absolute left-8 top-0 w-1 bg-gradient-to-b from-teal-500 to-blue-500 rounded-full
                    transition-all duration-1000 delay-300
                    ${isTimelineVisible ? 'h-full' : 'h-0'}
                  `}
                ></div>
                
                {/* Timeline events */}
                <div className="space-y-8">
                  {timelineEvents.map((event, index) => (
                    <div 
                      key={event.year}
                      className={`
                        relative flex items-start gap-8 transition-all duration-700 ease-out
                        ${isTimelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                      `}
                      style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                    >
                      {/* Timeline point */}
                      <div 
                        className={`
                          relative z-10 w-16 h-16 bg-white rounded-full border-4 border-teal-500 flex items-center justify-center transition-all duration-500
                          ${isTimelineVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                          ${selectedYear === event.year ? 'ring-4 ring-teal-200' : ''}
                        `}
                        style={{ transitionDelay: `${(index + 1) * 300}ms` }}
                      >
                        {getIcon(index)}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div
                          className={`
                            bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300
                            hover:scale-105 hover:shadow-xl cursor-pointer border-l-4 border-teal-500
                            ${selectedYear === event.year ? 'ring-2 ring-teal-500 bg-teal-50' : ''}
                          `}
                          onClick={() => setSelectedYear(selectedYear === event.year ? null : event.year)}
                        >
                          <div className="flex items-center justify-between gap-4 mb-4">
                            <div className="flex items-center gap-4 flex-1">
                              <h4 className="text-2xl font-bold text-gray-900">{event.year}</h4>
                              <div className="h-px bg-gray-200 flex-1"></div>
                            </div>
                            <div className="flex items-center gap-2 text-teal-600">
                              <span className="text-xs font-medium opacity-70">
                                {selectedYear === event.year ? 'Ocultar' : 'Ver detalles'}
                              </span>
                              <ChevronDown
                                className={`w-5 h-5 transition-transform duration-300 ${
                                  selectedYear === event.year ? 'rotate-180' : ''
                                }`}
                              />
                            </div>
                          </div>
                          <h5 className="text-xl font-semibold text-teal-600 mb-3">{event.title}</h5>
                          <p className="text-gray-600 mb-4">{event.description}</p>
                          
                          {/* Expandable details */}
                          {selectedYear === event.year && (
                            <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
                              <ul className="space-y-2">
                                {event.details.map((detail, detailIndex) => (
                                  <li key={detailIndex} className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-teal-600 rounded-full flex-shrink-0 mt-2"></div>
                                    <span className="text-gray-700 text-sm">{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const getIcon = (index: number) => {
  const iconClass = "w-6 h-6 text-teal-600";
  switch (index % 4) {
    case 0:
      return <Users className={iconClass} />;
    case 1:
      return <Video className={iconClass} />;
    case 2:
      return <Award className={iconClass} />;
    case 3:
      return <Globe2 className={iconClass} />;
    default:
      return <Award className={iconClass} />;
  }
};

export default HistoricalSection;