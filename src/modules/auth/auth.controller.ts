import { Router, Request, Response } from 'express'
import * as core from 'express-serve-static-core'
import { AuthDTO } from './dtos/auth.dtos'
import { validateAuth } from './auth.service'
import { ReturnError } from '@exceptions/dtos/return-error.dtos'

const authRouter = Router()

const router = Router()

authRouter.use('/auth', router)

router.post('/', async (req: Request<core.ParamsDictionary, any, AuthDTO>, res: Response): Promise<void> => {
    const user = await validateAuth(req.body).catch((error) => {
        new ReturnError(res, error)
    })

    res.send(user)
})

export default authRouter