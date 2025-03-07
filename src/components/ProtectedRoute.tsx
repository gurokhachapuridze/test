import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        // Fetch the protected data to check if the user is authenticated
        const checkAuthentication = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            const response = await fetch('/api/protected', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        };

        checkAuthentication();
    }, []);

    // While the authentication status is being checked, show a loading indicator
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    // If not authenticated, redirect to register page
    if (!isAuthenticated) {
        return <Navigate to="/register" replace />;
    }

    // If authenticated, render the protected children
    return <>{children}</>;
};

export default ProtectedRoute;
