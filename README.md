# Express MongoDB API Example

## Prerequisites

- Node.js 20.6.0 or higher
- pnpm
- MongoDB

## Getting Started

Run a Docker container of MongoDB

```bash
docker run -d --rm -e MONGO_INITDB_ROOT_USERNAME=user -e MONGO_INITDB_ROOT_PASSWORD=secret -p 27018:27017 --name mongodb mongo:8.0
```

- Create application configuration

```bash
cp .env.example .env
nano .env
```

In the `.env` file, set the MONGODB_URL to `mongodb://user:secret@localhost:27018/admin`

## Installation

- Install dependencies

```bash
pnpm install
```

- Start Application

```bash
pnpm start
```

The application is launched by [Nodemon,](https://nodemon.com) which automatically restart the application on file change.
