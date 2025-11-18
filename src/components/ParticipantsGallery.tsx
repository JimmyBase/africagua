import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, MapPin, Briefcase, Award, User, X, Globe, Mail, Linkedin, ExternalLink } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-10 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:rotate-90 duration-300"
          aria-label="Cerrar"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-shrink-0">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative">
                  <img
                    src={participant.image}
                    alt={participant.name}
                    className="w-48 h-48 rounded-2xl object-cover object-top shadow-xl ring-4 ring-white"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-xl shadow-lg">
                    <User className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-grow space-y-4">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{participant.name}</h2>
                <p className="text-lg font-semibold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-4">
                  {participant.title}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {participant.organization && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200 rounded-xl">
                    <Briefcase className="w-4 h-4 text-cyan-600" />
                    <span className="text-sm font-medium text-gray-700">{participant.organization}</span>
                  </div>
                )}
                {participant.country && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    <span className="text-sm font-medium text-gray-700">{participant.country}</span>
                  </div>
                )}
                {participant.role && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl shadow-md">
                    <Award className="w-4 h-4" />
                    <span className="text-sm font-medium">{participant.role}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-teal-300 to-transparent mb-6"></div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-teal-600" />
              Biografía
            </h3>
            <p className="text-gray-700 leading-relaxed text-justify">{participant.bio}</p>
          </div>

          {participant.expertise && participant.expertise.length > 0 && (
            <>
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent my-6"></div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-600" />
                  Áreas de Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {participant.expertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gradient-to-r from-cyan-100 to-teal-100 text-cyan-800 text-sm font-medium rounded-full border border-cyan-200"
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
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-cyan-50/30" id="participants">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 blur-3xl opacity-20 rounded-full"></div>
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-[#1a3d4a] to-[#2c5f6f] bg-clip-text text-transparent mb-4 relative">
              Participantes
            </h2>
            <p className="text-xl text-slate-600 relative">
              Expertos internacionales en agua y energías renovables
            </p>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, cargo u organización..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
              />
            </div>

            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all outline-none appearance-none bg-white cursor-pointer"
                >
                  <option value="all">Todos los roles</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none appearance-none bg-white cursor-pointer"
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
            <p className="text-sm text-gray-600">
              Mostrando <span className="font-bold text-teal-600">{filteredParticipants.length}</span> de <span className="font-bold">{participants.length}</span> participantes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParticipants.map((participant, index) => (
            <div
              key={index}
              onClick={() => setSelectedParticipant(participant)}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-teal-200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                    <img
                      src={participant.image}
                      alt={participant.name}
                      className="relative w-20 h-20 rounded-xl object-cover object-top shadow-md ring-2 ring-white"
                    />
                  </div>

                  <div className="flex-grow min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors line-clamp-2">
                      {participant.name}
                    </h3>
                    <p className="text-sm text-teal-600 font-medium line-clamp-2">
                      {participant.title}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {participant.organization && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Briefcase className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="line-clamp-1">{participant.organization}</span>
                    </div>
                  )}
                  {participant.country && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span>{participant.country}</span>
                    </div>
                  )}
                </div>

                {participant.role && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs font-medium rounded-full shadow-sm">
                    <Award className="w-3 h-3" />
                    {participant.role}
                  </div>
                )}

                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1 text-xs font-medium text-teal-600">
                    Ver perfil
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredParticipants.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron participantes</h3>
            <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
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
