# NeighborhoodConnect App Design Document

## Introduction

NeighborhoodConnect is a web application designed to connect users with local service providers in their neighborhood for various services. Users can register, log in, search for services, save favorites, and leave reviews. The application ensures a user-friendly experience with secure authentication and seamless communication between users and services.

## Frontend

### Pages:

1. **Home and login Page:**

   - Includes a login option.
   - Redirects to the search page after login.

2. **Registration Page:**

   - Allows new users to register.

3. **Search Page:**

   - Displays the search interface and search results.

4. **Service Profile Page:**

   - Shows detailed information about a selected service.
   - Includes reviews and a button to add to favorites.

5. **User Dashboard Page:**

   - Allows users to manage their profile, view their added services, and access their favorite services.

### Components:

1. **Header Component:**

   - Contains the logo and navigation links.
   - Displays login status and user profile if logged in.

2. **Registration Component:**

   - Allows users to register with their name, email, phone, password, city, and neighborhood.

3. **Login Component:**

   - Enables users to log in using their credentials.

4. **Search Component:**

   - Provides a search interface where users can input the profession they are looking for.
   - Filters results based on the user's city and neighborhood.

5. **service Listing Component:**

   - Displays a list of services based on the user's search criteria.

6. **service Profile Component:**

   - Shows detailed information about a selected service, including contact info, description, optional image, and reviews.
   - Includes an option to send a WhatsApp message to the service.

7. **User Dashboard Component:**

   - Allows users to manage their profile and view their added services.

8. **FavoriteButton Component:**
   - Allows users to add/remove services from their favorites.

### Context:

- **User Context:**

  - Manages user authentication and profile information.

- **service and search Context:**

  - Handles the information related to services.

### Api:

- Handles API calls to the backend.

### Custom Hooks:

- **useAuth:**

  - Provides authentication-related functionality.

- **useServiceSearch:**

  - Manages state related to the search functionality.

## Backend

### Schema Models:

1. **Location Model:**

   - Fields: city, neighborhood.
   - Permission Levels: Admin.

2. **User Model:**

   - Fields: name, email, phone, password, favorites: array of favorite services
   - ref to location.
   - Permission Levels: User, Admin.

3. **Service Model:**

   - Fields: service, name, description, image (optional), phone.
   - ref to user
   - ref to location.
   - Permission Levels: User (can add,modify and delete his own), Admin (can modify/delete).

4. **Review Model:**
   - Fields: user (ref to User), service (ref to service), rating, comment.

### Controllers:

1. **AuthController:**

   - Handles user registration and login.

2. **serviceController:**

   - Manages operations related to services (add, modify, delete).

3. **ReviewController:**

   - Manages operations related to reviews (add, view).

4. **LocationController:**
   - Manages operations related to Locations (add, view) only by admin.

### Routes:

1. **/api/v1/auth:**

   - POST /register
   - POST /login
   - GET /getUser
   - PUT /logout

2. **/api/locations:**

   - GET /locations
   - POST /locations

3. **/api/services:**

   - GET /
   - POST /
   - PUT /:id
   - GET /:id
   - DELETE /:id
   - upload photo: PUT /:id/photo

4. **/api/reviews:**
   - GET /services/:id/reviews
   - POST //services/:id/reviews

### Relationships:

- **User and Review:**

  - One-to-Many relationship (a user can write multiple reviews).

- **service and Review:**

  - One-to-Many relationship (a service can have multiple reviews).

- **User and service:**

  - One-to-Many relationship (a user can add multiple services).

  - **User and location:**
  - One-to-One relationship (a user can have one location).

- **Service and location:**
- One-to-One relationship (a service can have one location).

## Conclusion

NeighborhoodConnect now offers enhanced user engagement with the ability to save favorite services and leave reviews. The frontend modifications provide a seamless experience for users, and the backend adjustments accommodate the new features, ensuring a comprehensive and interactive application for connecting users with local services.
