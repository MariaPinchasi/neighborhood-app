import { RouterProvider, createBrowserRouter } from 'react-router-dom'


import {
  Home,
  About,
  Profile,
  Register,
  Search,
  Service,
  ReviewForm,
  ServiceForm
} from './pages';

import SharedLayout from './components/SharedLayout';
import ProtectedRoute from './components/ProtectedRoute';

const routes = [
  {
    path: '/',
    element: <SharedLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'profile',
        element: <ProtectedRoute><Profile /> </ProtectedRoute>,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'search',
        element: <ProtectedRoute><Search /></ProtectedRoute>,
      },
      {
        path: 'services',
        children: [
          {
            path: 'addService',
            element: <ProtectedRoute><ServiceForm /> </ProtectedRoute>,
          },
          {
            path: ':serviceId',
            element: <ProtectedRoute><Service /> </ProtectedRoute>
          },
          {
            path: ':serviceId/editService',
            element: <ProtectedRoute><ServiceForm /> </ProtectedRoute>
          },
          {
            path: ':serviceId/addReview',
            element: <ProtectedRoute><ReviewForm /></ProtectedRoute>,
          },
          {
            path: ':serviceId/reviews',
            children: [
              {
                path: ':reviewId',
                element: <ProtectedRoute><ReviewForm /></ProtectedRoute>
              },
            ]
          },
        ]
      },

    ]
  }
];

function App() {
  const router = createBrowserRouter(routes);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

