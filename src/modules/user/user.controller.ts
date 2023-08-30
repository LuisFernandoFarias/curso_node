import { Request, Response, Router } from 'express'
import { getUsers, createUser } from './user.service'
import * as core from 'express-serve-static-core'
import { UserInsertDTO } from './dtos/user-insert.dto'

export const userRouter = Router()

const router = Router()

userRouter.use('/user', router)

router.get('/', async (_, res: Response): Promise<void> => {
  const users = await getUsers()
  res.send(users)
})

router.post(
  '/',
  async (req: Request<core.ParamsDictionary, any, UserInsertDTO>, res: Response): Promise<void> => {
    const user = await createUser(req.body)
    res.send(user)
  },
)
