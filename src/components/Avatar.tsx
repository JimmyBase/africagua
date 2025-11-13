import React, { useState } from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt: string;
  name: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function Avatar({ src, alt, name, size = 'medium', className = '' }: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const getInitials = (fullName: string): string => {
    const names = fullName.trim().split(' ');
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-8 h-8 text-xs';
      case 'medium':
        return 'w-10 h-10 text-sm';
      case 'large':
        return 'w-32 h-32 text-3xl';
      default:
        return 'w-10 h-10 text-sm';
    }
  };

  const getGradient = (name: string): string => {
    const gradients = [
      'bg-gradient-to-br from-teal-400 to-teal-600',
      'bg-gradient-to-br from-blue-400 to-blue-600',
      'bg-gradient-to-br from-green-400 to-green-600',
      'bg-gradient-to-br from-red-400 to-red-600',
      'bg-gradient-to-br from-orange-400 to-orange-600',
    ];
    const index = name.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  return (
    <div className={`relative ${getSizeClasses()} rounded-full overflow-hidden ${className}`}>
      {src && !imageError ? (
        <>
          {imageLoading && (
            <div className={`absolute inset-0 ${getGradient(name)} flex items-center justify-center`}>
              <span className="text-white font-bold animate-pulse">
                {getInitials(name)}
              </span>
            </div>
          )}
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-top"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </>
      ) : (
        <div className={`w-full h-full ${getGradient(name)} flex items-center justify-center shadow-lg`}>
          <span className="text-white font-bold">
            {getInitials(name)}
          </span>
        </div>
      )}
    </div>
  );
}
