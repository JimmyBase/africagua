import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, MapPin, Briefcase, Award, User, X, ChevronRight, Building2 } from 'lucide-react';

interface Participant {
  name: string;
  title: string;
  organization?: string;
  country?: string;
  image: string;
  bio: string;
  role?: string;
  expertise?: string[];
}

interface ParticipantModalProps {
  participant: Participant | null;
  onClose: () => void;
}

const ParticipantModal: React.FC<ParticipantModalProps> = ({ participant, onClose }) => {
  if (!participant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        <button
          onClick={onClose}
          className="sticky top-6 right-6 float-right z-10 p-2.5 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:rotate-90 duration-300 border border-gray-200"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>

        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="relative">
                  <img
                    src={participant.image}
                    alt={participant.name}
                    className="w-56 h-56 rounded-xl object-cover object-top shadow-lg ring-4 ring-slate-100"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-slate-700 to-slate-900 text-white px-4 py-2 rounded-lg shadow-lg">
                    <User className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-grow space-y-5">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-3 leading-tight">{participant.name}</h2>
                <p className="text-lg font-medium text-slate-700 mb-4 leading-relaxed">
                  {participant.title}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {participant.organization && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                    <Building2 className="w-4 h-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">{participant.organization}</span>
                  </div>
                )}
                {participant.country && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                    <MapPin className="w-4 h-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">{participant.country}</span>
                  </div>
                )}
                {participant.role && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg shadow-md">
                    <Award className="w-4 h-4" />
                    <span className="text-sm font-semibold">{participant.role}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-8"></div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-5 flex items-center gap-2">
              <User className="w-6 h-6 text-slate-700" />
              Biografía
            </h3>
            <p className="text-slate-700 leading-relaxed text-justify text-base">{participant.bio}</p>
          </div>

          {participant.expertise && participant.expertise.length > 0 && (
            <>
              <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent my-8"></div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <Award className="w-6 h-6 text-slate-700" />
                  Áreas de Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {participant.expertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-slate-100 text-slate-800 text-sm font-medium rounded-lg border border-slate-200"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ParticipantsGallery = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  const speakerProfiles = t('speaker_profiles', { returnObjects: true }) as Record<string, any>;

  const participants: Participant[] = Object.values(speakerProfiles).filter(
    (profile): profile is Participant =>
      profile && typeof profile === 'object' && 'name' in profile
  );

  const countries = Array.from(new Set(participants.map(p => p.country).filter(Boolean)));
  const roles = Array.from(new Set(participants.map(p => p.role).filter(Boolean)));

  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.organization?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || participant.country === selectedCountry;
    const matchesRole = selectedRole === 'all' || participant.role === selectedRole;

    return matchesSearch && matchesCountry && matchesRole;
  });

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100" id="participants">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <h2 className="text-5xl font-bold text-slate-900 mb-4 relative">
              Participantes
            </h2>
            <p className="text-xl text-slate-600 relative font-medium">
              Expertos internacionales en agua y energías renovables
            </p>
          </div>
        </div>

        <div className="mb-10 space-y-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, cargo u organización..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-slate-300 rounded-lg focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all outline-none bg-white shadow-sm"
              />
            </div>

            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="pl-10 pr-8 py-3.5 border border-slate-300 rounded-lg focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all outline-none appearance-none bg-white cursor-pointer shadow-sm"
                >
                  <option value="all">Todos los roles</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="pl-10 pr-8 py-3.5 border border-slate-300 rounded-lg focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all outline-none appearance-none bg-white cursor-pointer shadow-sm"
                >
                  <option value="all">Todos los países</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-600 font-medium">
              Mostrando <span className="font-bold text-slate-900">{filteredParticipants.length}</span> de <span className="font-bold text-slate-900">{participants.length}</span> participantes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParticipants.map((participant, index) => (
            <div
              key={index}
              onClick={() => setSelectedParticipant(participant)}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-slate-200 hover:border-slate-400"
            >
              <div className="relative p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={participant.image}
                      alt={participant.name}
                      className="w-24 h-24 rounded-lg object-cover object-top shadow-sm ring-2 ring-slate-100 group-hover:ring-slate-300 transition-all duration-300"
                    />
                  </div>

                  <div className="flex-grow min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-slate-700 transition-colors line-clamp-2 leading-tight">
                      {participant.name}
                    </h3>
                    <p className="text-sm text-slate-600 font-medium line-clamp-2 leading-relaxed">
                      {participant.title}
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 mb-4">
                  {participant.organization && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="line-clamp-1">{participant.organization}</span>
                    </div>
                  )}
                  {participant.country && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span>{participant.country}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  {participant.role && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold rounded-lg shadow-sm">
                      <Award className="w-3 h-3" />
                      {participant.role}
                    </div>
                  )}

                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                      Ver más
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredParticipants.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-100 rounded-full mb-5">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No se encontraron participantes</h3>
            <p className="text-slate-600 font-medium">Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}
      </div>

      <ParticipantModal
        participant={selectedParticipant}
        onClose={() => setSelectedParticipant(null)}
      />
    </section>
  );
};

export default ParticipantsGallery;
