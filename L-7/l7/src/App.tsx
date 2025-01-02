import { useEffect, useState, useCallback, useRef } from 'react';
import { Container, Row, Col, Toast, Form, Button } from 'react-bootstrap';
import NewsList from './components/NewsList';
import NewsDetail from './components/NewsDetail';
import PaginationComponent from './components/PaginationComponent';
import Loader from './components/Loader';
import { fetchNews, fetchArticle, fetchNewsByQuery } from './api';
import { NewsItem, NewsResponse } from './interfaces';

import './styles/App.scss' //bootstrap и свои стили


const App = () => {

    const [newsItems, setNewsItems] = useState<NewsItem[]>([]); // все заголовки
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null); // выбранный заголовок
    const [currentPage, setCurrentPage] = useState(1); // текущая страница
    const [totalPages, setTotalPages] = useState(0); // общее кол-во найденных страниц
    const [loading, setLoading] = useState(false); // статус состояния "Загрузка"
    const [errorAPI, setErrorAPI] = useState<string | null>(null); // ошибка обращения к API
    const [errorSearch, setErrorSearch] = useState<string | null>(null); // ошибка поиска

    const [inputPage, setInputPage] = useState<number>(1); // Состояние для ввода номера страницы
    const [searchQuery, setSearchQuery] = useState(''); // для поиска


    // Обработчик поиска
    const loadNews = useCallback(async (page: number) => {
        setLoading(true);
        setErrorAPI(null);
        try {
            const data: NewsResponse = await fetchNews(page);
            setNewsItems(data.response.results);
            setTotalPages(data.response.pages);
            if (data.response.results.length > 0) {
                await handleSelectNews(data.response.results[0]); // Загрузка полной информации о первой новости
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorAPI(`Ошибка загрузки(!) новостей: "${error.message}".`);
                console.log(error.message);
            } else {
                setErrorAPI('Неизвестная ошибка.');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSelectNews = async (news: NewsItem) => {
        const articleData = await fetchArticle(news.apiUrl);
        const assets = articleData.response.content.blocks.main.elements[0]?.assets;
        //Загружаем 2-ую по качеству картинку - её достаточно хорошо видно....
        const imageUrl = assets && assets.length > 0 ? assets[1].file : ''; // Проверка на наличие assets
        setSelectedNews({
            ...news,
            imageUrl: imageUrl,
            bodyHtml: articleData.response.content.blocks.body[0]?.bodyHtml || '', // Проверка на наличие bodyHtml
        });
    };



    const handleSearch = async () => {
        setErrorSearch(null); // Сбрасываем ошибку перед началом запроса
        setLoading(true); // Устанавливаем состояние загрузки
        try {
            const searchResponse = await fetchNewsByQuery(searchQuery);
            if (searchResponse.response.results.length === 0) {
                setTotalPages(0); // Обновляем количество страниц на 0
                setErrorSearch('По запросу ничего не найдено.'); // Выводим информационное сообщение
            } else {
                setNewsItems(searchResponse.response.results);
                setTotalPages(searchResponse.response.pages);
                if (searchResponse.response.results.length > 0) {
                    await handleSelectNews(searchResponse.response.results[0]); // Загрузка полной информации о первой новости
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorSearch(`Ошибка поиска новостей: "${error.message}".`);
            } else {
                setErrorSearch('Неизвестная ошибка.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNews(currentPage);
    }, [currentPage, loadNews]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page); // Обновляем текущую страницу
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if (!isNaN(value) && value > 0 && value <= totalPages) {
            setInputPage(value); // Обновляем состояние ввода номера страницы
        }
    };

    const handleGoClick = () => {
        if (inputPage > 0 && inputPage <= totalPages) {
            setCurrentPage(inputPage); // Переход на указанную страницу
        }
    };

    const handleCloseErrorApi = () => {
        setErrorAPI(null);
    };
    const handleCloseErrorSearch = () => {
        setErrorSearch(null);
    };

    // Добавляем ref к тосту ошибки API
    const toastAPIRef = useRef<HTMLDivElement>(null);

    // Добавляем ref к тосту ошибки поиска
    const toastSearchRef = useRef<HTMLDivElement>(null);

    // обработчики скрытия тостов по кликам вне их окошек
    // Используем useEffect для добавления/удаления обработчика события API ошибки
    useEffect(() => {
        const handleAPIClickOutside = (event: MouseEvent) => {

            const target = event.target as Node;

            if (toastAPIRef.current && !toastAPIRef.current.contains(target)) {
                handleCloseErrorApi();
            }
        };

        document.addEventListener('mousedown', handleAPIClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleAPIClickOutside);
        };
    }, [toastAPIRef]); // Зависимость от toastAPIRef, так как handleAPIClickOutside теперь внутри useEffect

    // Используем useEffect для добавления/удаления обработчика события ошибки поиска
    useEffect(() => {
        const handleSearchClickOutside = (event: MouseEvent) => {

            const target = event.target as Node;

            if (toastSearchRef.current && !toastSearchRef.current.contains(target)) {
                handleCloseErrorApi();
            }
        };

        document.addEventListener('mousedown', handleSearchClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleSearchClickOutside);
        };
    }, [toastSearchRef]); // Зависимость от toastSearchRef, так как handleSearchClickOutside теперь внутри useEffect


    // Добавляем useEffect для автоматического закрытия тоста ошибки API через 3 секунды
    useEffect(() => {
        if (errorAPI) {
            const timer = setTimeout(() => {
                handleCloseErrorApi();
            }, 3000);

            return () => clearTimeout(timer); // Очищаем таймер при размонтировании
        }
    }, [errorAPI]); // Зависимость от error

    // Добавляем useEffect для автоматического закрытия тоста ошибки поиска через 3 секунды
    useEffect(() => {
        if (errorSearch) {
            const timer = setTimeout(() => {
                handleCloseErrorSearch();
            }, 3000);

            return () => clearTimeout(timer); // Очищаем таймер при размонтировании
        }
    }, [errorSearch]); // Зависимость от error

    return (

        <Container fluid style={{ marginTop: '10px', overflow: 'hidden' }}>
            <Row>
                <Col md={7} style={{ backgroundColor: '#f8f9fa', overflow: 'hidden' }}>
                    <Form >
                        <div className="d-flex justify-content-center mb-1">
                            <Row className="align-items-center">
                                <Col xs="auto"> {/* Используем Col для текста */}
                                    <Form.Control
                                        id="1"
                                        type="text"
                                        placeholder="Search for..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="d-flex justify-content-center"
                                    />
                                </Col>
                                <Col xs="auto"> {/* Используем Col для текста */}
                                    <Button
                                        variant="outline-success"
                                        onClick={() => {
                                            if (searchQuery.trim() !== "") {
                                                handleSearch();
                                            }
                                        }}
                                    >
                                        искать
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                    {loading ? (
                        <Loader />
                    ) : (
                        <NewsList
                            newsItems={newsItems}
                            onSelect={handleSelectNews} />
                    )}
                    <div className="d-flex justify-content-center">
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange} />
                    </div>
                    <div
                        className="d-flex justify-content-center"
                        style={{ marginTop: '20px' }}>
                        <Row className="align-items-center"> {/* Добавляем Row для выравнивания */}
                            <Col xs="auto"> {/* Используем Col для текста */}
                                <span>Быстрый переход на страницу: </span>
                            </Col>
                            <Col xs="auto"> {/* Используем Col для поля ввода */}
                                <Form.Control
                                    id="2"
                                    type="number"
                                    value={inputPage}
                                    onChange={handleInputChange}
                                    min={1}
                                    max={totalPages}
                                    style={{ width: '120px', marginRight: '10px' }}
                                />
                            </Col>
                            <Col xs="auto"> {/* Используем Col для кнопки */}
                                <Button onClick={handleGoClick}>Прыг!</Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col md={5} style={{
                    backgroundColor: '#e9ecef',
                    overflowY: 'auto',
                    maxHeight: 'calc(95vh - 30px)',
                    paddingRight: '10px'
                }}>
                    {selectedNews && (
                        <NewsDetail
                            title={selectedNews.webTitle || ''}
                            imageURL={selectedNews.imageUrl || ''}
                            content={selectedNews.bodyHtml || ''} // Обеспечиваем, что передаем строку
                        />
                    )}
                </Col>
            </Row>
            {errorAPI && (
                <Toast ref={toastAPIRef}
                    onClose={handleCloseErrorApi}
                    style={{
                        position: 'absolute',
                        width: '300px',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        transition: 'opacity 0.5s ease',
                        border: '2px solid red',
                        backgroundColor: 'white',
                        padding: 5
                    }}
                    className='text-danger'
                >
                    <Toast.Body style={{ textAlign: 'center' }}>
                        {errorAPI}
                        <div style={{ marginTop: 10 }}>
                            <button onClick={() => {
                                loadNews(currentPage);
                            }}>Повторить</button>
                        </div>
                    </Toast.Body>
                </Toast>
            )}

            {errorSearch && (
                <Toast ref={toastSearchRef}
                    onClose={handleCloseErrorSearch}
                    style={{
                        position: 'absolute',
                        width: '300px',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        transition: 'opacity 0.5s ease',
                        border: '2px solid red',
                        backgroundColor: 'white',
                        padding: 5
                    }}
                    className='text-success'
                >
                    <Toast.Body style={{ textAlign: 'center' }}>
                        {errorSearch}

                    </Toast.Body>
                </Toast>
            )}

        </Container>
    );
};

export default App;
