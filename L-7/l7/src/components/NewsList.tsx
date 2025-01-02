import React from 'react';
import { Row, Col } from 'react-bootstrap';
import NewsCard from './NewsCard';
import { NewsItem } from '../interfaces';

interface NewsListProps {
    newsItems: NewsItem[];
    onSelect: (news: NewsItem) => void;
}

// блок карточек новостей
const NewsList: React.FC<NewsListProps> = ({ newsItems, onSelect }) => {
    return (
        <Row>
            {newsItems.length > 0 ? ( // Проверка на наличие новостей
                newsItems.map((news, index) => (
                    <Col key={index} md={6}>
                        <NewsCard news={news} onClick={() => onSelect(news)} />
                    </Col>
                ))
            ) : (
                <Col md={12}>
                    <p>Новости не найдены...</p> {/* Сообщение, если новостей нет */}
                </Col>
            )}
        </Row>
    );
};

export default NewsList;
