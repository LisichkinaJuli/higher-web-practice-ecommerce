import { useState, useEffect, type SyntheticEvent, type ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../ui/Button/Button';

import searchIconUrl from '../../../assets/Search.svg';
import xMarkIconUrl from '../../../assets/X-mark.svg';

/**
 * Изолированный компонент поисковой формы.
 */
export function SearchForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const urlSearchValue = searchParams.get('search') ?? '';
  const [query, setQuery] = useState<string>(urlSearchValue);

  useEffect(() => {
    setQuery(urlSearchValue);
  }, [urlSearchValue]);

  /**
   * Транслирует строковый запрос в параметры адресной строки.
   * 
   * @param {string} text - Текстовое значение поискового запроса.
   */
  const executeSearch = (text: string) => {
    const trimmed = text.trim();
    navigate(trimmed ? `/?search=${encodeURIComponent(trimmed)}` : '/');
  };

  const handleSearchSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    executeSearch(query);
  };

  const handleClearClick = () => {
    setQuery('');
    executeSearch('');
  };

  return (
    <form 
      role="search"
      onSubmit={handleSearchSubmit}
      className="flex flex-1 max-w-xl items-center overflow-hidden rounded-md border border-bg-shadows focus-within:border-accent-primary focus-within:ring-2 focus-within:ring-accent-secondary/20 transition-all bg-bg-page h-9 md:h-10"
    >
      <div className="relative flex grow items-center h-full">
        <input
          type="text"
          placeholder="Искать"
          value={query}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
          className="w-full h-full bg-transparent pl-4 pr-12 py-2 text-xs md:text-sm text-neutral-primary outline-none placeholder:text-neutral-disable placeholder:font-normal font-medium"
        />
        
        {query.length > 0 && (
          <Button
            type="button"
            variant="text"
            isIconOnly
            onClick={handleClearClick}
            aria-label="Очистить поле поиска"
            className="absolute right-12 text-neutral-secondary hover:text-accent-danger p-1"
          >
            <img 
              src={xMarkIconUrl} 
              alt="" 
              className="w-4 h-4 md:w-6 md:h-6" 
            />
          </Button>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        isIconOnly
        className="h-full w-10 md:w-12 rounded-l-none rounded-r-md"
        aria-label="Запустить поиск"
      >
        <img 
          src={searchIconUrl} 
          alt="" 
          className="w-4 h-4 md:w-6 md:h-6 brightness-0 invert" 
        />
      </Button>
    </form>
  );
}
