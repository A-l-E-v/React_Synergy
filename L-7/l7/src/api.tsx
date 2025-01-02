import axios from 'axios';

import { NewsResponse, ArticleResponse } from './interfaces';

// ключ кладём в /.env файл в формате:
// VITE_API_KEY=xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
const API_KEY = import.meta.env.VITE_API_KEY;


// загрузка заголовков новостей
export const fetchNews = async (page: number): Promise<NewsResponse> => {
        const response = await axios.get(`https://content.guardianapis.com/search?api-key=${API_KEY}&page=${page}`);
    return response.data;
};

// загрузка целой статьи в карточку
export const fetchArticle = async (apiUrl: string): Promise<ArticleResponse> => {
        const response = await axios.get(`${apiUrl}?api-key=${API_KEY}&show-blocks=all`);
    return response.data;
};


// Функция  поиска по запросу
export const fetchNewsByQuery = async (query: string): Promise<NewsResponse> => {
    const response = await axios.get(`https://content.guardianapis.com/search?q="${query}"&api-key=${API_KEY}`);
    return response.data;
};