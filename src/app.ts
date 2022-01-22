import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import * as expressSession from "express-session";
import cors from "cors";
import mySqlSessionModule from "express-mysql-session";

import db from "./utils/db";

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
  password: dbConfig.PASSWORD,
  checkExpirationInterval: 150000, // 2.5 min
  expiration: 300000, // 5 min
  // TODO:
  // clearExpired: true,
});
// app.use(bodyParser.urlencoded({extended: true}))
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

app.use("/auth", authRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.session.id);
  // @ts-ignore
  if (!req.session.user) {
    res.status(403);
    res.send("You need to login to access this resource");
  } else {
    next();
  }
});

app.use("/skills", skillRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  db.execute("SELECT * FROM test_tb").then((dbres) => {
    res.send(dbres[0]);
  });
});

sequelize.authenticate().then(() => {
  console.log("Sequelize Connection has been established successfully.");
});

app.listen(port, () =>
  console.log("Server started at http://localhost:" + port)
);
