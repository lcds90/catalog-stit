import { Router } from 'express'
import { authUserController } from '@useCases/AuthUser'
import { getProductsController } from '@useCases/GetProducts'

const router = Router()

router.get('/', (request, response) => {
  response.json({
    intro: 'Projeto de lista de catalogo de itens para empresa ST IT Cloud. Links para acessar:',
    products: 'GET - https://api-catalog-list.herokuapp.com/products/:organizationName?tags=<tag><tag>',
    login: 'POST - https://api-catalog-list.herokuapp.com/login'
  })
})

router.post('/login', (request, response) => {
  return authUserController.handle(request, response)
})

/* router.get('/products/:organizationName', authUserController.verify, (request, response) => {
  return getProductsController.handle(request, response)
}) */

router.get('/products/:organizationName', (request, response) => {
  return getProductsController.handle(request, response)
})

export { router }
