import { Router } from 'express'
import { getUsers, createUser } from './user.service'

export const userRouter = Router()

const router = Router()

userRouter.use('/user', router)

router.get('/', async (req, res) => {
  const users = await getUsers()
  res.send(users)
})

router.post('/', async (req, res) => {
  const user = await createUser(req.body)
  res.send(user)
})