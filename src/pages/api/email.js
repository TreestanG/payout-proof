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


const input = 'generate a random email';
const promptString = `input: generate a random email
output: scottie93@hotmail.com

input: generate a random email
output: kali.oconner@gmail.com

input: generate a random email
output: rashawn93@hotmail.com

input: generate a random email
output: makenna_hand67@gmail.com

input: generate a random email
output: marcelina.wisozk@gmail.com

input: generate a random email
output: tyra21@gmail.com

input: generate a random email
output: jalyn.crist@gmail.com

input: generate a random email
output: kelsie.kirlin@yahoo.com

input: generate a random email
output: gwendolyn.oberbrunner10@hotmail.com

input: generate a random email
output: brett_kirlin88@hotmail.com

input: generate a random email
output: delta29@hotmail.com

input: generate a random email
output: dangelo91@hotmail.com

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

        res.status(200).json({ email: aiGen })
    })
}
