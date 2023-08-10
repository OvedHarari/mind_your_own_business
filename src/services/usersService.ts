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
export function getUserById(userId:number){
 return axios.get(`${api}/${userId}`);
}

export function updateUser(updatedUser: User, userId: number) {
  return axios.put(`${api}/${userId}`, updatedUser);
}

export function getAllUsers(){
  return axios.get(api)
}

export function deleteUserById(userId: number) {
  return axios.delete(`${api}/${userId}`);
}

export async function activateUser(userId:number, isActive:boolean){
try {
    const response = await getUserById(userId);
    const userToUpdate = response.data; 
    const updatedUser = { ...userToUpdate, isActive };
    await updateUser(updatedUser, userId);
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}

export async function changeUserRole(userId:number, role:string){
try {
    const response = await getUserById(userId);
    const userToUpdate = response.data; 
    const updatedUser = { ...userToUpdate, role };
    await updateUser(updatedUser, userId);
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}
