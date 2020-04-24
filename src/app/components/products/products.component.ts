import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products = []
  editingProduct: Product
  editing: boolean = false
  constructor(public productServivce: ProductService) { }

  ngOnInit(): void {
    this.productServivce.getProducts().subscribe((products) => {
      this.products = products
    })
  }

  deleteProducts(event, product) {
    if (confirm('¿Estas seguro que deseas borrarlo?')) {
      this.productServivce.deleteProducts(product)
    }
  }
  editProducts(event, product) {
    this.editingProduct = product
    this.editing = !this.editing
  }

  updateProduct() {
    this.productServivce.updateProduct(this.editingProduct)
    this.editingProduct = {} as Product
    this.editing = false
  }
}
