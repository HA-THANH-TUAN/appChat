import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ReactQueryDevtools } from 'react-query/devtools'

import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />

    </QueryClientProvider>
  </Provider>
);
