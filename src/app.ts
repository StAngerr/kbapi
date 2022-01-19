import express from 'express';
import bodyParser from 'body-parser'
import * as expressSession  from 'express-session'
import cors from 'cors';
import mySqlSessionModule from 'express-mysql-session';

import db from './utils/db';

import skillRouter from "./routes/Skill.router";
import userRouter from "./routes/User.router";
import sequelize from "./utils/sequelize";
import authRouter from "./routes/Auth.router";
import dbConfig from "./config/db.config";

const app = express();
const port = 3000;
const MySQLStore = mySqlSessionModule(expressSession);
const sessionStore = new MySQLStore({
    host: dbConfig.HOST,
    database: dbConfig.DB,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD
});

// app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors());
app.use(expressSession.default({ secret: 'stercesfoyarraokGyPVvOxtNoDFDeXlnr6ps2VIL78doI', resave: false, saveUninitialized: false, store: sessionStore }));


app.use('/auth', authRouter);
app.use('/skills', skillRouter);
app.use('/users', userRouter);

app.get( "/", ( req, res ) => {
    db.execute('SELECT * FROM test_tb').then((dbres) =>  {
        res.send(dbres[0])
    })
} );

sequelize.authenticate().then(() => {
    console.log('Sequelize Connection has been established successfully.');
});

app.listen(port, () => console.log('Server started at http://localhost:' + port))
