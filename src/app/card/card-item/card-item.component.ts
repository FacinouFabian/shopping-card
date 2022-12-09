import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { CardItem } from '../card.model';

@Component({
  selector: 'app-carditem',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css'],
})
export class CardItemComponent implements OnInit {
  imageUrl: string = '';
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

  constructor(private localService: LocalService) {
    this.cardItem = new CardItem(0, '', 0, 0);
  }

  getImageUrl() {
    const item = this.localService.getProductByName(this.cardItem.name);
    if (item) {
      this.imageUrl = item.imageUrl;
    }
  }

  ngOnInit() {
    this.getImageUrl();
  }
}
