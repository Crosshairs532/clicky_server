import { Router } from 'express'
import { productRoute } from '../modules/Product/Product.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/product',
    route: productRoute,
  },
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export const Routes = router
