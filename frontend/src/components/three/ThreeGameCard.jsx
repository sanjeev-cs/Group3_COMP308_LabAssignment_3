import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { Float, ContactShadows, Image, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const InteractiveCard = ({ url, zoomable }) => {
    const mesh = useRef();
    const [hovered, setHover] = useState(false);
    const { viewport } = useThree();
    const texture = useLoader(THREE.TextureLoader, url);
    
    useFrame((state) => {
        if (!mesh.current) return;
        
        // Mouse interaction (Tilt)
        // Reduced tilt intensity for a subtle effect
        const tiltX = (state.mouse.y * 0.3); 
        const tiltY = (state.mouse.x * 0.3); 
        
        mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -tiltX, 0.1);
        mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, tiltY, 0.1);

        // Subtle scale on hover
        const targetScale = hovered ? 1.05 : 1;
        mesh.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.1);
    });

    // Dynamic Aspect Ratio Fitting
    const imgAspect = texture.image.width / texture.image.height;
    
    // Constraints (85% of viewport to prevent clipping on rotation)
    const maxWidth = viewport.width * 0.85;
    const maxHeight = viewport.height * 0.85;
    
    let w, h;

    // Logic: Try fitting by height first
    h = maxHeight;
    w = h * imgAspect;

    // If width exceeds bounds, fit by width instead
    if (w > maxWidth) {
        w = maxWidth;
        h = w / imgAspect;
    }

    return (
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
            <group ref={mesh} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
                {/* Drei Image component supports border radius */}
                <Image 
                    url={url}
                    scale={[w, h]}
                    radius={0.15} // More rounded corners (15%)
                    transparent
                    toneMapped={false}
                />
            </group>
            
            {/* Dynamic Shadow based on image width */}
            <ContactShadows 
                position={[0, -h/2 - 0.2, 0]} 
                opacity={0.6} 
                scale={w * 1.5} 
                blur={2.5} 
                far={1.5} 
                color="#000000"
            />
            
            {/* Zoom Controls (Restricted) - Only enabled if zoomable prop is true */}
            {zoomable && (
                <OrbitControls 
                    enableRotate={false} /* Disable default rotate to keep custom tilt */
                    enablePan={false}    /* Keep image centered */
                    enableZoom={true} 
                    minDistance={3}      /* Max Zoom In */
                    maxDistance={5}      /* Max Zoom Out (Default Camera Pos) */
                />
            )}
        </Float>
    );
};

const ThreeGameCard = ({ imageUrl, zoomable = false }) => {
    return (
        <div style={{ width: '100%', height: '50%', minHeight: '100%' }}>
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.8} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.5} />
                
                <React.Suspense fallback={null}>
                    {imageUrl && <InteractiveCard url={imageUrl} zoomable={zoomable} />}
                </React.Suspense>
            </Canvas>
        </div>
    );
};

export default ThreeGameCard;
