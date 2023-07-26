import axios from "axios";
import User from "../interfaces/User";

let api: string = `${process.env.REACT_APP_API}/users`;

export function userValidation(userTocheck: User) {
  return axios.get(
    `${api}?email=${userTocheck.email}&password=${userTocheck.password}`
  );
}

export function addUser(newUser: User) {
  return axios.post(api, newUser);
}

export function getUserByEmail(userEmail: string) {
  return axios.get(`${api}?email=${userEmail}`);
}

export function updateUser(updatedUser: User, id: number) {
  return axios.put(`${api}/${id}`, updatedUser);
}