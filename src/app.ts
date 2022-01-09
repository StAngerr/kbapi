import express from 'express';
import bodyParser from 'body-parser'

import skillRouter from "./routes/Skill.router";

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended: false}))

app.use('/skills', skillRouter);

app.get( "/", ( req, res ) => {
    const a = 10;
    const b = a +13;
    res.send( "Hello world!1" );
} );

app.listen(port, () => console.log('Server started at http://localhost:' + port))