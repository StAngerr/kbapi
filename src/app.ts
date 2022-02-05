import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import * as expressSession from "express-session";
import cors from "cors";
import mySqlSessionModule from "express-mysql-session";
import cookieParser from "cookie-parser";

import db from "./utils/db";

import skillRouter from "./routes/Skill.router";
import userRouter from "./routes/User.router";
import sequelize from "./utils/sequelize";
import authRouter from "./routes/Auth.router";
import dbConfig from "./config/db.config";
import csurf from "csurf";

import { isResourceAllowed } from "./middlewares/is-auth";

const app = express();
const port = 3000;
const MySQLStore = mySqlSessionModule(expressSession);

const sessionStore = new MySQLStore({
  host: dbConfig.HOST,
  database: dbConfig.DB,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  checkExpirationInterval: 150000, // 2.5 min
  expiration: 300000 * 3, // 5 min
  // TODO:
  // clearExpired: true,
});
// app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());

console.log(process.env);

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

app.use(
  expressSession.default({
    secret: "stercesfoyarraokGyPVvOxtNoDFDeXlnr6ps2VIL78doI",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);
const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    // secure: true TODO: add this on prod for https only
  },
});

// app.use(csrfProtection);
let counter = 0;

app.get("/hello-world", (req, res) => {
  counter += 1;
  res.send("ok post");
  console.log(counter);
});

app.use("/auth", authRouter);

app.use(isResourceAllowed);

app.use("/skills", csrfProtection, skillRouter);
app.use("/users", csrfProtection, userRouter);

sequelize.authenticate().then(() => {
  console.log("Sequelize Connection has been established successfully.");
});

app.listen(port, () =>
  console.log("Server started at http://localhost:" + port)
);
