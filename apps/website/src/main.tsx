import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { App } from './app/App';

ReactDOMClient.render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById('root')
);
