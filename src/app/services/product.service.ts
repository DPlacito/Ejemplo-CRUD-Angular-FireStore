import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
//Importando el modelo Product
import { Product } from '../models/product'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsCollection: AngularFirestoreCollection<Product>
  products: Observable<Product[]>
  productDoc: AngularFirestoreDocument<Product>

  constructor(public db: AngularFirestore) {
    //  this.products = this.db.collection('products').valueChanges()
    this.productsCollection = this.db.collection('products')   // invocas la colleccion
    this.products = this.productsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id
        return data
      });
    }))   //Trae actualizacion de los datos cuando cambian
  }

  getProducts() {
    return this.products
  }

  addProduct(product: Product) {
    this.productsCollection.add(product)
  }

  deleteProducts(product: Product) {
    this.productDoc = this.db.doc(`products/${product.id}`)
    this.productDoc.delete()
  }

  updateProduct(product: Product) {
    this.productDoc = this.db.doc(`products/${product.id}`)
    this.productDoc.update(product)
  }
}
