import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CardItem } from '../card.model';

@Component({
  selector: 'app-carditem',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css'],
})
export class CardItemComponent implements OnInit {
  @Input() cardItem: CardItem;
  @Output() cardItemDeleted = new EventEmitter<{
    productId: number;
  }>();
  @Output() basketItemChanged = new EventEmitter<{
    productId: number;
    quantity: number;
  }>();

  // triggered on click on the delete icon of the card-item
  onBasketItemDeleted(event: any) {
    const id = event.target.getAttribute('id');
    this.cardItemDeleted.emit({
      productId: id,
    });
  }

  // triggered on click on the quantity input
  onBasketItemChanged(event: any) {
    const id = event.target.getAttribute('id');
    this.cardItem.quantity = event.target.value;
    this.basketItemChanged.emit({
      productId: id,
      quantity: event.target.value,
    });
  }

  constructor() {
    this.cardItem = new CardItem(0, '', 0, 0);
  }

  ngOnInit() {}
}
