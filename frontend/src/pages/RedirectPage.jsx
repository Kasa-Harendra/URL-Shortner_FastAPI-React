import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';

const RedirectPage = () => {
    const { shortCode } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        if (shortCode) {
            window.location.href = `${window.location.origin}/api/${shortCode}`;
        } else {
            navigate('/');
        }
    }, [shortCode, navigate]);

    return (
        <Container className="mt-5 text-center">
            {error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <p>Redirecting...</p>
            )}
        </Container>
    );
};

export default RedirectPage;