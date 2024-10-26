# Express MongoDB API Example

## Prerequisites

- Node.js 20.6.0 or higher
- pnpm
- MongoDB

## Getting Started

- Create application configuration

```bash
cp .env.example .env
nano .env
```

In the `.env` file, don't forget to set the MONGODB_URL

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
