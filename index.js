/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

const port = process.env.PORT || 3001
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (_req, res) => {
  res.send(`API no ar, na Porta ${port}`);
});

app.post('/auth', (async (req, res) => {
  const { client_id, client_secret, code, redirect_uri, grant_type } = req.body;
  console.log("aqui", req.body)
  const APIPOST = axios.create({
    baseURL: 'https://api.mercadolibre.com/oauth/token',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });

  try {
    const {data} = await APIPOST.post('', qs.stringify({
          client_id, client_secret, code, redirect_uri, grant_type
      }))
    return res.json({data});
  } catch (error) {
    return res.status(400).json({error});
  }
}));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});