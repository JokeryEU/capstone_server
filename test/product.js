import ProductModel from '../src/models/productModel.js'
import { cookie, request } from './user.js'

export const productRoutesTest = () => {
  it('should check that the /products endpoint is working and returning all products', async () => {
    const response = await request.get('/products')
    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
  })

  // it('should check that the /products endpoint is working', async () => {
  //   const response = await request.get('/products')
  //   expect(response.status).toBe(200)
  //   expect(response.body.products).toBeDefined()
  //   expect(response.body.products.length).toBe(0)
  // })

  const validData = {
    user: '60da28b53d49cc19f4205d35',
    name: 'Sample name',
    price: 0,
    image: 'https://via.placeholder.com/250.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  }

  it('should check that the /products endpoint is allowing POST requests to create sample product data', async () => {
    const response = await request
      .post('/products')
      .set('Cookie', cookie)
      .send({})

    expect(response.status).toBe(201)
    expect(response.body._id).toBeDefined()
    expect(response.body.user).toBeDefined()
    expect(response.body.description).toEqual(validData.description)
    expect(response.body.name).toEqual(validData.name)
    expect(response.body.brand).toEqual(validData.brand)
    expect(response.body.category).toEqual(validData.category)
  })

  it('should test that the /products endpoint is returning valid data after creating', async () => {
    const response = await request
      .post('/products')
      .set('Cookie', cookie)
      .send(validData)

    expect(response.body._id).toBeDefined()

    const product = await ProductModel.findById(response.body._id)

    expect(product.createdAt).toStrictEqual(new Date(response.body.createdAt))
  })

  // TO DO: test
  it('should test that the /products endpoint is returning all the products available', async () => {
    const productResponse = await request
      .post('/products')
      .set('Cookie', cookie)
      .send({})

    const response = await request.get('/products')

    const included = response.body.products.some(
      (product) => product._id === productResponse.body._id
    )

    expect(included).toBe(true)
  })

  it('should test that status code is correct for not found /products/:id', async () => {
    const params = '101010101010101010010100'

    const response = await request.get(`/products/${params}`)

    const product = await ProductModel.findById(params)
    if (!product) {
      expect(response.status).toBe(404)
    }
  })

  it('should test that the delete endpoint is working', async () => {
    const product = await ProductModel.create(validData)
    const { _id } = product

    const response = await request
      .delete('/products/' + _id)
      .set('Cookie', cookie)
    const findProduct = await ProductModel.findById(_id)

    expect(response.status).toBe(204)
    expect(findProduct).toEqual(null)
  })
}
