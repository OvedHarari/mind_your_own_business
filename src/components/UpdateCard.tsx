import { FunctionComponent, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup"
import { successMsg } from "../services/feedbacksService";
import Card from "../interfaces/Card";
import {  getCardById, updateCard } from "../services/cardService";


interface UpdateCardProps {
    onHide:Function;
    render:Function; 
    userInfo:any;
    cardId:number;
    cardTitle:string;
    

    }
 
const UpdateCard: FunctionComponent<UpdateCardProps> = ({onHide,render,userInfo, cardId,cardTitle}) => {
  let [card,setCard] = useState<Card>(
    {
  // id: 0,
  // owner: "",
  title: "",
  subtitle: "",
  description: "",
  phone: "",
  email: "",
  webSite: "",
  businessImgURL: "",
  businessImgAlt: "",
  // address: {
    country: "",
    state: "",
    city: "",
    street: "",
    houseNumber: "",
    zipcode: "",
    isFavorite: false,
  // };
}
    
  )
    let formik = useFormik({
    initialValues: {title: card.title,subtitle: card.subtitle,description: card.description,phone: card.phone,email: card.email,webSite: card.webSite,businessImgURL: card.businessImgURL,businessImgAlt: card.businessImgAlt,
      // address: {
      country: card.country,state: card.state,city: card.city,street: card.street,houseNumber: card.houseNumber,zipcode: card.zipcode, owner:`${userInfo.email}`,isFavorite:false
           // },
          },
    validationSchema: yup.object({title: yup.string().required().min(2),subtitle: yup.string().required().min(2),description: yup.string().required().min(20),
      phone: yup.string().required().min(2),email: yup.string().required().email(),webSite: yup.string().min(10),businessImgURL: yup.string().min(2),businessImgAlt: yup.string().min(2),     
       // address: yup.object({
      country: yup.string().required().min(2),state: yup.string().min(2),city: yup.string().required().min(2),street: yup.string().required().min(2),
      houseNumber: yup.string().required().min(2),zipcode: yup.string().min(2),
            // }),
          }),
          enableReinitialize: true,
    onSubmit(values: Card) {
      updateCard(values,cardId)
        .then((res) => {
          render();
          onHide();
          successMsg(`${cardTitle} Business card was updated successfully`);        
    }).catch((err) => console.log(err));  },  });

    useEffect(() => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          getCardById(cardId).then((res)=> setCard(res.data)).catch((err)=> console.log(err))}, []);
        
        
    return (     <div className="container" >
      <form className="form-floating mb-3 mt-3" onSubmit={formik.handleSubmit}>
        {/* <p className="display-3">Sign Up !</p> */}

        <h6 className=" mt-4 ">General</h6>
        <div className="row border rounded-4">
          <div className="form-floating col-6 mb-3 mt-3">
            <input type="text" className="form-control" id="floatingTitle" placeholder="John Doe"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              onBlur={formik.handleBlur} ></input>
            <label htmlFor="floatingTitle">Business title *</label>
            {formik.touched.title && formik.errors.title && (
              <p className="text-danger">{formik.errors.title}</p>)}
          </div>
          <div className="form-floating col-6 mb-3 mt-3">
            <input type="text" className="form-control" id="floatingSubtitle" placeholder="John Doe"
              name="subtitle"
              onChange={formik.handleChange}
              value={formik.values.subtitle}
              onBlur={formik.handleBlur} ></input>
            <label htmlFor="floatingSubtitle">Busines subtitle *</label>
            {formik.touched.subtitle && formik.errors.subtitle && (
              <p className="text-danger">{formik.errors.subtitle}</p>)}
          </div>
          <div className="form-floating col-6 mb-3">
            <input type="text" className="form-control"
              id="floatingDescription"
              placeholder="John Doe"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              onBlur={formik.handleBlur} ></input>
            <label htmlFor="floatingDescription">Business (short) description *</label>
            {formik.touched.description && formik.errors.description && (
              <p className="text-danger">{formik.errors.description}</p>)}
          </div>
          <div className="form-floating col-6 mb-3">
            <input type="text" className="form-control" id="floatingPhone" placeholder="Phone"
              name="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur} ></input>
            <label htmlFor="floatingPhone">Phone Number *</label>
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-danger">{formik.errors.phone}</p>)}
          </div>
          <div className="form-floating col-6 mb-3">
            <input type="text" className="form-control" id="floatingEmail" placeholder="name@example.com"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur} ></input>
            <label htmlFor="floatingEmail">Business email address *</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>)}
          </div>
          <div className="form-floating col-6">
            <input type="text" className="form-control" id="floatingWebSite" placeholder="WebSite"
              name="webSite"
              onChange={formik.handleChange}
              value={formik.values.webSite}
              onBlur={formik.handleBlur} ></input>
            <label htmlFor="floatingWebSite">Website *</label>
            {formik.touched.webSite && formik.errors.webSite && (
              <p className="text-danger">{formik.errors.webSite}</p>)}
          </div>
        </div>
        <h6 className="mt-4">Image</h6>
        <div className="row border rounded-4">
          <div className="form-floating col-6 mb-3 mt-3">
            <input
              type="text" className="form-control" id="floatingBusinessImgURL" placeholder="Business Image"
              name="businessImgURL"
              onChange={formik.handleChange}
              value={formik.values.businessImgURL}
              onBlur={formik.handleBlur} ></input>
            <label htmlFor="floatingBusinessImgURL">Business Image URL</label>
            {formik.touched.businessImgURL && formik.errors.businessImgURL && (
              <p className="text-danger">{formik.errors.businessImgURL}</p>)}
          </div>
                  
          <div className="form-floating col-6 mb-3 mt-3">
            <input
              type="text" className="form-control" id="floatingBusinessImgAlt" placeholder="Business Image alternative name"
              name="businessImgAlt"
              onChange={formik.handleChange}
              value={formik.values.businessImgAlt}
              onBlur={formik.handleBlur} ></input>
            <label htmlFor="floatingBusinessImgAlt">Image alternative name</label>
            {formik.touched.businessImgAlt && formik.errors.businessImgAlt && (
              <p className="text-danger">{formik.errors.businessImgAlt}</p>)}
          </div>
        
        </div>

        <h6 className="mt-4">Address</h6>
        <div className="row border rounded-4">
          <div className="form-floating col-6 mb-3 mt-3">
            <input type="text" className="form-control" id="floatingState" placeholder="John Doe"
              name="state"
              onChange={formik.handleChange}
              value={formik.values.state}
              onBlur={formik.handleBlur} ></input>
            <label htmlFor="floatingState">State</label>
            {formik.touched.state && formik.errors.state && (
              <p className="text-danger">{formik.errors.state}</p>)}
            {/* {yup.getIn(formik.touched.address, state) &&
              formik.errors.address?.state && (
                <p className="text-danger">{formik.errors.address?.state}</p>)} */}
          </div>
          <div className="form-floating col-6 mb-3 mt-3">
            <input type="text" className="form-control" id="floatingCountry" placeholder="John Doe"
              name="country"
              onChange={formik.handleChange}
              value={formik.values.country}
              onBlur={formik.handleBlur} ></input>
            <label htmlFor="floatingCountry">Country *</label>
            {formik.touched.country && formik.errors.country && (
              <p className="text-danger">{formik.errors.country}</p>)}
          </div>
          <div className="form-floating col-6 mb-3">
            <input type="text" className="form-control" id="floatingCity" placeholder="John Doe"
              name="city"
              onChange={formik.handleChange}
              value={formik.values.city}
              onBlur={formik.handleBlur} ></input>
            <label htmlFor="floatingCity">City *</label>
            {formik.touched.city && formik.errors.city && (
              <p className="text-danger">{formik.errors.city}</p>)}
          </div>
          <div className="form-floating col-6 mb-3">
            <input type="text" className="form-control" id="floatingStreet" placeholder="John Doe"
              name="street"
              onChange={formik.handleChange}
              value={formik.values.street}
              onBlur={formik.handleBlur} ></input>
            <label htmlFor="floatingStreet">Street *</label>
            {formik.touched.street && formik.errors.street && (
              <p className="text-danger">{formik.errors.street}</p>)}
          </div>
          <div className="form-floating col-6 mb-3">
            <input
              type="text" className="form-control" id="floatingHouseNumber" placeholder="John Doe"
              name="houseNumber"
              onChange={formik.handleChange}
              value={formik.values.houseNumber}
              onBlur={formik.handleBlur} ></input>
            <label htmlFor="floatingHouseNumber">House Number *</label>
            {formik.touched.houseNumber && formik.errors.houseNumber && (
              <p className="text-danger">{formik.errors.houseNumber}</p>)}
          </div>
          <div className="form-floating col-6 mb-3">
            <input type="text" className="form-control" id="floatingZipCode" placeholder="John Doe"
              name="zipcode"
              onChange={formik.handleChange}
              value={formik.values.zipcode}
              onBlur={formik.handleBlur} ></input>
            <label htmlFor="floatingZipCode">Zip Code *</label>
            {formik.touched.zipcode && formik.errors.zipcode && (
              <p className="text-danger">{formik.errors.zipcode}</p>)}
          </div>
        </div>
         <div className="row">
        <button className="btn btn-secondary col-md-5 mx-4 mt-3" onClick={()=> onHide()}>Cancel</button>
        <button className="btn btn-secondary col-md-5 mt-3" onClick={()=> formik.resetForm()}>Clear Form</button>
        </div>

        <button className="btn btn-secondary w-100 mt-3" type="submit">Create Card</button>
        
              </form>
    </div> );
}
 
export default UpdateCard;