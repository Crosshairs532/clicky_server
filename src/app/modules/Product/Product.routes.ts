import { Router } from 'express'
import { productController } from './Product.controller'

const route = Router()

route.get('/single/:id', productController.getSingleController)
route.get('/', productController.getAllProductsController)
route.patch('/payment', productController.placeOrderController)
route.put('/update/:id', productController.updatecontroller)
route.delete('/delete/:id', productController.deleteController)
route.post('/', productController.addController)
export const productRoute = route
