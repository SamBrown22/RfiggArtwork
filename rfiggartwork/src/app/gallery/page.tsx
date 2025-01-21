// app/gallery/page.tsx
'use client';

import { useEffect, useState } from 'react';

interface GalleryItem {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
}

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
      <div className="gallery-container">
        {galleryItems.map((item) => (
          <div key={item._id} className="gallery-item">
            <img src={item.imageUrl} alt={item.title} className="gallery-image" />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
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