import axios from "axios";
import Card from "../interfaces/Card";


let api: string = `${process.env.REACT_APP_API}/favorites`;

// create favorits object (to be used upon registration of new user)
export function createFavoritsById(userId: number){
    return axios.post(api, {userId, cards:[]});
}

export function deleteFavoritsById(userId: number) {
  return axios.delete(`${api}/${userId}`);
}

// get all user's favorits cards
export function getFavorites(userId: number){
    return axios.get(`${api}?userId=${userId}`)
}

// add to user's favorits 
export async function addToFavorites(userId: number, cardToAdd: Card) {
  try {
    // 1. get user's favorits object
    let res = await getFavorites(userId);
    // 2. add the favorit card to favorits array
    res.data[0].cards.push({ ...cardToAdd});
    // 3. update the favorits object 
    return axios.patch(`${api}/${res.data[0].userId}`, {
      cards: res.data[0].cards,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function removeFromFavorites(userId: number, cardId: number) {
  try {
    let res = await getFavorites(userId);
    res.data[0].cards = res.data[0].cards.filter((card: Card) => card.id !== cardId);
    return axios.patch(`${api}/${res.data[0].id}`, {
      cards: res.data[0].cards,
    });
  } catch (error) {
    console.log(error);
  }
}
