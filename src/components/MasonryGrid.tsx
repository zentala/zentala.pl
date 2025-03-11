import React, { useEffect, useRef } from 'react';
import PostCard from './PostCard';
import type { CollectionEntry } from 'astro:content';

interface MasonryGridProps {
  posts: CollectionEntry<'blog'>[];
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ posts }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      const grid = gridRef.current;
      if (!grid) return;

      // Przeorganizuj elementy w siatce po zmianach rozmiaru
      const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
      const itemCount = grid.children.length;
      
      // Aktualizuj położenie elementów, jeśli to konieczne
      for (let i = 0; i < itemCount; i++) {
        const item = grid.children[i] as HTMLElement;
        const columnSpan = item.dataset.size === 'large' ? 2 : 1;
        item.style.gridColumn = `span ${columnSpan}`;
      }
    });

    resizeObserver.observe(gridRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div 
      ref={gridRef} 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto"
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default MasonryGrid;