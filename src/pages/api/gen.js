// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { TextServiceClient } =
  require("@google-ai/generativelanguage").v1beta2;

const { GoogleAuth } = require("google-auth-library");
require('dotenv').config()

const MODEL_NAME = "models/text-bison-001";
const API_KEY = process.env.API_KEY;

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});


const input = 'generate a random username that a person would use on discord and a thank you reply that a gen-z would say. seperate name and reply with a comma';
const promptString = `input: generate a random username that a person would use on discord and a thank you reply that a gen-z would say. seperate name and reply with a comma
output: xxAlpha, THANK YOU
input: generate a random username that a person would use on discord and a thank you reply that a gen-z would say. seperate name and reply with a comma
output: idk, TYSM I DIDNT THINK THIS WAS REAL
input: generate a random username that a person would use on discord and a thank you reply that a gen-z would say. seperate name and reply with a comma
output: square2030, tyty <3
input: generate a random username that a person would use on discord and a thank you reply that a gen-z would say. seperate name and reply with a comma
output: dabola4, holy shit thanks, u guys are legit
input: generate a random username that a person would use on discord and a thank you reply that a gen-z would say. seperate name and reply with a comma
output: nolenmason, thanks
input: generate a random username that a person would use on discord and a thank you reply that a gen-z would say. seperate name and reply with a comma
output: poland_lover, tysm for nitro 
input: generate a random username that a person would use on discord and a thank you reply that a gen-z would say. seperate name and reply with a comma
output: RACECAR400, thanks for nitro, u are legit
input: ${input}
output:`;

export default function handler(req, res) {

  client.generateText({
    model: MODEL_NAME,
    prompt: {
      text: promptString,
    },
  }).then(result => {
    let aiGen = result[0].candidates[0].output
    const [username, response] = aiGen.split(/,(.*)/s)

    res.status(200).json({username, response})
  })
}
