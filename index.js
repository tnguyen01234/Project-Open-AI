// 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


const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
  organization: "org-KPZB89vx4X1WbeD3NBXfzTSL",
  apiKey: process.env.API__KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3090

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
    });
res.json({
    message: response.data.choices[0].text,
})
})

app.get('/models', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
    });
res.json({
    message: response.data.choices[0].text,
})
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

// const response = await openai.listEngines();
