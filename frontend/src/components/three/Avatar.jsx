import React, { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float, Clone, Sphere, Center } from '@react-three/drei';

const Model = ({ url, scale = 1, position = [0, 0, 0] }) => {
    // Load external free GLTF models!
    const { scene } = useGLTF(url);
    // Use Clone to allow the same loaded scene to be instantiated multiple times safely
    return <Clone object={scene} scale={scale} position={position} />;
};

const FallbackAvatar = () => (
    <Sphere args={[0.8, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#888888" wireframe />
    </Sphere>
);

const Avatar = ({ character = 'robot', isThumbnail = false }) => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (groupRef.current && !isThumbnail) {
            // Gentle continuous rotation
            groupRef.current.rotation.y += delta * 0.4;
        }
    });

    const characterMap = {
        'robot': { 
            url: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/RobotExpressive/RobotExpressive.glb', 
            scale: 0.3,
            profileY: -1.0,
            thumbScale: 0.4,
            thumbY: -0.8
        },
        'parrot': { 
            url: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Parrot.glb', 
            scale: 0.023,
            profileY: 0,
            thumbScale: 0.023,
            thumbY: -0.1
        },
        'flamingo': { 
            url: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Flamingo.glb', 
            scale: 0.013,
            profileY: 0,
            thumbScale: 0.02,
            thumbY: -0.01
        }
    };

    const activeChar = characterMap[character] || characterMap['robot'];

    // Decoupled explicit sizing rules for Navbar thumbnail rendering
    const finalScale = isThumbnail && activeChar.thumbScale ? activeChar.thumbScale : activeChar.scale;
    const yOffset = isThumbnail && activeChar.thumbY !== undefined ? activeChar.thumbY : (activeChar.profileY || 0);

    return (
        <group ref={groupRef} position={[0, yOffset, 0]}>
            <Float 
                speed={isThumbnail ? 0 : 2} 
                rotationIntensity={isThumbnail ? 0 : 0.2} 
                floatIntensity={isThumbnail ? 0 : 0.5}
            >
                <Suspense fallback={<FallbackAvatar />}>
                    <Model url={activeChar.url} scale={finalScale} />
                </Suspense>
            </Float>
        </group>
    );
};

// Pre-load these global static assets to cache them immediately upon startup and fix fetch latency
useGLTF.preload('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/RobotExpressive/RobotExpressive.glb');
useGLTF.preload('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Parrot.glb');
useGLTF.preload('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Flamingo.glb');

export default Avatar;
