// app/three/page.tsx

import ThreeScene from '../../Components/ThreeScene';

const ThreePage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold">Three.js Scene in Next.js</h1>
      </header>

      <main className="flex flex-col items-center w-full">
        <a href="/gallery">
          <button className="bg-blue-500 text-white px- py-2 rounded-md shadow-md hover:bg-blue-600 transition-all mb-6">
            Go to Gallery
          </button>
        </a>

        <div
          id="scene-container"
          className="w-full max-w-6xl h-[600px] rounded-lg shadow-lg overflow-hidden bg-gray-800 "
        >
          <ThreeScene />
        </div>
      </main>
    </div>
  );
};

export default ThreePage;
