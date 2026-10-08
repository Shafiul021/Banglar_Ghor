import { createRoot } from 'react-dom/client';
import { App } from './App';
import { DataProvider } from './context/DataContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <DataProvider>
    <App />
  </DataProvider>
);
