import { Injectable } from '@angular/core';
import { CardItem } from '../card/card.model';
import { ProductItem } from '../product/product.model';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  constructor() {}

  public init() {
    const products: ProductItem[] = [
      new ProductItem(
        1,
        'Laptop',
        750,
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5FpRKXeVbKWa1Wo75eOMva5FrE7QCREZgJj8iWNRZf9me2BcCRg'
      ),
      new ProductItem(
        2,
        'Tesla X',
        133000,
        'http://st.motortrend.com/uploads/sites/5/2016/03/2016-Tesla-Model-X-P90D-front-three-quarter-doors-open.jpg'
      ),
      new ProductItem(
        3,
        'Tesla S',
        102000,
        'https://media.ed.edmunds-media.com/tesla/model-s/2016/oem/2016_tesla_model-s_sedan_p90d_fq_oem_2_1280.jpg'
      ),
      new ProductItem(
        4,
        'Tesla Y',
        35000,
        'https://www.tesla.com/sites/default/files/images/blogs/models_blog_post.jpg'
      ),
    ];
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('basket', JSON.stringify([]));
  }

  public addBasketCard(cardItem: CardItem) {
    const basketString = localStorage.getItem('basket');
    const basketArray: CardItem[] = JSON.parse(basketString as string);
    basketArray.push(cardItem);
    localStorage.setItem('basket', JSON.stringify(basketArray));
  }

  public getProducts() {
    const productsArray = localStorage.getItem('products');

    return JSON.parse(productsArray as string);
  }

  public getProductByName(name: string) {
    const productsString = localStorage.getItem('products');
    const productsArray: ProductItem[] = JSON.parse(productsString as string);
    const item = productsArray.find((elem) => elem.name == name);

    return item;
  }

  public getBasket() {
    const basketArray = localStorage.getItem('basket');

    return JSON.parse(basketArray as string);
  }

  public getBasketCard(id: number) {
    const basketString = localStorage.getItem('basket');
    const basketArray: any[] = JSON.parse(basketString as string);
    const item = basketArray.find((elem) => elem.id == id);

    return item;
  }

  public updateBasketCard(id: number, data: CardItem) {
    const basketString = localStorage.getItem('basket');
    const basketArray: any[] = JSON.parse(basketString as string);
    const index = basketArray.findIndex((elem) => elem.id == id);

    basketArray[index] = data;
    localStorage.setItem('basket', JSON.stringify(basketArray));
  }

  public removeBasketItem(id: number) {
    const basketString = localStorage.getItem('basket');
    const basketArray: any[] = JSON.parse(basketString as string);

    const index = basketArray.findIndex((elem) => elem.id == id);
    basketArray.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basketArray));
  }

  public clearData() {
    localStorage.clear();
  }
}
