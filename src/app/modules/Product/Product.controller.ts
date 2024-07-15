import { Request, Response } from 'express'
import { catchAsynch } from '../../utils/catchAsynch'
import { productService } from './Product.service'

const getAllProductsController = catchAsynch(
  async (req: Request, res: Response) => {
    const { selector } = req?.query
    let params = {}
    if (selector) {
      const param = JSON.parse(selector as string)
      params = param
    }

    const result = await productService.getAllProductService(params)
    res.status(200).json(result)
  },
)
export const productController = { getAllProductsController }
