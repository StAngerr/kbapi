import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/User.model";
import UserDTO from "../models/dto/UserDTO";

const saltRounds = 12;

export const handleLoginRequest = (req: Request, res: Response) => {
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
        // @ts-ignore
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