import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/User.model";
import UserDTO from "../models/dto/UserDTO";
import session from "express-session";

const saltRounds = 12;

type ExtendedSession = session.Session & { user: User };
type RequestExtendedSession = Request & { session: ExtendedSession };

export const handleLoginRequest = (
  req: RequestExtendedSession,
  res: Response
) => {
  const { email, password } = req.body;
  User.findOne({
    where: {
      email: email,
    },
  })
    .then((user: User | null) => {
      if (!user) {
        res.status(400);
        res.send("Wrong creadentials");
        return;
      }
      bcryptjs.compare(password, user.password).then((value) => {
        if (!value) {
          res.status(400);
          res.send("Wrong creadentials");
          return;
        }
        req.session.user = user;
        req.session.save(() => {
          res.send(new UserDTO(user));
        });
      });
    })
    .catch((e) => {
      res.status(400);
      res.send(e);
    });
};

export const handleRegisterRequest = (req: Request, res: Response) => {
  const { email, password } = req.body;

  bcryptjs.hash(password, saltRounds).then((hashedPassword: string) => {
    User.create({
      email,
      password: hashedPassword,
    }).then((newUser) => {
      newUser.save().then((user) => res.send(user));
    });
  });
};

export const handleLogoutRequest = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.send("");
  });
};

export const validateSession = (req: RequestExtendedSession, res: Response) => {
  if (req.session.user) {
    res.send(req.session.user);
  } else {
    res.status(401);
    res.send("Unauthorized");
  }
};
