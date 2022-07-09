import { userRoutesTest } from './user.js'
import { productRoutesTest } from './product.js'
import { orderRoutesTest } from './order.js'

describe('Checking user main endpoints', userRoutesTest)
describe('Checking product main endpoints', productRoutesTest)
describe('Checking order main endpoints', orderRoutesTest)
