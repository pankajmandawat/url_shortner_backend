import mysql from "mysql2";
import * as dotenv from "dotenv";
import {pool} from "../db/mysql_db.js"
// TODO: Create TTL, expire_date and creation_Date fields in table
export async function create(url) {
    return new Promise(function (resolve, reject) {
            pool.getConnection(function(err, connection) {
                if (err) {
                    console.log("Error while connecting to pool");
                    return reject("Internal Server Error");
                }
                const queryString = "INSERT INTO ShortUrl (short_url, long_url) VALUES (?, ?)";
                console.log("Query is " + queryString);
                connection.query(queryString, [url.shortUrl, url.longUrl], (err, result) => {
                    if(err) {
                        console.log("err is " + err);
                        return reject(err);
                    }
                    console.log("result is" + result);
                    return resolve(result);
                });
                if (connection) connection.release();
        }); 
    });
}

export async function findOne(short_url) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function(err, connection) {
            const queryString = `SELECT * from UrlShortner.ShortUrl WHERE short_url=?`;
            connection.query(queryString, short_url, (err, result) => {
                if(err) {
                    return reject(err);
                }
                const row = result[0];
                console.log("Row is " + JSON.stringify(row));
                return resolve(row);
            });
            if (connection) connection.release();
        });
    });    
}
