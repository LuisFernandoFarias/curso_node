import { Response, Router } from 'express'

export const productRouter = Router()

const router = Router()

productRouter.use('/product', router)

router.get('/', function (_, res: Response) {
  res.send('PRODUTO')
})
