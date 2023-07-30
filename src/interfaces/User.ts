export default interface User {
  id?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phone?: string;
  email: string;
  password: string;
  userImgURL?: string;
  gender?: string;
  role?: string;
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  houseNumber?: string;
  zipcode?: string;
  isActive?: boolean;
}
