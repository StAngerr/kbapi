import express from 'express';
import bodyParser from 'body-parser'
import db from './utils/db'


import skillRouter from "./routes/Skill.router";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}))

app.use('/skills', skillRouter);

app.get( "/", ( req, res ) => {
    // test code
    db.execute('SELECT * FROM test_tb').then((dbres) =>  {
        console.log(dbres)
        res.send(dbres[0])
    })

} );

app.listen(port, () => console.log('Server started at http://localhost:' + port))