require("dotenv").config();
module.exports = {
  "development": {
    "username": process.env.DB_USER_NAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port":process.env.DB_PORT,
    "dialect": "postgres",
    "logging":false
  },
  "test": {
    "username": "postgres",
    "password": "trabajodb",
    "database": "pruebav1",
    "host": "127.0.0.1",
    "port":5432,
    "dialect": "postgres",
    "logging":false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "port":5432,
    "dialect": "postgres"
  }
}
