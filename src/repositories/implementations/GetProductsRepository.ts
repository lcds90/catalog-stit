import { Product } from "../../entities/Product";
import { promisify } from "util";
import { join } from 'path';
import { promises, createReadStream } from "fs";
import { pipeline, Transform } from "stream";
import { IProductsRepository } from "../IProductsRepository";
import dirname from 'es-dirname'
import debug from 'debug'

const { readdir } = promises
const log = debug('app:concat');
const pipelineAsync = promisify(pipeline);
const readline = require("readline");

export class GetProductsRepository implements IProductsRepository {
    private products: Product[];

    async findProducts(organizationName: string): Promise<any> {
        let products = [];
        let totalProducts = 0;
        const filesDir = `${dirname()}/fixtures/`
        const files = (await readdir(filesDir))
            .filter(item => !(!!~item.indexOf('.json')))
        const streamFile = createReadStream(join(filesDir, files[0]));

        const rl = await readline.createInterface({
            input: streamFile
        });

        for await (const line of rl) {
            let filteredProduct = JSON.parse(line);
            if (filteredProduct.department.toLowerCase() == organizationName.toLowerCase()) {
                products.push(filteredProduct)
                totalProducts += 1;
            }
          }
          

        /* await rl.on('line', async (line) => {
            let filteredProduct = JSON.parse(line);
            if (filteredProduct.department.toLowerCase() == organizationName) {
                products.push(filteredProduct)
                totalProducts += 1;
            }
        });

        await rl.on('close', (line) => {
            console.log({
                total: totalProducts,
                products
            })
        }); */
        
        return { total: totalProducts, products }
    }

}