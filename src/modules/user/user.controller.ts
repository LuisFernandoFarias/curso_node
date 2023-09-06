import { Request, Response, Router } from 'express'
import { getUsers, createUser } from './user.service'
import * as core from 'express-serve-static-core'
import { UserInsertDTO } from './dtos/user-insert.dto'
import { NotFoundException } from '@exceptions/not-found-exception'
import { ReturnError } from '@exceptions/dtos/return-error.dtos'

export const userRouter = Router()

const router = Router()

userRouter.use('/user', router)

router.get('/', async (_, res: Response): Promise<void> => {
  const users = await getUsers().catch((error) => {
    if(error instanceof NotFoundException) {
      res.status(204)
    } else {
      new ReturnError(res, error)
    }
  })
  res.send(users)
})

router.post(
  '/',
  async (req: Request<core.ParamsDictionary, any, UserInsertDTO>, res: Response): Promise<void> => {
    const user = await createUser(req.body).catch((error) => {
      new ReturnError(res, error)
    })
    res.send(user)
  },
)
