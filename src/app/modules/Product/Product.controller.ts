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

const getSingleController = catchAsynch(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await productService.getSingleProductService(id)
  res.status(200).json(result)
})

const placeOrderController = catchAsynch(
  async (req: Request, res: Response) => {
    const updatedDocument = req.body
    const result = await productService.placeOrderService(updatedDocument)
    if (result) {
      res.status(200).json({ order: 'order placed successfully' })
    } else {
      res.status(400).json('something went wrong')
    }
  },
)

const updatecontroller = catchAsynch(async (req, res) => {
  const { id } = req.params
  const updatedDocument = req.body
  console.log(id)
  try {
    const result = await productService.updateService({ id, updatedDocument })
    res.status(200).json({
      message: 'Product updated successfully',
      data: result,
    })
  } catch (error: unknown) {
    res.status(500).json({
      message: 'Failed to update product',
      error: error.message,
    })
  }
})

const deleteController = catchAsynch(async (req, res) => {
  const { id } = req.params
  const result = await productService.deleteService(id)
  res.status(200).json({
    message: 'product Deleted Successfully',
    data: result,
  })
})

const addController = catchAsynch(async (req, res) => {
  const body = req.body
  const result = await productService.addService(body)
  res.status(200).json({
    message: 'product added successfully',
    data: result,
  })
})

export const productController = {
  getAllProductsController,
  getSingleController,
  placeOrderController,
  updatecontroller,
  deleteController,
  addController,
}
