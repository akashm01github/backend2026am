import { config } from "dotenv";

import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

config();

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey:process.env.GEMINI_API_KEY
})


model.invoke("can you tell me about my car?").then((response)=>{
    console.log(response.content);
})