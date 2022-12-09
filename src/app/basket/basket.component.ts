import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardItem } from '../card/card.model';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  cardTotal: number = 0;
  basket: CardItem[] = [];
  @Output() basketItemChanged = new EventEmitter<{
    productId: number;
    quantity: number;
  }>();

  constructor(private localService: LocalService) {}

  ngOnInit(): void {
    this.updateBasket();
  }

  // triggered on click on the delete icon of the card-item
  onBasketItemDeleted(productData: { productId: number }) {
    this.localService.removeBasketItem(productData.productId);
    this.updateBasket();
  }

  // triggered on click on the quantity input
  onBasketItemChanged(event: any) {
    const id = event.productId;
    const index = this.basket.findIndex((elem) => elem.id == id);

    const basketCard = this.basket[index];
    this.localService.updateBasketCard(id, {
      ...basketCard,
      quantity: basketCard.quantity++,
      total: basketCard.price * basketCard.quantity,
    });

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
