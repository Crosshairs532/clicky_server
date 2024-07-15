import { TParams } from './Product.interface'
import productModel from './Product.model'

const getAllProductService = async (params: TParams) => {
  const query = { ...params }
  let filter: Record<string, unknown> = {}
  let sort: { price: number } = { price: 1 }
  console.log({ params })
  if (params) {
    if (params.productName) {
      console.log('productName')
      filter = {
        ...filter,
        $or: [
          {
            title: { $regex: params.productName, $options: 'i' },
          },
          {
            brand: { $regex: params.productName, $options: 'i' },
          },
        ],
      }
    }
    if (params.sort) {
      if (params.sort === 'low') {
        sort = { price: 1 }
      } else {
        sort = { price: -1 }
      }
    }
    if (params.maxPrice || params.minPrice) {
      console.log('price')
      filter = {
        ...filter,
        $and: [
          { price: { $gte: parseFloat(params.minPrice as string) } },
          { price: { $lte: parseFloat(params.maxPrice as string) } },
        ],
      }
    }
  }

  console.log({ filter }, '==>')
  const result = await productModel.find(filter).sort(sort)
  return result
}

export const productService = {
  getAllProductService,
}
