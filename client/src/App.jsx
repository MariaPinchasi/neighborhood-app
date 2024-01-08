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
        element: <Profile />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'services',
        children: [
          {
            path: 'addService',
            element: <ServiceForm />
          },
          {
            path: ':serviceId',
            element: <Service />
          },
          {
            path: ':serviceId/editService',
            element: <ServiceForm />
          },
          {
            path: ':serviceId/addReview',
            element: <ReviewForm />,
          },
          {
            path: ':serviceId/reviews',
            children: [
              {
                path: ':reviewId',
                element: <ReviewForm />
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

