import { join } from 'path'
import { promises, createReadStream } from 'fs'

import dirname from 'es-dirname' // NOTE pode-se utilizar import.meta, porém não consegui configurar
const { readdir } = promises
const readline = require('readline')

// import { pipeline } from 'stream'
// import { promisify } from 'util'
// const pipelineAsync = promisify(pipeline)

import { Product } from '@entities/Product'
import { IProductsRepository } from '@repositories/IProductsRepository'

export class GetProductsRepository implements IProductsRepository {
  async findProducts(
    organizationName: string,
    user_tags: string[]
  ): Promise<Product[]> {
    const products: Product[] = []
    const filesDir = `${dirname()}/fixtures/`

    const files = (await readdir(filesDir)).filter(
      (item) => !!!~item.indexOf('.json')
    )

    const streamFile = createReadStream(join(filesDir, files[0]))

    const rl = await readline.createInterface({
      input: streamFile,
    })

    for await (const line of rl) {
      let filteredProduct = JSON.parse(line)
       if (
        filteredProduct.department.toLowerCase() ==
        organizationName.toLowerCase()
      ) {

        if(user_tags.length !== 0){
          filteredProduct.tags.filter(tag => {
            user_tags.filter(user_tag => {
              if (tag.toLowerCase().includes(user_tag.toLowerCase())) products.push(filteredProduct);
            })
          });
        }

        products.push(filteredProduct)

      }
    }

    return products
  }
}
