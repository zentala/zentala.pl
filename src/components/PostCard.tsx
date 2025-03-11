import React from 'react';
import type { CollectionEntry } from 'astro:content';
import { formatDate } from '../utils/date';

interface PostCardProps {
  post: CollectionEntry<'blog'>;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { id, data } = post;
  const { 
    title, 
    description, 
    pubDate, 
    heroImage, 
    heroVideo, 
    heroAudio, 
    tags = [], 
    type = 'text', 
    size = 'medium' 
  } = data;

  // Określ klasy w zależności od rozmiaru posta
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 row-span-2',
    large: 'col-span-2 row-span-2',
  }[size];

  // Określ maksymalną długość opisu w zależności od rozmiaru
  const maxDescriptionLength = {
    small: 60,
    medium: 120,
    large: 200,
  }[size];

  const truncatedDescription = description && description.length > maxDescriptionLength 
    ? `${description.substring(0, maxDescriptionLength)}...` 
    : description;

  // Wylicz przybliżony czas czytania (5 słów na sekundę, 300 słów na minutę)
  const readingTime = description ? Math.max(1, Math.ceil(description.split(' ').length / 300)) : 1;

  // Renderowanie mediów w zależności od typu posta
  const renderMedia = () => {
    if (heroVideo && type === 'video') {
      return (
        <div className="relative pb-[56.25%] overflow-hidden group">
          <iframe 
            src={heroVideo} 
            className="absolute top-0 left-0 w-full h-full" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <div className="text-white font-semibold">Odtwórz film</div>
          </div>
        </div>
      );
    } else if (heroAudio && type === 'audio') {
      return (
        <div className="relative overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-24 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <audio 
            className="w-full" 
            controls
            src={heroAudio}
          />
        </div>
      );
    } else if (heroImage) {
      return (
        <div className="overflow-hidden">
          <img 
            className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 hover:scale-105"
            src={heroImage} 
            alt={title} 
            loading="lazy"
          />
        </div>
      );
    } else {
      // Domyślny obrazek dla postów bez mediów
      return (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      );
    }
  };

  // Ikona dla typu postu
  const typeIcon = () => {
    switch (type) {
      case 'video':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'audio':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.829-9.9a9 9 0 0112.728 0" />
          </svg>
        );
      case 'infographic':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        );
    }
  };

  return (
    <div 
      className={`post-card ${sizeClasses} flex flex-col h-full`}
      data-size={size}
    >
      <a href={`/blog/${id}`} className="block h-full">
        {renderMedia()}
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <a 
                key={tag} 
                href={`/tag/${tag}`}
                className="tag"
                onClick={(e) => e.stopPropagation()}
              >
                {tag}
              </a>
            ))}
          </div>
          <h2 className="text-xl font-bold mb-3 text-neutral-800 dark:text-neutral-100">{title}</h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4 flex-grow">{truncatedDescription}</p>
          <div className="flex justify-between items-center text-neutral-500 dark:text-neutral-400 text-xs mt-auto">
            <span>{formatDate(pubDate)}</span>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readingTime} min
              </span>
              <span className="flex items-center capitalize">
                {typeIcon()}
                {type}
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default PostCard;