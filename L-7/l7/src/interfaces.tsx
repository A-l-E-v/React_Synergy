export interface NewsItem {
    webTitle: string;
    bodyTextSummary: string;
    webUrl: string;
    apiUrl: string;
    imageUrl?: string; // Добавляем поле для изображения
    bodyHtml?: string; // Добавляем поле для HTML-содержимого
}

export interface NewsResponse {
    response: {
        status: string;
        results: NewsItem[];
        pages: number; // Добавляем свойство для общего количества страниц
    };
}

// для текста полной статьи
export interface ArticleResponse {
    response: {
        content: {
            webTitle: string;
            webUrl: string;
            blocks: {
                main: {
                    bodyHtml: string;
                    elements: Array<{ type: string; assets: Array<{ file: string }> }>;
                };
                body: Array<{id:string, bodyHtml:string, type: string; bodyHtmlSummary:string}>;

            };
        };
    };
}

// переключатель страниц
export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
