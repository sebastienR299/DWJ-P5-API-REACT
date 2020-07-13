import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Paginations = ({ currentPage, itemsPerPage, length, onPageChange }) => {

    const pagesCount = Math.ceil(length / itemsPerPage);
    const pages = [];

    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return ( 

    <nav aria-label="...">
        <Pagination
        className="pagination pagination-lg justify-content-center"
        listClassName="pagination-lg"
        >
            <PaginationItem>
                <PaginationLink 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                >
                <strong>&#60;</strong>
                </PaginationLink>
            </PaginationItem>
                {pages.map(page => 
                <PaginationItem key={page} className={currentPage === page ? " active" : ""} >
                    <PaginationLink onClick={() => onPageChange(page)}>
                    <strong>{page}</strong>
                    </PaginationLink>
                </PaginationItem>
                )}
            <PaginationItem>
                <PaginationLink
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === pagesCount}
                >
                <strong>&#62;</strong>
                </PaginationLink>
            </PaginationItem>
        </Pagination>
    </nav>

     );
};

Paginations.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
}
 
export default Paginations;