import { type LinkProps, Link } from 'react-router-dom';
// Импортируем SVG как React-компоненты благодаря vite-plugin-svgr
import LogoFull from './assets/logo-full.svg?react';
import LogoM from './assets/logo-m.svg?react';

export interface LogoProps extends Omit<LinkProps, 'to'> {
  /** Дополнительные внешние БЭМ-классы для позиционирования */
  className?: string;
}

/**
 * Адаптивный компонент логотипа бренда Quant.
 * Автоматически переключается между состоянием FULL (на ПК) и M (на мобильных).
 */
export function Logo({ className = '', ...props }: LogoProps) {
  return (
    <Link 
      to="/" 
      className={`logo inline-flex items-center select-none cursor-pointer transition-opacity hover:opacity-90 ${className}`}
      {...props}
    >
      {/* 
        Состояние 1: FULL (Логотип с текстом)
        hidden md:block — скрыт на мобильных, появляется на экранах от 768px
      */}
      <LogoFull className="logo_state_full hidden md:block h-8 w-auto" />

      {/* 
        Состояние 2: M (Только компактный знак Q)
        block md:hidden — виден на мобильных, скрывается на десктопе
      */}
      <LogoM className="logo_state_m block md:hidden h-8 w-auto" />
    </Link>
  );
}
