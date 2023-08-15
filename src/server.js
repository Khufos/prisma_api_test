// importando routes para dentro do servidor 
import {router } from './routes'
//---------------------------------//
import express from 'express';
//---------------------------------//
const app = express();
app.use(express.json())
app.use( router ) // <--- Usando as rotas .

app.listen(3030,() =>console.log('Servidor online na porta 3030'))