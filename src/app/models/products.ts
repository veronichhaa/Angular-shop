export interface IProducts{
  id: number,
  title: string,
  image?: string,
  info: IProductsInfo
}

export interface IProductsInfo{
  subtitle: string,
  price: number,
  duration: number
}
