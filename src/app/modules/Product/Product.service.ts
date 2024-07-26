import { ObjectId } from 'mongodb'
import { TParams } from './Product.interface'
import productModel from './Product.model'

const getAllProductService = async (params: TParams) => {
  let filter: Record<string, unknown> = { isDeleted: 'false' }
  let sort: { createdAt: number; isDeleted: number } = {
    isDeleted: 1,
    createdAt: -1,
  }
  console.log(params)
  if (params) {
    if (params.productName) {
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
        sort = { ...sort, price: 1 }
      } else {
        sort = { ...sort, price: -1 }
      }
    }
    if (params.maxPrice >= 0 || params.minPrice >= 0) {
      filter = {
        ...filter,
        $and: [
          { price: { $gte: parseFloat(params.minPrice as string) } },
          { price: { $lte: parseFloat(params.maxPrice as string) } },
        ],
      }
    }
  }
  console.log(filter, 'filter')
  const result = await productModel.find(filter).sort(sort)
  console.log(result, 'res')
  return result
}

const getSingleProductService = async (id: any) => {
  const result = await productModel.findById(id)
  return result
}

const placeOrderService = async (data: any) => {
  try {
    const allId = data.map((data: any) => new ObjectId(data.id))
    const getAllproductbyId = await productModel.find({
      _id: { $in: allId },
    })

    //  update the document ; minus the values
    for (const product of getAllproductbyId) {
      const orderItem = data.find(
        (item: any) => item.id === product._id.toString(),
      )
      if (orderItem) {
        const decreaseQuantityBy = orderItem.total
        await productModel.findByIdAndUpdate(product._id, {
          $inc: { available_quantity: -decreaseQuantityBy },
        })

        // console.log(`Updated available quantity for product ${product._id}`)
      }
    }
    return true
  } catch (err) {
    console.log(err)
  }
}

const updateService = async (data: any) => {
  try {
    const result = await productModel.findByIdAndUpdate(
      { _id: data?.id },
      data?.updatedDocument,
      {
        new: true,
        upsert: true,
      },
    )

    console.log(result, 'service')
    return result
  } catch (error: unknown) {
    throw new Error(`Error updating product: ${error.message}`)
  }
}

const deleteService = async (id: any) => {
  const result = await productModel.findByIdAndUpdate(id, {
    isDeleted: 'true',
  })
  return result
}

const addService = async (data: any) => {
  console.log(data)

  const result = await productModel.create(data)
  return result
}

export const productService = {
  getAllProductService,
  getSingleProductService,
  placeOrderService,
  updateService,
  deleteService,
  addService,
}
