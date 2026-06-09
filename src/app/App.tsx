import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';
import { LanguageProvider } from './contexts/language';

function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </LanguageProvider>
  );
}

export default App;
