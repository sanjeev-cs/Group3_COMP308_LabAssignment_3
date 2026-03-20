import { Float, Sparkles, Stars } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const podiumColors = ['#ffcf63', '#78d8ff', '#79ff9f'];
const podiumOffsets = [-2.4, 0, 2.4];

const EnergyCore = ({ level }) => {
  const meshReference = useRef(null);

  useFrame((_state, delta) => {
    if (!meshReference.current) {
      return;
    }

    meshReference.current.rotation.x += delta * 0.35;
    meshReference.current.rotation.y += delta * 0.65;
  });

  return (
    <mesh ref={meshReference} position={[0, 1.75, 0]}>
      <icosahedronGeometry args={[1.05, 1]} />
      <meshStandardMaterial
        color="#88e5ff"
        emissive="#2871ff"
        emissiveIntensity={Math.min(2.6, 0.8 + level * 0.12)}
        metalness={0.4}
        roughness={0.12}
      />
    </mesh>
  );
};

const PodiumColumn = ({ color, height, index }) => (
  <Float floatIntensity={1.1 + index * 0.1} rotationIntensity={0.4} speed={1.3 + index * 0.2}>
    <group position={[podiumOffsets[index], 0, -0.45]}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[1.05, height, 1.05]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.25}
          metalness={0.28}
          roughness={0.22}
        />
      </mesh>
      <mesh position={[0, height + 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.05, 16, 80]} />
        <meshStandardMaterial color="#edf9ff" emissive={color} emissiveIntensity={0.65} />
      </mesh>
    </group>
  </Float>
);

const ProgressScene = ({ leaderboard, level, score, className = '' }) => {
  const topThree = leaderboard.slice(0, 3);
  const maxScore = Math.max(score, ...topThree.map((entry) => entry.score), 1);

  return (
    <div className={`progress-scene-shell ${className}`.trim()}>
      <Canvas camera={{ position: [0, 3.7, 8.8], fov: 50 }}>
        <color attach="background" args={['#07111f']} />
        <fog attach="fog" args={['#07111f', 7, 15]} />
        <ambientLight intensity={1.35} />
        <directionalLight intensity={2.6} position={[5, 7, 4]} />
        <pointLight intensity={12} position={[0, 4, 0]} color="#79d6ff" />
        <Stars count={2600} depth={40} factor={4} fade radius={70} />
        <Sparkles count={72} scale={[10, 6, 9]} size={3.2} speed={0.4} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
          <circleGeometry args={[5.6, 80]} />
          <meshStandardMaterial color="#0b1b2e" />
        </mesh>

        <Float floatIntensity={1.4} rotationIntensity={0.55}>
          <EnergyCore level={level} />
          <mesh position={[0, 3.55, 0]} rotation={[0.65, 0.55, 0]}>
            <torusGeometry args={[2.55, 0.08, 18, 120]} />
            <meshStandardMaterial color="#7bd8ff" emissive="#0f4db4" emissiveIntensity={0.9} />
          </mesh>
        </Float>

        {topThree.map((entry, index) => (
          <PodiumColumn
            color={podiumColors[index]}
            height={0.9 + (entry.score / maxScore) * 2.6}
            index={index}
            key={entry.id}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default ProgressScene;
