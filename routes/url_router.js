import express from "express";
import * as urlService from "../service/Url.js";
import { handlerError, INVALID_INPUT_EXCEPTION } from "../utils.js";
const urlRouter = express.Router();

urlRouter.post("/create", (req, res) => {
  const original_url = req.body.Url;
  if (!original_url) {
    handlerError(INVALID_INPUT_EXCEPTION, 400);
  }
  console.log("Original Url: " + original_url);
  urlService
    .createURL(original_url, req.body.custom_alias, req.body.expire_date)
    .then((data) => {
      console.log("response data is " + JSON.stringify(data));
      return res.json(data);
    })
    .catch((err) => {
      console.info("Error is" + err);
      handlerError(err.message, err.statusCode);
    });
});

urlRouter.get("/:code", async (req, res) => {
  const shortUrlCode = req.params.code;
  if (!shortUrlCode) {
    handlerError(INVALID_INPUT_EXCEPTION, 400);
  }
  console.log("Short Url Code " + shortUrlCode);
  urlService
    .getLongUrl(shortUrlCode)
    .then((data) => {
      console.log("data is " + data);
      return res.json(data);
    })
    .catch((err) => {
      console.error("Error" + err);
      handlerError(err.message, err.statusCode);
    });
});

export { urlRouter };
