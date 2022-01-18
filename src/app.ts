import express from 'express';
import bodyParser from 'body-parser'
import db from './utils/db';


import skillRouter from "./routes/Skill.router";
import userRouter from "./routes/User.router";
import sequelize from "./utils/sequelize";
import cors from 'cors';

const app = express();
const port = 3000;

// app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors());

app.use('/skills', skillRouter);
app.use('/users', userRouter);

app.get( "/", ( req, res ) => {
    // test code
    db.execute('SELECT * FROM test_tb').then((dbres) =>  {
        // console.log(dbres)
        res.send(dbres[0])
    })

} );

sequelize.authenticate().then(() => {
    console.log('Sequelize Connection has been established successfully.');
});

app.listen(port, () => console.log('Server started at http://localhost:' + port))