import { useState, useRef, useEffect, useId, type KeyboardEvent } from 'react';

export type SelectOption<T extends string> = {
  value: T;
  label: string;
};

type SelectProps<T extends string> = {
  options: SelectOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export function Select<T extends string>({
  options,
  value,
  onChange,
  placeholder = 'Текст списка',
  disabled = false,
  className = '',
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const openMenu = () => {
    const selectedIndex = options.findIndex((opt) => opt.value === value);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
  };

  const selectIndex = (index: number) => {
    const option = options[index];
    if (option) {
      onChange(option.value);
    }
    setIsOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          openMenu();
        } else {
          setActiveIndex((index) => Math.min(index + 1, options.length - 1));
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          setActiveIndex((index) => Math.max(index - 1, 0));
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen) {
          selectIndex(activeIndex);
        } else {
          openMenu();
        }
        break;
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  const stateClasses = [
    isOpen ? 'select_state_open' : '',
    disabled ? 'select_state_disabled' : '',
    selectedOption ? 'select_has-value' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={containerRef} className={`select ${stateClasses} ${className}`}>
      <button
        type="button"
        disabled={disabled}
        aria-controls={listId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
        onKeyDown={handleKeyDown}
        className="select__trigger"
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <svg 
          className="select__arrow" 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://w3.org"
        >
          <path 
            d="M3 5.5L8 10.5L13 5.5" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <ul id={listId} role="listbox" className="select__dropdown">
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isLast = index === options.length - 1;

            const optionClasses = [
              'select__option',
              isSelected ? 'select__option_state_selected' : '',
              index === activeIndex ? 'select__option_state_active' : ''
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <li 
                key={option.value} 
                role="option" 
                aria-selected={isSelected} 
                className={isLast ? '' : 'select__item-divider'}
              >
                <button
                  type="button"
                  onClick={() => selectIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={optionClasses}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
