"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
    total: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ total, pageSize, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(total / pageSize);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        onPageChange(page);
    };

    return (
        <div className="flex gap-2 mt-4 justify-center">
            <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Prev</Button>
            <span>{currentPage} / {totalPages}</span>
            <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
        </div>
    );
};
