import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/User.model";
import UserDTO from "../models/dto/UserDTO";
import crypto from "crypto";
import {
  confirmEmailTmpl,
  restorePasswordTmpl,
  sendEmail,
} from "../services/email.service";
import UserAuthModel from "../models/UserAuth.model";
const saltRounds = 12;

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}

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

// TODO: add check for exising email
export const handleRegisterRequest = (req: Request, res: Response) => {
  const { email, password } = req.body;

  bcryptjs.hash(password, saltRounds).then((hashedPassword: string) => {
    const verifyId = crypto.randomBytes(20).toString("hex");
    User.create({
      email,
      password: hashedPassword,
      confirmationToken: verifyId,
    }).then((newUser) => {
      newUser
        .save()
        .then((user) => {
          res.send(new UserDTO(user));
        })
        .then(() => {
          sendEmail(email, confirmEmailTmpl(verifyId));
        })
        .catch((e) => console.log(e));
      UserAuthModel.create({
        userId: newUser.id,
        confirmEmailToken: verifyId,
      }).then((authData: UserAuthModel) => authData.save());
    });
  });
};

export const handleLogoutRequest = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.send("");
  });
};

export const validateSession = (req: Request, res: Response) => {
  if (req.session.user) {
    res.send(new User(req.session.user));
  } else {
    res.status(401);
    res.send("Unauthorized");
  }
};

export const confirmEmail = (req: Request, res: Response) => {
  const { token } = req.query;
  if (token) {
    User.findOne({
      where: {
        confirmationToken: token,
      },
    }).then((user: User | null) => {
      if (user) {
        res.send("Success");
      } else {
        res.status(400);
        res.send("Invalid token");
      }
    });
  } else {
    res.status(400);
    res.send("Invalid url");
  }
};

export const restorePassword = (req: Request, res: Response) => {
  const { email } = req.body;
  User.findOne({
    where: {
      email,
    },
  }).then((user: User | null) => {
    if (user) {
      UserAuthModel.findOne({
        where: {
          userId: user.id,
        },
      }).then((userAuth: UserAuthModel) => {
        const verifyId = crypto.randomBytes(10).toString("hex");
        sendEmail(email, restorePasswordTmpl(verifyId, user.id.toString()));
        userAuth.update({
          changePasswordVerifyToken: verifyId,
        });
      });
    }
  });
  res.send(true);
};

export const changePassword = (req: Request, res: Response) => {
  const { userId, restoreToken, newPassword } = req.body;
  User.findOne({
    where: {
      id: userId,
    },
  }).then((user: User | null) => {
    if (user) {
      UserAuthModel.findOne({
        where: {
          userId,
        },
      }).then((authModel: UserAuthModel) => {
        if (authModel && authModel.changePasswordVerifyToken === restoreToken) {
          bcryptjs
            .hash(newPassword, saltRounds)
            .then((hashedPassword: string) => {
              user
                .update({
                  password: hashedPassword,
                })
                .then(() => res.send(true));
            });
        }
      });
    } else {
      res.status(400);
      res.send("Something went wrong");
    }
  });
};
