import '@packages/utils/i18n';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@packages/utils/query';

const root = document.getElementById('root');

if (root) {
   createRoot(root).render(
      <StrictMode>
         <QueryClientProvider client={queryClient}>
            <NuqsAdapter>
               <App />
            </NuqsAdapter>
         </QueryClientProvider>
      </StrictMode>,
   );
}
