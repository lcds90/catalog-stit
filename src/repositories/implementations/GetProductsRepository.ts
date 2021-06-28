import { join } from 'path';
import { promises, createReadStream } from 'fs';

import dirname from 'es-dirname'; // NOTE pode-se utilizar import.meta, porém não consegui configurar
const { readdir } = promises;
const readline = require('readline');

import { Product } from '@entities/Product';
import { IProductsRepository } from '@repositories/IProductsRepository';

export class GetProductsRepository implements IProductsRepository {
    /* async validateRoleAndVerifyProduct(
    organizationName: string,
    role: string,
    products: Product[]
  ): Promise<Product[]> | undefined {
    for(const product of products){
      product.name
    }
  } */

  async generateSubCategory(
    queries: string[],
    products: Product[],
    level: number,
    parent: string,
    letter: string
  ): Promise<any[]> {
    const filteredItems = await products.filter((product) => {
      return queries.includes(product.department);
    });

    filteredItems.unshift({
      name: `${parent}`,
      level: 1,
      parent: `${letter}`,
    });

    return filteredItems;
  }

  async generateListOrganization(products: Product[]) {
    const parentStuff_A01 = await this.generateSubCategory(
      ['Books', 'Movies', 'Music'],
      products,
      2,
      'STUFF A01',
      'STUFF A'
    );
    const parentStuff_A02 = await this.generateSubCategory(
      ['Games', 'Electronics', 'Computers'],
      products,
      2,
      'STUFF A02',
      'STUFF A'
    );
    const parentStuff_A03 = await this.generateSubCategory(
      ['Home', 'Garden', 'Tools', 'Clothing'],
      products,
      2,
      'STUFF A03',
      'STUFF A'
    );
    const parentStuff_B01 = await this.generateSubCategory(
      ['Grocery', 'Health'],
      products,
      2,
      'STUFF B01',
      'STUFF B'
    );
    const parentStuff_B02 = await this.generateSubCategory(
      ['Beauty', 'Toys'],
      products,
      2,
      'STUFF B02',
      'STUFF B'
    );
    const parentStuff_B03 = await this.generateSubCategory(
      ['Kids'],
      products,
      2,
      'STUFF B03',
      'STUFF B'
    );
    const parentStuff_C01 = await this.generateSubCategory(
      ['Baby', 'Shoes'],
      products,
      2,
      'STUFF C01',
      'STUFF C'
    );
    const parentStuff_C02 = await this.generateSubCategory(
      ['Jewelery', 'Sports', 'Outdoors'],
      products,
      2,
      'STUFF C02',
      'STUFF C'
    );
    const parentStuff_C03 = await this.generateSubCategory(
      ['Automotive', 'Industrial'],
      products,
      2,
      'STUFF C03',
      'STUFF C'
    );

    const stuffA = await [].concat(
      ...parentStuff_A01,
      ...parentStuff_A02,
      ...parentStuff_A03
    );
    const stuffB = await [].concat(
      ...parentStuff_B01,
      ...parentStuff_B02,
      ...parentStuff_B03
    );
    const stuffC = await [].concat(
      ...parentStuff_C01,
      ...parentStuff_C02,
      ...parentStuff_C03
    );

    stuffA.unshift({
      name: 'STUFF A',
      level: 0,
    });
    stuffB.unshift({
      name: 'STUFF B',
      level: 0,
    });
    stuffC.unshift({
      name: 'STUFF C',
      level: 0,
    });

    return [].concat(...stuffA, ...stuffB, ...stuffC);
  }

  async findProducts(
    organizationName: string,
    user_tags: string[],
    roles: string[]
  ): Promise<Product[]> {
    const products: Product[] = [];
    const filesDir = `${dirname()}/fixtures/`;
    const role = roles[0];
    const files = (await readdir(filesDir)).filter(
      (item) => !!!~item.indexOf('.json')
    );

    const streamFile = createReadStream(join(filesDir, files[0]));

    const rl = await readline.createInterface({
      input: streamFile,
    });

    for await (const line of rl) {
      let filteredProduct = JSON.parse(line);
      if (
        filteredProduct.department.toLowerCase() ==
        organizationName.toLowerCase()
      ) {

        if (user_tags.length > 0) {
          filteredProduct.tags.filter((tag) => {
            user_tags.filter((user_tag) => {
              if ( tag.toLowerCase() === user_tag.toLowerCase() ) {
                products.push(filteredProduct);
              }
            });
          });
        } else {
          products.push(filteredProduct);
        }
      }
    }
    if(products.length > 0){
      const list = await this.generateListOrganization(products);
      return list;
    }
    // const isValid = await this.validateRoleAndVerifyProduct(organizationName, role, list);
    return undefined;
  }
}
