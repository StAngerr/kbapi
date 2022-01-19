import {Request, Response} from "express";
import User from "../models/User.model";

export const handleLoginRequest = (req: Request, res: Response) => {
    const { email, password } = req.body;
    User.findOne({ where: {
            email: email,
            password: password
        }}).then((user) => {
        // @ts-ignore
        req.session.user = user;
        req.session.save(() => {
            res.send('ok')
        })
    }).catch(() => {
        res.status(400)
        res.send('Wrong creadentials')
    })
}


export const handleLogoutRequest = (req: Request, res: Response) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}
