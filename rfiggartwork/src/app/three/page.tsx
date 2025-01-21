// app/3d-gallery/page.tsx
'use client';

import ThreeScene from '../../Components/ThreeScene';

const ThreeGalleryPage = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold my-4 text-white">3D Gallery</h1>
      <ThreeScene />
    </div>
  );
};

export default ThreeGalleryPage;
