import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  url: string | undefined;
};
interface GenerateRequest extends NextApiRequest {
  body: {
    prompt: string;
    n: number;
    size: string;
  };
}
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: GenerateRequest,
  res: NextApiResponse<ResponseData>
) {
  const promptString = req.body.propmpt;
  console.log(promptString);
  try {
      const response = await openai.createImage({
        prompt: "Logo for 'Offer-Finder' business aplication in light colors and modern style",
        n: 1,
        size: "256x256",
      });
    console.log(response.data.data[0].url);
    const imageURL = response.data.data[0].url;
    res.status(200).json({ url: imageURL });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
  res.status(200).json({ url: "/chip.png" });
}
