import React from 'react';
import type { CollectionEntry } from 'astro:content';
import { formatDate } from '../utils/date';

interface PostCardProps {
  post: CollectionEntry<'blog'>;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { slug, data } = post;
  const { 
    title, 
    description, 
    pubDate, 
    heroImage, 
    heroVideo, 
    heroAudio, 
    tags, 
    type, 
    size 
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

  const truncatedDescription = description.length > maxDescriptionLength 
    ? `${description.substring(0, maxDescriptionLength)}...` 
    : description;

  // Renderowanie mediów w zależności od typu posta
  const renderMedia = () => {
    if (heroVideo && type === 'video') {
      return (
        <div className="relative pb-[56.25%] overflow-hidden">
          <iframe 
            src={heroVideo} 
            className="absolute top-0 left-0 w-full h-full" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </div>
      );
    } else if (heroAudio && type === 'audio') {
      return (
        <audio 
          className="w-full mt-2" 
          controls
          src={heroAudio}
        />
      );
    } else if (heroImage) {
      return (
        <img 
          className="w-full h-auto object-cover rounded-t-lg"
          src={heroImage} 
          alt={title} 
        />
      );
    }
    return null;
  };

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] ${sizeClasses}`}
      data-size={size}
    >
      <a href={`/blog/${slug}`} className="block">
        {renderMedia()}
        <div className="p-4">
          <div className="flex gap-2 mb-2">
            {tags.slice(0, 3).map((tag) => (
              <a 
                key={tag} 
                href={`/tags/${tag}`}
                className="text-xs inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1 text-gray-700 dark:text-gray-300 hover:bg-blue-200 dark:hover:bg-blue-800"
              >
                {tag}
              </a>
            ))}
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{truncatedDescription}</p>
          <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-xs">
            <span>{formatDate(pubDate)}</span>
            <span className="capitalize">{type}</span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default PostCard;