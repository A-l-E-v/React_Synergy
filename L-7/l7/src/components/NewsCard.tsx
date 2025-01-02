import React from 'react';
import { Card } from 'react-bootstrap';
import { NewsItem } from '../interfaces';

interface NewsCardProps {
    news: NewsItem;
    onClick: () => void;
}

// карточка заголовка новости
const NewsCard: React.FC<NewsCardProps> = ({ news, onClick }) => {
    return (
        <Card onClick={onClick} style={{ cursor: 'pointer', borderColor: 'lightblue', padding: '5px'  }} className="mb-1">
            <Card.Body style={{ padding: '5px' }}>
                <Card.Title className="mb-1" style={{ fontSize: '15px' }}>{news.webTitle}</Card.Title>
                           </Card.Body>
        </Card>
    );
};

export default NewsCard;
