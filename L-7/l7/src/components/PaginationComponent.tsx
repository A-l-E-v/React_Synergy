import React from 'react';
import { Pagination } from 'react-bootstrap';
import { PaginationProps } from '../interfaces';

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const items: JSX.Element[] = []; // Указываем тип для items

    for (let number = 1; number <= totalPages; number++) {
        if (number === 1 || number === totalPages || (number >= currentPage - 1 && number <= currentPage + 1)) {
            items.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => onPageChange(number)}>
                    {number}
                </Pagination.Item>
            );
        } else if (number === currentPage - 2 || number === currentPage + 2) {
            items.push(<Pagination.Ellipsis key={number} />);
        }
    }

    return (
        <Pagination>
            <Pagination.First onClick={() => onPageChange(1)} />
            <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
            {items}
            <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => onPageChange(totalPages)} />
        </Pagination>
    );
};

export default PaginationComponent;
