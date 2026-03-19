import React, { createContext, useState, useEffect, useContext } from 'react';
import { gql } from '@apollo/client';
import { useApolloClient } from '@apollo/client/react';

// Authentication context
const AuthContext = createContext();

// Custom hook for accessing auth context
export const useAuth = () => useContext(AuthContext);

const GET_ME = gql`
  query Me {
    me {
      id
      username
      email
      role
      avatarImage
      games {
        id
        title
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        role
        email
        avatarImage
      }
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        role
        email
        avatarImage
      }
    }
  }
`;

// Auth provider to manage user state globally
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);     // Logged-in user data
    const [loading, setLoading] = useState(true); // Auth loading state
    const client = useApolloClient();

    // Check existing auth session on app load
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const { data } = await client.query({ query: GET_ME });
                    setUser(data.me);
                } catch (err) {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        };

        checkAuth();
    }, [client]);

    // Login and set user data
    const login = async (credentials) => {
        const { data } = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: credentials
        });
        localStorage.setItem('token', data.login.token);
        setUser(data.login.user);
    };

    // Register and set user data
    const register = async (credentials) => {
        const { data } = await client.mutate({
            mutation: REGISTER_MUTATION,
            variables: credentials
        });
        localStorage.setItem('token', data.register.token);
        setUser(data.register.user);
    };

    // Logout and clear user state
    const logout = async () => {
        localStorage.removeItem('token');
        await client.resetStore();
        setUser(null);
    };

    const updateAuthUser = (updatedUser) => {
        setUser(updatedUser);
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, updateAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
