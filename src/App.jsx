
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import AuthProvider from './Provider/AuthProvider';
import { RouterProvider } from 'react-router-dom';
import MainRouter from './Router/MainRouter';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={MainRouter}></RouterProvider>
        <Toaster></Toaster>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
