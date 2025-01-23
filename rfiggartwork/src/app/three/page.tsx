// app/three/page.tsx

import ThreeScene from '../../Components/ThreeScene';

const ThreePage = () => {
  return (
    <div className="flex flex-col bg-gray-400 text-white" id="screenContainer">
        {/* Three.js Scene */}
        <div
          id="scene-container"
          className="max-w-full flex-grow rounded-lg shadow-lg overflow-hidden h-[calc(100vh-96px)] m-4"
        >
          <ThreeScene />
        </div>
    </div>
  );
};

export default ThreePage;
