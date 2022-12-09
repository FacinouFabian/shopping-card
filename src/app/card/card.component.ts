import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CardItem } from './card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  total: number = 0;
  @Input() basketTotal: number;
  @Input() cardItems: CardItem[];
  @Output() cardItemDeleted = new EventEmitter<{
    productId: number;
  }>();
  @Output() basketItemChanged = new EventEmitter<{
    productId: number;
    quantity: number;
  }>();

  // triggered on click on the delete icon of the card-item
  onBasketItemDeleted(productData: { productId: number }) {
    this.cardItemDeleted.emit({
      productId: productData.productId,
    });
  }

  // triggered on click on the quantity input
  onBasketItemChanged(productData: { productId: number; quantity: number }) {
    this.basketItemChanged.emit({
      productId: productData.productId,
      quantity: productData.quantity,
    });
  }

  constructor() {
    this.basketTotal = 0;
    this.cardItems = [];
  }

  ngOnInit() {}
}
