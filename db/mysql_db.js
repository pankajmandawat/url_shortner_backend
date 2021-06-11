import mysql from "mysql2";

    const pool = mysql.createPool({
        connectionLimit: process.env.CONNECTION_LIMIT,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        debug: false
    });

export { pool };
