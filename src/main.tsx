import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout/Account/Layout.tsx'
import Error from './pages/Error/Error.tsx'

const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          path: '/',
          element: <>Контент</>
        },
        {
          path: '*',
          element: <Error/>
        }
      ]

    },
    
  ])

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
