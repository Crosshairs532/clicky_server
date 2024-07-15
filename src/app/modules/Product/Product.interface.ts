export type TProduct = {
  image1: string
  image2: string
  title: string
  brand: string
  available_quantity: number
  price: number
  rating: number
  description: string
  add_to_cart_button: string
}

export type TParams = {
  minPrice?: string
  maxPrice?: string
  productName?: string
  sort?: string
}
