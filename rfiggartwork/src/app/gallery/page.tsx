'use client';

import ProductCard from '@/Components/ProductCard';
import { useEffect, useState } from 'react';
import { Product as GalleryItem } from '@/types/Product';

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch the gallery items from the API route
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await fetch('/api/gallery');
        const data = await response.json();
        setGalleryItems(data);
      } catch (error) {
        console.error('Failed to fetch gallery items', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Gallery</h1>

      {/* Link to the 3D Gallery Page */}
      <a href="/gallery/three">
        <button style={{ display: 'block', margin: '20px auto' }}>Go to 3D Gallery</button>
      </a>

      <div className="gallery-container">
        {galleryItems.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>

      <style jsx>{`
        .gallery-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          padding: 16px;
        }
        .gallery-item {
          border: 1px solid #ccc;
          padding: 16px;
          text-align: center;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .gallery-image {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin-bottom: 8px;
        }
        h1 {
          text-align: center;
          margin-top: 16px;
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;
