import Card from "./Card";

export default interface MyCard {
  id?: number;
  userId: number;
  products: Card[];
  active: boolean;
}
