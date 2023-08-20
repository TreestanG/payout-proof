const { TextServiceClient } =
    require("@google-ai/generativelanguage").v1beta2;

const { GoogleAuth } = require("google-auth-library");
require('dotenv').config()

const MODEL_NAME = "models/text-bison-001";
const API_KEY = process.env.API_KEY;

const client = new TextServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const input = 'generate a random roblox username without a full name of numbers';
const promptString = `input: generate a random roblox username
output: monkeydluffy060611
input: generate a random roblox username
output: fafafififo
input: generate a random roblox username
output: bomstaerk1
input: generate a random roblox username
output: cammovoid1616
input: generate a random roblox username
output: AfricanKing412
input: generate a random roblox username
output: nuruini2008
input: generate a random roblox username
output: ethan0s
input: generate a random roblox username
output: 4giotoodo
input: generate a random roblox username
output: alpk_stylez
input: generate a random roblox username
output: perodohd_ff
input: generate a random roblox username
output: zeblox_boom
input: ${input}
output:`;
const stopSequences = [];

export default function handler(req, res) {

    client.generateText({
        model: MODEL_NAME,
        temperature: 1,
        candidateCount: 1,
        top_k: 40,
        top_p: 0.95,
        max_output_tokens: 1024,
        stop_sequences: stopSequences,
        safety_settings: [{ "category": "HARM_CATEGORY_DEROGATORY", "threshold": 1 }, { "category": "HARM_CATEGORY_TOXICITY", "threshold": 1 }, { "category": "HARM_CATEGORY_VIOLENCE", "threshold": 2 }, { "category": "HARM_CATEGORY_SEXUAL", "threshold": 2 }, { "category": "HARM_CATEGORY_MEDICAL", "threshold": 2 }, { "category": "HARM_CATEGORY_DANGEROUS", "threshold": 2 }],
        prompt: {
            text: promptString,
        },
    }).then(result => {
        let aiGen = result[0].candidates[0].output

        res.status(200).json({ username: aiGen })
    })
}
