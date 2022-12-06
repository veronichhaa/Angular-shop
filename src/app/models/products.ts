export interface IProducts{
  id: number,
  title: string,
  image?: string,
  info: IProductsInfo,
  quantity: number
}

export interface IProductsInfo{
  subtitle: string,
  price: number,
  duration: string
}
