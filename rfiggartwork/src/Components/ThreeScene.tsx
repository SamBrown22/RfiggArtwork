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
      imageUrl: `Snowsports.jpg`, // Example photo URL
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
    renderer.shadowMap.enabled = true; // Enable shadows
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // High-quality soft shadows

    // Append renderer's canvas to the DOM
    const container = document.getElementById('three-scene-container');
    if (container) {
      container.appendChild(renderer.domElement);
    }

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.2, 100);
    camera.position.set(0, 2, 15); // Position camera at the start of the corridor

    // Create scene
    const scene = new THREE.Scene();

    // Add lighting (hemisphere light for a soft lighting effect)
    const hemilight = new THREE.HemisphereLight(0xffffff, 0x080820, 0.2); // Lower intensity for soft ambient light
    scene.add(hemilight);

    // Set up OrbitControls to allow moving around
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2; // Limit the camera to look straight up and down
    controls.minPolarAngle = Math.PI / 2; // Same for the minimum angle, preventing going below

    // Create the floor (a simple plane)
    const floorGeometry = new THREE.PlaneGeometry(100, 100); // Larger plane for the floor
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x999999, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
    floor.position.set(0, -2, 0); // Position below the gallery
    floor.receiveShadow = true; // Enable shadow receiving
    scene.add(floor);

    // Create the gallery walls (corridor effect)
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xFFDEB3});

    const totalLength = 50; // Length of the corridor
    const wallThickness = 2; // Thicker walls

    // Left wall (using BoxGeometry for thickness)
    const leftWallGeometry = new THREE.BoxGeometry(wallThickness, 10, totalLength);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.set(-12, 3, 0);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Right wall (using BoxGeometry for thickness)
    const rightWallGeometry = new THREE.BoxGeometry(wallThickness, 10, totalLength);
    const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
    rightWall.position.set(12, 3, 0);
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    // Create the corridor layout (artworks positioned along the sides)
    const boxGeometry = new THREE.BoxGeometry(0.1, 4, 4); // The artwork inside the frame

    products.forEach((product, index) => {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(product.imageUrl, (texture) => {
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        // Create materials for the artwork box
        const materials = [
          new THREE.MeshStandardMaterial({ color: 0x999999 }), // Back face
          new THREE.MeshStandardMaterial({ map: texture }),   // Front face with texture
          new THREE.MeshStandardMaterial({ color: 0x999999 }), // Left face
          new THREE.MeshStandardMaterial({ color: 0x999999 }), // Right face
          new THREE.MeshStandardMaterial({ color: 0x999999 }), // Top face
          new THREE.MeshStandardMaterial({ color: 0x999999 })  // Bottom face
        ];

        // Create a mesh for the artwork
        const artwork = new THREE.Mesh(boxGeometry, materials);

        // Calculate positions for the artwork
        const z = (index * 4) - totalLength / 4;
        const x = index % 2 === 0 ? -11 : 11;
        artwork.position.set(x, 2.5, z);

        // Rotate the artwork if it is on the left side
        if (x === -11) {
          artwork.rotation.y = Math.PI;
        }

        // Enable shadows for the artwork
        artwork.castShadow = true;

        // Add the artwork to the scene
        scene.add(artwork);

        // Create a spotlight for each artwork
        const spotLight = new THREE.SpotLight(0xFFFFE0, 20); // Increased intensity to 10 for brighter spotlight
        spotLight.position.set(x + (x === -11 ? 5 : -5), 10, z); // Adjust position based on wall
        spotLight.angle = Math.PI / 6; // Wider cone angle to cover the frame
        spotLight.penumbra = 0.2; // Softer edge of the light cone
        spotLight.decay = 1; // Decay set to 1 for normal falloff
        spotLight.distance = 15; // Increased distance for the spotlight range
        spotLight.castShadow = true;

        // Configure shadow properties
        spotLight.shadow.mapSize.width = 1024; // High resolution shadow
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.camera.near = 0.5;
        spotLight.shadow.camera.far = 50;

        // Set spotlight target directly to the artwork (frame)
        const spotlightTarget = new THREE.Object3D();
        spotlightTarget.position.set(x, 2.5, z); // Position at the center of the frame
        scene.add(spotlightTarget);
        spotLight.target = spotlightTarget;

        // Add spotlight to the scene
        scene.add(spotLight);

        // Debug: Log spotlight creation
        console.log(`Spotlight created at position: (${x}, 6, ${z + 5})`);
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
