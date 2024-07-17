import { TProduct } from './Product.interface'
import mongoose, { model, Schema } from 'mongoose'

const productShema = new Schema<TProduct>(
  {
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    title: { type: String, required: true },
    brand: { type: String, required: true },
    available_quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    add_to_cart_button: { type: String, required: true },
    isDeleted: {
      type: String,
      default: 'false',
    },
  },
  {
    timestamps: true,
  },
)

const productModel = model('products', productShema)
export default productModel
