import { Float, Sparkles } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const BadgeModel = ({ highlighted }) => {
  const groupReference = useRef(null);

  useFrame((_state, delta) => {
    if (!groupReference.current) {
      return;
    }

    groupReference.current.rotation.y += delta * 0.8;
    groupReference.current.rotation.x += delta * 0.3;
  });

  return (
    <group ref={groupReference}>
      <mesh>
        <torusKnotGeometry args={[0.68, 0.2, 180, 24]} />
        <meshStandardMaterial
          color={highlighted ? '#ffd676' : '#7dd7ff'}
          emissive={highlighted ? '#ffaf3c' : '#219cff'}
          emissiveIntensity={highlighted ? 1.4 : 0.8}
          metalness={0.46}
          roughness={0.18}
        />
      </mesh>

      <mesh scale={0.52}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#ffffff" emissive="#8ee3ff" emissiveIntensity={0.9} />
      </mesh>
    </group>
  );
};

const AchievementBadge = ({ highlighted, title }) => (
  <article className={`achievement-card${highlighted ? ' is-highlighted' : ''}`}>
    <div className="achievement-visual">
      <Canvas camera={{ position: [0, 0, 3.2], fov: 46 }}>
        <ambientLight intensity={1.15} />
        <pointLight intensity={11} position={[3, 3, 3]} color="#fff0b3" />
        <Float
          floatIntensity={highlighted ? 1.8 : 1.2}
          rotationIntensity={1}
          speed={highlighted ? 2 : 1.4}
        >
          <BadgeModel highlighted={highlighted} />
        </Float>
        <Sparkles
          count={highlighted ? 45 : 22}
          scale={[4, 4, 2]}
          size={highlighted ? 4 : 2.3}
          speed={0.5}
        />
      </Canvas>
    </div>

    <div className="achievement-copy">
      <span className="progress-eyebrow">Achievement</span>
      <h3>{title}</h3>
      <p>
        {highlighted
          ? 'Recently unlocked and synced to the player profile.'
          : 'Stored in the game progress document and rendered in the leaderboard view.'}
      </p>
    </div>
  </article>
);

export default AchievementBadge;
