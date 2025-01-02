import React from 'react';
import { Card } from 'react-bootstrap';

interface NewsDetailProps {
    title: string;
    imageURL: string;
    content: string;
}

// Карточка статьи справа
const NewsDetail: React.FC<NewsDetailProps> = ({ title, imageURL, content }) => {
    return (
        <>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Img style={{marginTop: 20, marginBottom: 10}} variant="top" src={imageURL} />
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </Card.Body>
        </>
    );
};

export default NewsDetail;
