import { NextFunction, Request, Response } from "express";

export const isResourceAllowed = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.user) {
    res.status(403);
    res.send("You need to login to access this resource");
  } else {
    next();
  }
};
