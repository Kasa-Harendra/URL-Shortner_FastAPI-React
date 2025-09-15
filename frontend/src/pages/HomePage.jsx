import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

const HomePage = () => {
    const [originalLink, setOriginalLink] = useState('');
    const [choiceCode, setChoiceCode] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [error, setError] = useState('');
    const [warning, setWarning] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setShortenedUrl('');
        setWarning('');

        try {
            const response = await axios.post('https://url-shortner-fastapi-react.onrender.com/shorten', {
                original_link: originalLink,
                choice_code: choiceCode || null,
            });

            if (response.status === 201) {
                // const newUrl = `http://localhost:5173/${response.data.short_code}`;
                const newUrl = `https://url-shortner-fast-api-react.vercel.app/${response.data.short_code}`;
                setShortenedUrl(newUrl);
            } else {
                const warning_message = response.data.message;
                setWarning(warning_message);
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shortenedUrl);
            alert('URL copied to clipboard!');
        } catch (err) {
            setError('Failed to copy URL.');
        }
    };

    return (
        <Container className="mt-5">
            <Card bg='dark'> 
                <Card.Body>
                    <Card.Title style={{color:"white"}}>URL Shortener</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="originalUrl">
                            <Form.Label style={{color:"white"}}>Original URL</Form.Label>
                            <Form.Control
                                type="url"
                                placeholder="https://example.com"
                                value={originalLink}
                                onChange={(e) => setOriginalLink(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="customCode">
                            <Form.Label style={{color:"white"}}>Custom Short Code (Optional)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="my-custom-code"
                                value={choiceCode}
                                onChange={(e) => setChoiceCode(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Shorten
                        </Button>
                    </Form>

                    {shortenedUrl && <Alert variant="success" className="mt-3">
                        Shortened URL: <code><a href={shortenedUrl} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a></code>
                        <Button variant="secondary" size="sm" className="ms-2" onClick={handleCopy}>
                            Copy
                        </Button>
                    </Alert>}

                    {warning && <Alert variant="warning" className="mt-3">
                        Warning: <p>{warning}</p>
                    </Alert>}

                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default HomePage;