import { useMemo, useState, type KeyboardEvent, useEffect } from 'react';
import arrowIconUrl from '../../../assets/Arrow.svg';
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  const [goToPage, setGoToPage] = useState<string>(totalPages.toString());
  useEffect(() => {
    setGoToPage(totalPages.toString());
  }, [totalPages]);
  const paginationRange = useMemo(() => {
    const range: (number | string)[] = [];
    const siblingCount = 1;
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
      return range;
    }
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;
    if (!shouldShowLeftDots && shouldShowRightDots) {
      for (let i = 1; i <= 4; i++) range.push(i);
      range.push('...');
      range.push(totalPages);
      return range;
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      range.push(1);
      range.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) range.push(i);
      return range;
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      range.push(1);
      range.push('...');
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) range.push(i);
      range.push('...');
      range.push(totalPages);
      return range;
    }
    return range;
  }, [currentPage, totalPages]);
  const executePageChange = () => {
    const pageNumber = parseInt(goToPage, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executePageChange();
    }
  };
  if (totalPages <= 1) return null;
  return (
    <div className={`pagination-panel ${className}`}>
      <nav aria-label="Постраничная навигация" className="pagination">
        <button
          type="button"
          aria-label="Предыдущая страница"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="pagination__btn"
        >
          <img src={arrowIconUrl} alt="" style={{ width: '16px', height: '16px' }} />
        </button>
        {paginationRange.map((page, index) => {
          if (typeof page === 'string') {
            return (
              <span key={`dots-${index}`} className="pagination__dots">
                {page}
              </span>
            );
          }
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={isActive ? 'page' : undefined}
              className={`pagination__item ${isActive ? 'pagination__item_state_active' : ''}`}
            >
              {page}
            </button>
          );
        })}
        <button
          type="button"
          aria-label="Следующая страница"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="pagination__btn"
        >
          <img src={arrowIconUrl} alt="" className="rotate-180" style={{ width: '16px', height: '16px' }} />
        </button>
      </nav>
      <div className="pagination-go">
        <input
          type="number"
          min="1"
          max={totalPages}
          inputMode="numeric"
          aria-label="Номер страницы для быстрого перехода"
          value={goToPage}
          onChange={(e) => setGoToPage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pagination-go__input"
        />
        <button
          type="button"
          onClick={executePageChange}
          disabled={!goToPage}
          className="pagination-go__button"
        >
          Переход на страницу
        </button>
      </div>
    </div>
  );
}