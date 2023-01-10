// 

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
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
    const { message, currentModel } = req.body;
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
    });
res.json({
    message: response.data.choices[0].text,
})
})

app.get('/models', async (req, res) => {
    const response = await openai.listEngines();
    console.log(response.data.data)
    res.json({
        models: response.data.data
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

// const response = await openai.listEngines();
