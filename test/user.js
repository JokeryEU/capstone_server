import dotenv from 'dotenv'
import supertest from 'supertest'
import mongoose from 'mongoose'
import app from '../src/server.js'
import UserModel from '../src/models/userModel.js'
dotenv.config()

export const request = supertest(app)

const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'test@account.com',
  password: '12345678',
  role: 'Admin',
}
export let cookie

const createAcc = async () => {
  await UserModel.create(userData)
  const loginResponse = await request.post('/users/login').send(userData)
  cookie = loginResponse.headers['set-cookie'][0]
    .split(',')
    .map((item) => item.split(';')[0])
  cookie = cookie.join(';')
}

beforeAll((done) => {
  mongoose.connect(`${process.env.MONGODB_ADDRESS}/jtest`, {}).then(() => {
    console.log('Successfully connected to DB in jtest.')
  })
  createAcc()
  done()
})

afterAll((done) => {
  mongoose.connection.dropDatabase(() => {
    mongoose.connection.close(() => done())
  })
})

export const userRoutesTest = () => {
  it('should check that the /users/register endpoint is working', async () => {
    const response = await request
      .post('/users/register')
      .send({ ...userData, email: 'test1@account.com' })
    expect(response.status).toBe(201)
    expect(response.body.email).toBe('test1@account.com')
  })
  it('should check that the /users/profile endpoint is working', async () => {
    const response = await request.get('/users/profile').set('Cookie', cookie)
    expect(response.status).toBe(200)
    expect(response.body._id).toBeDefined()
    expect(response.body.email).toBe('test@account.com')
  })
}
