# HandyHood App

HandyHood is a web application designed to facilitate connections between users and local service providers within their neighborhood.

![main](https://github.com/MariaPinchasi/neighborhood-app/assets/135972701/d58e53ef-6724-462b-a327-73ac1dc20db3)

## Features

![Image](https://github.com/MariaPinchasi/neighborhood-app/assets/135972701/115dfb29-8c42-49eb-bba2-99f6466f8573)

### User Features

- User Registration and Authentication
- Service Search Functionality
- Leave Reviews for Services
- Add Services to Favorites

- User Profile:
  - View Favorites
  - Add, Edit, Delete New Services
  - Uploading Image for User's Service

![Image](https://github.com/MariaPinchasi/neighborhood-app/assets/135972701/8fd05f62-bdd7-4a17-a45a-1067ca5276c3)

### Admin Features

- Manage Locations.
- View and Delete Users.
- Delete Services and Reviews.

### Additional Features

- **Responsive Design** for User Experience
- Secure Authentication and Authorization: Users are authenticated via tokens sent in **cookies**.
- User-Friendly Service Search Interface
- Image Upload for Service Profiles
- Connect with Services via **WhatsApp**:
  - Users can initiate communication with service providers through WhatsApp.
  - Service profiles display a WhatsApp icon or button for easy access.

![Image](https://github.com/MariaPinchasi/neighborhood-app/assets/135972701/f39dc974-5cf9-4865-bf1f-8bca0d47f053)

## How to Use

### User Registration and Login

1. Visit the application at `https://venerable-beignet-615b16.netlify.app/` in your browser.
2. Register a new account or log in if you already have one.

### User Actions

1. Explore services in your neighborhood.
2. Add services to your favorites.
3. Leave reviews for services you've used.
4. Manage your profile: view, edit and add services in the User Dashboard.

### Admin Actions

1. Log in with admin credentials.
2. Manage locations to ensure accurate service listings.
3. View and delete user accounts.
4. Cascade Deletion: When deleting a user, all associated services and reviews are deleted.
5. Delete services to maintain an up-to-date service directory.
6. Delete reviews.

## Technologies Used

- Frontend:

  - React.js
  - Sass
  - React-select

- Backend:

  - Node.js
  - Express
  - MongoDB

- Authentication:
  - Token-based authentication via cookies.

Happy exploring and connecting with local services!
