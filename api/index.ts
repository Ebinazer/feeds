import { Router } from 'express'
import { userRouter } from '../controllers/user';
import { feedRouter } from '../controllers/feed';
import { authenticate } from 'passport';
import { readLogs } from '../controllers/feed/readLogs';



const router = Router()
    
router.use("/user", userRouter);
router.use("/feed", feedRouter);


export { router }