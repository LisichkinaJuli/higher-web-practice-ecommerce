import {
  useState,
  useEffect,
  useCallback,
  type SyntheticEvent,
  type ChangeEvent,
} from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../ui";
import SearchIcon from "../../assets/Search.svg?react";
import XMarkIcon from "../../assets/X-mark.svg?react";

export function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearchValue = searchParams.get("search") ?? "";
  const currentView = searchParams.get("view") ?? "";
  const [query, setQuery] = useState<string>(urlSearchValue);

  useEffect(() => {
    setQuery(urlSearchValue);
  }, [urlSearchValue]);

  const executeSearch = useCallback((text: string, currentParams: URLSearchParams) => {
    const trimmed = text.trim();
    if (trimmed) {
      currentParams.set("search", trimmed);
    } else {
      currentParams.delete("search");
    }
    setSearchParams(currentParams, { replace: true });
  }, [setSearchParams]);

  useEffect(() => {
    if (query === urlSearchValue) return;
    const timer = setTimeout(() => {
      executeSearch(query, searchParams);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, urlSearchValue, searchParams, executeSearch]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    executeSearch(query, searchParams);
  };

  const handleClearClick = () => {
    setQuery("");
    executeSearch("", searchParams);
  };

  if (currentView === "categories" || currentView === "filters") {
    return <div className="header__search-form-placeholder" />;
  }

  return (
    <form
      role="search"
      onSubmit={handleSearchSubmit}
      className="header__search-form"
    >
      <div className="header__search-input-container">
        <input
          type="text"
          placeholder="Искать"
          value={query}
          onChange={handleInputChange}
          className="header__search-input-field"
        />
        {query.length > 0 && (
          <Button
            type="button"
            variant="text"
            onClick={handleClearClick}
            aria-label="Очистить поле поиска"
            className="header__search-clear-btn"
          >
            <XMarkIcon className="icon-m" />
          </Button>
        )}
      </div>
      <Button
        type="submit"
        variant="icon"
        colorVariant="primary"
        className="header__search-submit-btn"
        aria-label="Запустить поиск"
      >
        <SearchIcon className="icon-m" />
      </Button>
    </form>
  );
}
