'use client';

import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

// Define the shape of a product
interface GalleryItem {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  imageSize: { width: number, height: number };
}

const ThreeScene = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    // Fetch the gallery items from your API
    const fetchGalleryItems = async () => {
      try {
        const response = await fetch('/api/gallery');
        const data = await response.json();
        setGalleryItems(data);
      } catch (error) {
        console.error('Failed to fetch gallery items:', error);
      }
    };

    fetchGalleryItems();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || galleryItems.length === 0) return;

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
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 2, 15); // Position camera at the start of the corridor

    // Create scene
    const scene = new THREE.Scene();

    // Add lighting (hemisphere light for a soft lighting effect)
    const hemilight = new THREE.HemisphereLight(0xffffff, 0x080820, 0.1); // Lower intensity for soft ambient light
    scene.add(hemilight);

    // Create the floor (a simple plane)
    const floorGeometry = new THREE.PlaneGeometry(100, 100); // Larger plane for the floor
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x999999, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
    floor.position.set(0, -2, 0); // Position below the gallery
    floor.receiveShadow = true; // Enable shadow receiving
    scene.add(floor);

    // Create the gallery walls (corridor effect)
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xFFDEB3 });

    const totalLength = 50; // Length of the corridor
    const wallThickness = 2; // Thicker walls

    // Left wall (using BoxGeometry for thickness)
    const leftWallGeometry = new THREE.BoxGeometry(wallThickness, 3, totalLength);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.set(-12, -2, 0);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Right wall (using BoxGeometry for thickness)
    const rightWallGeometry = new THREE.BoxGeometry(wallThickness, 3, totalLength);
    const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
    rightWall.position.set(12, -2, 0);
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    galleryItems.forEach((GalleryItem, index) => {
      // Create the corridor layout (artworks positioned along the sides)
      const boxGeometry = new THREE.BoxGeometry(0.1, GalleryItem.imageSize.height / 20, GalleryItem.imageSize.width / 20); // The artwork inside the frame

      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(GalleryItem.imageUrl, (texture) => {
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

    // Set up movement (W, A, S, D keys)
    const speed = 0.1;
    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
          moveForward = true;
          break;
        case 'KeyS':
          moveBackward = true;
          break;
        case 'KeyA':
          moveLeft = true;
          break;
        case 'KeyD':
          moveRight = true;
          break;
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
          moveForward = false;
          break;
        case 'KeyS':
          moveBackward = false;
          break;
        case 'KeyA':
          moveLeft = false;
          break;
        case 'KeyD':
          moveRight = false;
          break;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    let rotationX = 0; // Current rotation
    let rotationY = 0;
    const sensitivity = 0.001; // Adjust this for rotation sensitivity
    
    const onMouseMove = (event: MouseEvent) => {
        const deltaX = event.movementX || 0;
        const deltaY = event.movementY || 0;
      
        // Update rotation based on delta
        rotationX += deltaY * -sensitivity;
        rotationY += deltaX * -sensitivity;
      };
    document.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Apply movement velocity
      if (moveForward) camera.position.z -= speed;
      if (moveBackward) camera.position.z += speed;
      if (moveLeft) camera.position.x -= speed;
      if (moveRight) camera.position.x += speed;

      // Keep the camera within reasonable bounds
      camera.position.z = Math.max(-totalLength / 2, Math.min(totalLength / 2, camera.position.z));
      camera.position.x = Math.max(-10, Math.min(10, camera.position.x));

      // Apply mouse-based camera rotation
      camera.rotation.x = rotationX;
      camera.rotation.y = rotationY;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup event listeners and resources
    return () => {
      renderer.dispose();
      scene.clear();
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [galleryItems]);

  return <div id="three-scene-container" style={{ width: '100%', height: '100vh' }}></div>;
};

export default ThreeScene;
