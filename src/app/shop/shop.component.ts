import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardItem } from '../card/card.model';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  cardTotal: number = 0;
  basket: CardItem[] = [];
  title: string = 'Lot of surprises are waiting for you';
  titleStyle: string = 'title-default';
  @Output() basketItemChanged = new EventEmitter<{
    productId: number;
    quantity: number;
  }>();

  constructor(private localService: LocalService) {}

  ngOnInit() {
    this.localService.init();
  }

  onProductMouseEnter(title: any) {
    this.title = title;
    this.titleStyle = 'title-product';
  }

  onProductMouseLeave() {
    this.title = 'Lot of surprises are waiting for you';
    this.titleStyle = 'title-default';
  }

  // triggered when the basket data changes
  onBasketUpdated(productData: {
    productId: number;
    productName: string;
    productPrice: number;
  }) {
    const index = this.basket.findIndex(
      (elem) => elem.id == productData.productId
    );
    if (index === -1) {
      this.localService.addBasketCard({
        id: productData.productId,
        name: productData.productName,
        quantity: 1,
        price: productData.productPrice,
        total: productData.productPrice * 1,
      });
    } else {
      const basketCard = this.basket[index];
      // update the card-item component on the website
      this.basketItemChanged.emit({
        productId: productData.productId,
        quantity: basketCard.quantity++,
      });
      // update cards array in local storage
      this.localService.updateBasketCard(basketCard.id, {
        ...basketCard,
        quantity: basketCard.quantity++,
        total: basketCard.price * basketCard.quantity,
      });
    }
    this.updateBasket();
  }

  updateBasket() {
    //the code to update the total property of the card
    let total = 0;
    this.basket = this.localService.getBasket();
    this.basket.map((elem) => {
      total = total + elem.quantity * elem.price;
    });
    this.cardTotal = total;
  }
}
