import { Router } from 'express';
import { authUserController } from '@useCases/AuthUser';
import { getProductsController } from '@useCases/GetProducts';
const router = Router();

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Lista de Catalogos',
      description: 'API realizada para o processo seletivo na ST IT Cloud.',
      contact: {
        name: 'Leonardo Conceição dos Santos',
      },
      servers: [
        {
          url: 'https://api-catalog-list.herokuapp.com/',
          description: 'Production server',
        },
        {
          url: '"http://localhost:5000"',
          description: 'Development server',
        },
      ],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/index.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
router.use('/docs', swaggerUI.serve);
router.get('/docs', swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 *
 * definitions:
 *    User:
 *      type: object
 *      in: body
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          description: User's email
 *        password:
 *          type: string
 *          description: User's password
 *
 */

/**
 * @swagger
 * /:
 *  get:
 *    description: 'Reference to the home page with routes provided by the application.'
 *    responses:
 *      '200':
 *        description: 'Returns an object containing the keys in response: intro, docs, login and products.'
 */
router.get('/', (request, response) => {
  response.json({
    intro: 'Projeto de lista de catalogo de itens para empresa ST IT Cloud',
    docs: 'Documentação da API e testes de rotas - https://api-catalog-list.herokuapp.com/docs',
    products:
      'GET - https://api-catalog-list.herokuapp.com/products/:organizationName?tags=<tag><tag>',
    login: 'POST - https://api-catalog-list.herokuapp.com/login',
  });
});
/**
 * @swagger
 * /login:
 *  post:
 *     summary: 'Authentication route to access products.'
 *     description: Login to the application
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User's credentials
 *         schema:
 *           type: object
 *         properties:
 *          email:
 *            type: string
 *            description: User's email
 *          password:
 *            type: string
 *            description: User's password
 *         example:
 *            email: junior.salesrep@stit.talent
 *            password: ymWK5FHn27gjd9clZTR8QfZWOIBQTh1m
 *     responses:
 *       200:
 *         description: login
 *         schema:
 *           type: object
 */
router.post('/login', (request, response) => {
  return authUserController.handle(request, response);
});

/**
 * @swagger
 * /products/{organizationName}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    description: 'Return all elements that match with organization name.'
 *    summary: 'Return all products with specified organization name'
 *    parameters:
 *      - in: path
 *        name: organizationName
 *        required: true
 *        schema:
 *          type: string
 *        description: 'Organization to filter'
 *      - in: header
 *        name: authorization
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: 'Returns an object containing the keys in response: intro, docs, login and products.'
 */
router.get(
  '/products/:organizationName',
  authUserController.verify,
  (request, response) => {
    return getProductsController.handle(request, response);
  }
);

export { router };
