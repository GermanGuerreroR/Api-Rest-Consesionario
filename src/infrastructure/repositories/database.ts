import mysql from "mysql2/promise";
import _default from "../../../config/default";


export const getPoolConnection = async () => {
    const connection = mysql.createPool({
        host: _default.HOST,
        port: _default.PORT,
        user: _default.USER,
        password: _default.PASSWORD,
        database: _default.DATABASE
    });

    return connection;
}