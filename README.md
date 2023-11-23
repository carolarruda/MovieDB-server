# The Movie Database Server

Welcome to **The Movie Database** server! This server is the backend for a personal platform designed to catalog and organize movies that are either on your watchlist or those you've enjoyed. More than just a catalog, this platform is a space to cherish and keep track of the films close to your heart.

## Features

### Movie Management
- **Add Movies:** Easily add movies to your collection with details like title, description, runtime, and a URL.
- **View Movies:** Browse through your catalog of movies, whether they are in your watchlist or already watched.
- **Update Movies:** Modify movie details or mark them as watched/unwatched.

### User Authentication
- **Sign Up:** Create a personal account to start cataloging your movies.
- **Log In:** Access your account to manage your movie collection.

## Getting Started

### Installation
1. Clone this repository.
2. Install dependencies using `npm install`.
3. Set up environment variables using the .envexample as a reference (e.g., database connection, JWT secret).
4. Run the server using `node index.js`.

### API Endpoints

#### Movies
- `POST /movies`: Add a new movie to your collection.
- `GET /movies`: Get a list of all movies in your collection.
- `PUT /movies/:id`: Update details or mark a movie as watched/unwatched. (coming soon)
- `DELETE /movies/:id`: Remove a movie from your collection. (coming soon)

#### Users
- `POST /users/register`: Sign up to create an account.
- `POST /users/login`: Log in to your account.

### Technologies Used
- Node.js
- Express.js
- MongoDB
- JWT for authentication

## Contributing
Contributions are welcome! If you have any suggestions, feel free to send me an email - 📫 [reach me](mailto:carolinacalarruda@gmail.com)