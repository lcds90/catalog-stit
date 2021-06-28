import { uuid } from 'uuidv4';

export class Product {
  public readonly id?: string;

  public name?: string;
  public department?: string;
  public material?: string;
  public price?: number;
  public tags?: string[];
  public level?: number;
  public parent?: string;

  constructor(props: Omit<Product, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
