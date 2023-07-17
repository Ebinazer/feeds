import { Router } from 'express'
import { login } from './login';
import { adduser } from './createUser';
import { authenticate } from '../../system/helpers/authenticate';
import { loadUser } from './loadUser';
import { deleteUser } from './deleteUser';
import { updateUser } from './updateUser';

const router = Router()

router.post("/login", login);
router.post("/add-user", authenticate, adduser)
router.get("/load-user", authenticate, loadUser)
router.delete("/delete-user/:uuid", authenticate, deleteUser)
router.put("/update-user/", authenticate, updateUser)



export const userRouter = router;