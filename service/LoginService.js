import * as userModel from '../models/User.js'

export async function login(username, password) {
    // TODO: Encrypt Password while storing using Hash function
    console.log("Login with " + username, password);
        try {
            let user = await userModel.login(username, password);
            console.log(user);
            return user;
        } catch(err) {
            console.log("Error is ", err); 
            return err;
        }
}

export async function register(userObject) { 
    console.log("Inside Register" + userObject);
        try {
            let user = await userModel.register(userObject);
            console.log(user);
            return user;
        } catch(err) {
            console.log("Error is ", err); 
            return err;
        }
}
