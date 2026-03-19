import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Avatar from '../../components/three/Avatar';
import Button from '../../components/common/Button';

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($email: String, $avatarImage: String) {
    updateProfile(email: $email, avatarImage: $avatarImage) {
      id
      email
      avatarImage
    }
  }
`;

const AVAILABLE_AVATARS = [
    { id: 'robot', label: '🤖 Expressive Robot' },
    { id: 'parrot', label: '🦜 Colorful Parrot' },
    { id: 'flamingo', label: '🦩 Pink Flamingo' }
];

const Profile = () => {
    const { user, updateAuthUser } = useAuth();
    const navigate = useNavigate();
    
    // Parse avatar info from DB
    let initialAvatar = { character: 'robot' };
    try {
        if (user?.avatarImage && user.avatarImage.startsWith('{')) {
            initialAvatar = { ...initialAvatar, ...JSON.parse(user.avatarImage) };
        }
    } catch(e) { }
    
    const [email, setEmail] = useState(user?.email || '');
    const [avatarCharacter, setAvatarCharacter] = useState(initialAvatar.character);
    
    const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE);
    
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const avatarJSON = JSON.stringify({ character: avatarCharacter });
            const { data } = await updateProfile({
                variables: {
                    email,
                    avatarImage: avatarJSON
                }
            });
            updateAuthUser({ ...user, ...data.updateProfile });
            alert('Profile updated successfully!');
            navigate('/'); // Redirect to main page after successful update
        } catch (err) {
            alert(err.message || 'Error updating profile');
        }
    };

    const inputStyle = {
        padding: '0.75rem', 
        borderRadius: '8px', 
        background: 'rgba(255, 255, 255, 0.1)', 
        color: '#fff', 
        border: '1px solid rgba(255, 255, 255, 0.4)', 
        width: '100%', 
        marginBottom: '1.5rem', 
        boxSizing: 'border-box'
    };

    return (
        <div className="profile-page" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'stretch' }}>
            {/* Form Section */}
            <div className="profile-form" style={{ flex: 1, minWidth: '300px', backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <h2>Edit Profile</h2>
                <form onSubmit={handleSave} style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ flex: 1 }}>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Username</label>
                            <input type="text" value={user?.username || ''} disabled style={{ ...inputStyle, background: 'rgba(255, 255, 255, 0.05)', color: '#888' }} />
                        </div>
                        
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Email</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                style={inputStyle}
                            />
                        </div>
                        
                        <h3 style={{ marginTop: '1rem', marginBottom: '1rem' }}>Customize 3D Avatar</h3>
                        
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Select Character</label>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                {AVAILABLE_AVATARS.map(avatar => (
                                    <div 
                                        key={avatar.id}
                                        onClick={() => setAvatarCharacter(avatar.id)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '8px',
                                            background: avatarCharacter === avatar.id ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.1)',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            border: avatarCharacter === avatar.id ? '2px solid white' : '2px solid transparent',
                                            transition: 'all 0.2s',
                                            fontWeight: avatarCharacter === avatar.id ? 'bold' : 'normal'
                                        }}
                                    >
                                        {avatar.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <Button type="submit" variant="primary" disabled={loading} className="btn-block" style={{ marginTop: 'auto', width: '100%' }}>
                        {loading ? 'Saving...' : 'Save Profile'}
                    </Button>
                </form>
            </div>
            
            {/* 3D Preview Section */}
            <div className="profile-preview" style={{ flex: 1, minWidth: '300px', backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)', position: 'relative', overflow: 'hidden', minHeight: '400px' }}>
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                    
                    <Avatar character={avatarCharacter} />
                    
                    <OrbitControls 
                        enableZoom={true} 
                        autoRotate={false} 
                        enablePan={false}
                        minAzimuthAngle={-Math.PI / 4} // Limit 45 deg left
                        maxAzimuthAngle={Math.PI / 4}  // Limit 45 deg right
                        minPolarAngle={Math.PI / 3}    // Don't look fully from top
                        maxPolarAngle={Math.PI / 2}    // Don't look under the floor
                    />
                    <Environment preset="city" />
                    <ContactShadows position={[0, -1.0, 0]} opacity={0.5} scale={10} blur={2} far={4} />
                </Canvas>
            </div>
        </div>
    );
};

export default Profile;
