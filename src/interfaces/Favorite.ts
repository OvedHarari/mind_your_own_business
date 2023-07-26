import Card from "./Card";

export default interface Favorite {
  id?: number;
  userId: number;
  cards: Card[];
}
