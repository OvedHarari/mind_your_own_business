export default interface Card {
  id?: number;
  owner?: number | string;
  title: string;
  subtitle?: string;
  description: string;
  phone: string;
  email: string;
  webSite: string;
  businessImgURL?: string;
  businessImgAlt?: string;
  // address: {
    country: string;
    state?: string;
    city: string;
    street: string;
    houseNumber: string;
    zipcode: string;
    isFavorite: boolean;
  // };
}
