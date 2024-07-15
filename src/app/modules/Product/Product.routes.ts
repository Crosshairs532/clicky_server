import { Router } from 'express'
import { productController } from './Product.controller'

const route = Router()

route.use('/', productController.getAllProductsController)

export const productRoute = route
