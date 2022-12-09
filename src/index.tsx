import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from '@shopify/polaris';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AppProvider
  i18n={{
    Polaris: {
      Common: {
        checkbox: 'case à cocher',
      },
      ResourceList: {
        sortingLabel: 'Trier par',
        showing: '{itemsCount} {resource} affichés',
        defaultItemPlural: 'articles',
        defaultItemSingular: 'article',
        Item: {
          viewItem: "Afficher les détails de l'{itemName}",
        },
      },
    },
  }}
  >
  <BrowserRouter>
    <App />
  </BrowserRouter>
</AppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
