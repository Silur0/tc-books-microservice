## Backend Setup

The backend is implemented using Node.js, utilizing two key frameworks: TypeORM for object-relational mapping and Express.js for building the web server. The application is powered by a PostgreSQL database.

### Versions Used

-   **Node.js**: v20.18.0

To find your Node.js version, run:

```bash
  node -v
```

To find your PostgreSQL version, run:

-   **PostgreSQL**: v16.4.2

```bash
  psql --version
```

### Instalation

1. Set up a PostgreSQL database with a user that has write access.

2. Install dependencies

```bash
  cd microservice-books
  npm install
```

3. Create and fill .env file

```.env
NODE_ENV=development
PORT=5000               /* Default Port */

OPENAI_API_KEY=***      /* Key to OpenAI */

DATABASE_URL="postgresql://user:password@host:port/database"    /* PostgreSQL connection string */

JWT_SECRET=123456       /* Secrete to generate tokens */
```

4. Run application

```bash
  npm start
```
