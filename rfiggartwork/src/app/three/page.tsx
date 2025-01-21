// app/three/page.tsx

import ThreeScene from '../../Components/ThreeScene';

const ThreePage = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Three.js Scene in Next.js</h1>
        <a href='/gallery'>
        <button style={{ display: 'block', margin: '20px auto' }}>Go to Gallery</button>
        </a>
      <ThreeScene />
    </div>
  );
};

export default ThreePage;
