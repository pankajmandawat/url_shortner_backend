import validUrl from 'valid-url';
import shortid from 'shortid';
import * as urlModel from '../models/Url.js'

const baseUrl = 'http:localhost:5000';

export async function createURL(original_url, custom_alias= 'NA', expire_date) {
    // encode the url and create url
    // store the url into DB and return to client
    const shortId = shortid.generate()
    console.log("Generated Short ID %s for Url %s", shortId, original_url);
    if (validUrl.isUri(original_url)) {
        try {
            let UrlObj = {shortUrl: urlCode, longUrl: original_url}
            let url = await urlModel.create(UrlObj);
            return baseUrl + "/" + urlCode;
        } catch(err) {
            console.log("Error while creating short URL: ", JSON.stringify(err)); 
            return err;
        }
    }
    else {
        return {"error": "Invalid Original URL Error"};
    }
}

export async function getLongUrl(short_url) {
    try {
        let longUrl = await urlModel.findOne(short_url);
        console.log('Long Url is ' + longUrl);
        return longUrl;
    } catch (err) {
        console.log("Error while getting long Url: ", JSON.stringify(err)); 
    }
}

// TODO: implementation required in case of ttl
export function deleteURL(original_url, custom_alias = 'NA', expire_date) {
    // delete URL from Table
}
