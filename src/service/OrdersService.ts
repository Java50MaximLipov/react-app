import { Observable } from "rxjs";
import { ShoppingProductType } from "../model/ShoppingProductType";

export default interface OrdersService {
  addShoppingProduct(
    collectionName: string,
    id: string,
    shoppingProducts: ShoppingProductType
  ): Promise<void>;
  addShoppingProductUnit(collectionName: string, id: string): Promise<void>;
  removeShoppingProduct(collectionName: string, id: string): Promise<void>;
  removeShoppingProductUnit(collectionName: string, id: string): Promise<void>;
  getShoppingCart(collectionName: string): Observable<ShoppingProductType[]>;
}
