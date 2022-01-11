import {Router, Request, Response, NextFunction} from "express";
import User from "../models/User.model";

const router = Router();


router.use((req: Request, res: Response, next: NextFunction) => {
    console.log('User router')
    next();
})

router.get('/', (req: Request, res: Response) => {
    User.findAll().then((users) => res.send(users))
});

router.get('/:userId', (req: Request, res: Response) => {
    const id = req.params.userId;
    User.findOne({
        where: { id }
    }).then((users) => res.send(users)).catch(() => {
        res.status(404)
        res.send('User not found')
    })
})

router.post( '/', (req: Request, res: Response) => {
    console.log(req.body)
    const {email, lastName, firstName} = req.body
    User.create({email, lastName, firstName}).then((user) => {
        user.save().then(() => res.send(user)).catch(() =>  {
            res.status(400);
            res.send('Failed to save user')
        })
    }).catch((err) => {
        res.status(400)
        res.send(err)
    })
})


router.put( '/:userId', (req: Request, res: Response) => {
    const {userId} = req.params;

    User.findOne({where: {id: userId}}).then(({id, email: uEmail, lastName: uLastName, firstName: uFirstName}: User) => {
        const {email = uEmail, lastName = uLastName, firstName = uFirstName} = req.body;
        User.update({email, lastName, firstName}, {where: {id: userId}}).then((updatedUser) => {
            res.send(updatedUser);
        }).catch((err) => {
            res.status(400);
            res.send('Failed to update')
        })
    }).catch(() => {
        res.status(404);
        res.send(`User with id ${userId} not found`)
    })
})

export default router