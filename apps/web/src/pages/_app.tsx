import type {AppProps} from 'next/app';

import {Layout} from '@src/components/Layout';
import {OpenAPI} from '@src/generated';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import '@styles/globals.css';

const configureOpenAPI = () => {
  OpenAPI.BASE = process.env.IDP_URL || 'https://localhost:8289';
};

configureOpenAPI();

const queryClient = new QueryClient();

export default function App({Component, pageProps}: AppProps) {
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Layout>
  );
}
