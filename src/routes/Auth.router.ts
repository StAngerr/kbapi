import {NextFunction, Request, Response, Router} from 'express';
import {handleLoginRequest, handleLogoutRequest} from "../controllers/Auth.controller";


const router =  Router();

router.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Auth router')
    next();
});

// router.use((req: Request, res: Response, next: NextFunction) => {
//     console.log('User router')
//     next();
// })

router.post('/login',(req:Request, res:Response, next: NextFunction) => {
    handleLoginRequest(req, res)
});

router.get('/logout', (req:Request, res:Response) => {
    handleLogoutRequest(req, res);
})

export default router
