import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import { renderAllRoutes } from './Routes/Routes';

const App = () => <BrowserRouter>{renderAllRoutes()}</BrowserRouter>;

createRoot(document.getElementById('root')!).render(<App />)