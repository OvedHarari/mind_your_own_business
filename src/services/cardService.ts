import axios from "axios";
import Card from "../interfaces/Card";

let api: string = `${process.env.REACT_APP_API}/cards`;

export function getCards() {
  return axios.get(api);
}

export function getCardById(id: number) {
  return axios.get(`${api}/${id}`);
}

export function getCardsByOwner(owner: string) {
  return axios.get(`${api}?owner=${owner}`);
}

export function addNewCard(newCard: Card) {
  return axios.post(api, newCard);
}

export function updateCard(updatedCard: Card, id: number) {
  return axios.put(`${api}/${id}`, updatedCard);
}

export function deleteCard(id: number) {
  return axios.delete(`${api}/${id}`);
}
