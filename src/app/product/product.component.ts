import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductItem } from './product.model';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: ProductItem[] = [];

  @Output() cardUpdated = new EventEmitter<{
    productId: number;
    productName: string;
    productPrice: number;
  }>();

  @Output() productHover = new EventEmitter();

  constructor(private localService: LocalService) {}

  ngOnInit() {
    this.products = this.localService.getProducts();
  }

  // triggered when the basket data changes
  onCardUpdated(event: any) {
    const id = event.target.getAttribute('id');
    const index = this.products.findIndex((elem) => elem.id == id);

    this.cardUpdated.emit({
      productId: this.products[index].id,
      productName: this.products[index].name,
      productPrice: this.products[index].price,
    });
  }

  onProductHover() {
    this.productHover.emit();
  }
}
