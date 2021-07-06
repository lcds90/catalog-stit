import { join } from 'path';
import { promises, createReadStream } from 'fs';

import dirname from 'es-dirname'; // NOTE pode-se utilizar import.meta, porém não consegui configurar
const { readdir } = promises;
const readline = require('readline');

import { Product } from '@entities/Product';
import { IProductsRepository } from '@repositories/IProductsRepository';

// SECTION Get - Produtos e Ordenação
export class GetProductsRepository implements IProductsRepository {
  async checkLevelStuff(product: Product, role: string) {
    // NOTE senior - level 0, 1 e 2, acesso a todos niveis
    if (role === 'senior') return product;
    
    // NOTE middle - level 1 e 2
    if (role === 'middle'){

    }
    // junior - level 2
    // intern - level 0, 1 e 2, porém somente sob a organization STUFF A
  }

  async generateListOrganization(products: Product[], role: string) {
    // const isRoleValidWithProductsList = products.map((product) =>
      // this.checkLevelStuff(product, role)
    // );
    // if (isRoleValidWithProductsList) return products;
    return products;
  }

  async findProducts(
    organizationName: string,
    user_tags: string[],
    roles: string[]
  ): Promise<Product[]> {
    const filesDir = `${dirname()}/fixtures/`;
    // const role = roles[0];

    const streamFile = createReadStream(join(filesDir, 'products.txt'));

    // NOTE Criando interface com a biblioteca readline para percorrer linha de linha do arquivo products.txt
    const rl = await readline.createInterface({
      input: streamFile,
    });
    const products: Product[] = [];

    for await (const line of rl) {
      // NOTE Filtrando linha percorrida do arquivo e transformando em um objeto
      let filteredProduct = JSON.parse(line);

      // NOTE Verificando organização
      if (
        filteredProduct.department.toLowerCase() ==
        organizationName.toLowerCase()
      ) {
        // NOTE Verificando a existência de tags, pois a cada uma que percorrer e a combinação estar correta será acrescentado ao Array products
        if (user_tags !== undefined) {

          // NOTE Para cada tag do produto verificando com as quais os usuario solicitou
          for (const tag of filteredProduct.tags) {
            for ( const userTag of user_tags) {
              if (userTag.toLowerCase() === tag.toLowerCase())
                products.push(filteredProduct);
            };
          }
        } else {
          // NOTE Caso não tenha tags, irá realizar o filtro com somente os itens da categoria
          products.push(filteredProduct);
        }
      }
    }
    // NOTE Caso tenha sucesso no retorno de produtos retorna a lista com a verificação de cada item com o cargo atual do usuário
    if (products.length > 0) {
      // const list = await this.generateListOrganization(products, role);
      return products;
    }

    // NOTE Retorno para acionamento de erro do useCase, caso nenhum parametro correspondeu a busca
    return undefined;
  }
}
