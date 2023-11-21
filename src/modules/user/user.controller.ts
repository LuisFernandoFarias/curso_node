import { Request, Response, Router } from 'express'
import { getUsers, createUser } from './user.service'
import * as core from 'express-serve-static-core'
import { UserInsertDTO } from './dtos/user-insert.dto'
import { NotFoundException } from '@exceptions/not-found-exception'
import { ReturnError } from '@exceptions/dtos/return-error.dtos'
import { authMiddleware } from 'src/middlewares/auth.middleware'

const createUserController = async (req: Request<core.ParamsDictionary, any, UserInsertDTO>, res: Response): Promise<void> => {
  const user = await createUser(req.body).catch((error) => {
    new ReturnError(res, error)
  })
  res.send(user)
}

const getUsersController = async (req: Request, res: Response): Promise<void> => {
  const users = await getUsers().catch((error) => {
    if (error instanceof NotFoundException) {
      res.status(204)
    } else {
      new ReturnError(res, error)
    }
  })
  res.send(users)
}

const userRouter = Router()
const router = Router()

userRouter.use('/user', router)

router.post('/', createUserController)
router.use(authMiddleware)
router.get('/', getUsersController)

export default userRouter