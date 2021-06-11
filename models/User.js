import { pool } from "../db/mysql_db.js";
import {
  handlerError,
  handlerSuccess,
  INTERNAL_SERVER_ERROR,
} from "../utils.js";

export async function login(username, password) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log("Error while connecting to pool");
        return reject(handlerError(INTERNAL_SERVER_ERROR, 500));
      }
      const queryString = `Select Name from Users where Email_Id="${username}" and password="${password}`;
      console.log("Query is " + queryString);
      connection.query(queryString, (err, user) => {
        if (err) {
          console.log("err is " + err);
          return reject(handlerError("Incorrect Email Id or Password", 401));
        }
        console.log("result is" + user);
        return resolve(user);
      });
      if (connection) connection.release();
    });
  });
}
// TOOD: Handle SQL errors like connection and server down errors and send appropriate message to customers
export async function register(userObject) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log("Error while connecting to pool");
        return reject(handlerError(INTERNAL_SERVER_ERROR, 500));
      }
      const queryString = `select count(*) from Users where email_id='${userObject.username}'`;
      console.log(queryString);
      connection.query(queryString, (err, result) => {
        let count = result[0]["count(*)"];
        if (err) {
          return reject(err);
        }
        if (count > 0) {
          return reject(handlerError("Email Id  is already in use", 403));
        } else {
          const queryString = `Insert into users (Name,Last_Name,Email_Id,Password) values ('${userObject.name}','${userObject.lastName}','${userObject.username}','${userObject.password}')`;
          console.log(queryString);
          connection.query(queryString, (err, result) => {
            if (err) {
              return reject(
                handlerError("User not created please try after some time", 500)
              );
            }
            return resolve(handlerSuccess("User is created successfully", 200));
          });
        }
      });
      if (connection) connection.release();
    });
  });
}

export async function createNewUser(userObject) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log("Error while connecting to pool");
        return reject(handlerError(INTERNAL_SERVER_ERROR, 500));
      }
      const queryString = `Insert into users (Name,Last_Name,Email_Id,Password) values (${userObject.name},${userObject.lastName},${userObject.username},${userObject.password})`;
      connection.query(queryString, short_url, (err, result) => {
        if (err) {
          return reject(
            handlerError("User not created please try after some time", 500)
          );
        }
        const row = result[0];
        console.log("Row is " + JSON.stringify(row));
        return resolve(row);
      });
      if (connection) connection.release();
    });
  });
}
