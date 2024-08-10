import express from "express";
import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "../config/index.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import { authenticate } from "../middlewares/index.js";

const router = express.Router();

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.get("/", (req, res) => {
  res.send("Hello from DALL.E Routes");
});

router.post("/", authenticate, async (req, res, next) => {
  console.log("inside", OPENAI_API_KEY);
  try {
    const { prompt } = req.body;
    console.log("prompt", prompt);
    // const aiResponse = await openai.createImage({
    //   prompt,
    //   n: 4,
    //   size: "512x512",
    //   // size: "256x256", // for testing purpose
    //   response_format: "b64_json",
    //   // response_format: "url",
    // });

    // const images = aiResponse?.data?.data;
    // console.log("images", images);
    // res.status(200).json({ images, prompt });
    // we only have to share the list of images 
    res.status(200).json({
      images: ['https://randomwordgenerator.com/img/picture-generator/55e5d4454b51ae14f1dc8460962e33791c3ad6e04e507440762879dc904ecc_640.jpg', 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://randomwordgenerator.com/img/picture-generator/57e0d6474e56ae14f1dc8460962e33791c3ad6e04e507440752f73dd9249c4_640.jpg', 'https://randomwordgenerator.com/img/picture-generator/57e7dc4b4a5aac14f1dc8460962e33791c3ad6e04e507749712e79d29045cc_640.jpg']
      , prompt
    })
  } catch (err) {
    console.log(err);
    console.log(err?.message || err?.response?.data?.error?.message);
    const message =
      err?.response?.data?.error?.message || "Internal server error";

    return next(CustomErrorHandler.serverError(message));
  }
});

export default router;
