# Notes App

A simple and efficient Bookmarks application built with [NestJS](https://nestjs.com/), providing RESTful API endpoints to manage your notes.

## Features

<!-- - **User Authentication:** Secure user registration and login using JWT authentication. -->
- **Notes:** Create, read, update, and delete notes.

## Tech Stack

- **Backend Framework:** [NestJS](https://nestjs.com/)
- **Database:** PostgreSQL (via Prisma ORM)
<!-- - **Authentication:** JWT (JSON Web Token) -->
<!-- - **Environment Management:** [dotenv](https://www.npmjs.com/package/dotenv) -->

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/SdxCoder/nestjs.git
   cd 01.notes
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and configure the following variables:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/notesdb
   ```

4. Run database migrations (if using an ORM):

   ```bash
   npx prisma migrate dev
   ```

5. Start the application:

   ```bash
   npm run start:dev
   ```

6. Access the API at `http://localhost:3000`.

<!-- 
## API Documentation

The API is documented using Swagger. After starting the app, visit:

```
http://localhost:3000/api
```

### Example Endpoints

#### Authentication

- **POST** `/auth/register` - Register a new user
- **POST** `/auth/login` - Authenticate and retrieve a token

#### Bookmarks

- **GET** `/bookmarks` - Retrieve all bookmarks
- **POST** `/bookmarks` - Create a new bookmark
- **PUT** `/bookmarks/:id` - Update a bookmark by ID
- **DELETE** `/bookmarks/:id` - Delete a bookmark by ID

## Testing

Run the test suite using the following command:

```bash
npm run test
```

## Deployment

To deploy the app:

1. Build the project:

   ```bash
   npm run build
   ```

2. Use Docker or your preferred deployment platform to host the app.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add some feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [NestJS Documentation](https://docs.nestjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Swagger](https://swagger.io/) -->
