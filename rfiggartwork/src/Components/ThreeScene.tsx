'use client';

import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import OrbitControls

// Define the shape of a product
interface Product {
  id: number;
  imageUrl: string; // Add the imageUrl field to each product
}

const ThreeScene = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate fetching products
    const mockProducts: Product[] = Array.from({ length: 8 }, (_, index) => ({
      id: index,
      imageUrl: `Wildlife.jpg`, // Example photo URL
    }));
    setProducts(mockProducts);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || products.length === 0) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);

    // Append renderer's canvas to the DOM
    const container = document.getElementById('three-scene-container');
    if (container) {
      container.appendChild(renderer.domElement);
    }

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
    camera.position.set(0, 2, 15); // Position camera at the start of the corridor

    // Create scene
    const scene = new THREE.Scene();

    // Add lighting (hemisphere light for a soft lighting effect)
    const hemilight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(hemilight);

    // Add ambient light for soft illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    // Set up OrbitControls to allow moving around
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    // Create the floor (a simple plane)
    const floorGeometry = new THREE.PlaneGeometry(100, 100); // Larger plane for the floor
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x999999, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
    floor.position.set(0, -2, 0); // Position below the gallery
    scene.add(floor);

    // Create the gallery walls (corridor effect)
    const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });

    const totalLength = 50; // Length of the corridor
    const wallThickness = 2; // Thicker walls

    // Left wall (using BoxGeometry for thickness)
    const leftWallGeometry = new THREE.BoxGeometry(wallThickness, 10, totalLength); // BoxGeometry for thickness
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.set(-12, 3, 0); // Position left wall
    scene.add(leftWall);

    // Right wall (using BoxGeometry for thickness)
    const rightWallGeometry = new THREE.BoxGeometry(wallThickness, 10, totalLength); // BoxGeometry for thickness
    const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
    rightWall.position.set(12, 3, 0); // Position right wall
    scene.add(rightWall);

    // Create the corridor layout (artworks positioned along the sides)
    const boxGeometry = new THREE.BoxGeometry(0.2, 3, 3); // The artwork inside the frame
    const artworks: THREE.Mesh[] = [];

    // Create the corridor layout (artworks positioned along the sides)
    const spacing = 4; // Distance between artworks
    const quarterLength = totalLength / 4;

    // Load the image textures and create gallery items
    products.forEach((product, index) => {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(product.imageUrl, (texture) => {
          // Create materials for each face of the box
          const materials = [
            new THREE.MeshBasicMaterial({ color: 0x999999 }), // Back face (gray)
            new THREE.MeshBasicMaterial({ map: texture }), // Front face (gray)
            new THREE.MeshBasicMaterial({ color: 0x999999 }), // Left face (gray)
            new THREE.MeshBasicMaterial({ color: 0x999999 }), // Right face (gray)
            new THREE.MeshBasicMaterial({ color: 0x999999 }), // Top face (gray)
            new THREE.MeshBasicMaterial({ color: 0x999999 }) // Front face (texture)
          ];
  
        // Create the photo (plane)
        const artwork = new THREE.Mesh(boxGeometry, materials);

        // Position the photo
        const z = (index * spacing) - quarterLength; // Spread items along the z-axis (corridor path)

        // Alternate between left and right sides of the corridor
        const x = index % 2 === 0 ? -11 : 11; // Position on the left (-11.5) or right (+11.5) of the corridor

        artwork.position.set(x, 2.5, z); // Position the photo slightly above the floor

        // Make the photo face the opposite side (left side faces right and vice versa)
        if (x === -11) {
          artwork.rotation.y = Math.PI; // Rotate the photo 180 degrees to face the other side
        }

        scene.add(artwork);
        artworks.push(artwork);
      });
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update controls
      controls.update();

      // Render scene
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup event listeners and resources
    return () => {
      renderer.dispose();
      scene.clear();
    };
  }, [products]);

  return <div id="three-scene-container" style={{ width: '100%', height: '100vh' }}></div>;
};

export default ThreeScene;
