import { uuid } from "uuidv4";

export class Product {
    public readonly id: string;

    public email: string;
    public password: string;
    public roles: Array<string>;

    constructor(props: Omit<Product, 'id'>, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuid();
        }
    }
}