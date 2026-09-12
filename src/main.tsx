// ПРОСЬБА ОТКЛОНИТЬ ПРОЕКТ, ТАК КАК ОН ОТПРАВЛЕН СЛУЧАЙНО
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
