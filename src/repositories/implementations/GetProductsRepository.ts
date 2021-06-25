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

    async findProducts(organization: string): Promise<any> {
        console.time('read-data');
        const filesDir = `${dirname()}/fixtures/`
        const files = (await readdir(filesDir))
        .filter(item => !(!!~item.indexOf('.json')))
        console.log(files);
        const ONE_SECOND = 1000;
        // quando os outros processos acabar, o carregamento acaba junto
        const streamFile = createReadStream(join(filesDir, files[0]));
        
        let rl = readline.createInterface({
            input: streamFile
        });
        let totalProducts = 0;
        // event is emitted after each line
        rl.on('line', (line) => {
            let filter = JSON.parse(line);
            totalProducts++;
            console.log(filter.department);
        });
        
        // end
        rl.on('close', (line) => {
            console.log('Total lines : ' + totalProducts);
        });

        console.timeEnd('read-data');
    }

}