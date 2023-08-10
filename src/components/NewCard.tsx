import { FunctionComponent, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup"
import { successMsg } from "../services/feedbacksService";
import Card from "../interfaces/Card";
import { addNewCard } from "../services/cardService";
import { SiteTheme } from "../App";

interface NewCardProps {
  onHide: Function;
  render: Function;
  userInfo: any;
}
const NewCard: FunctionComponent<NewCardProps> = ({ onHide, render, userInfo }) => {
  let theme = useContext(SiteTheme);

  let formik = useFormik({
    initialValues: {
      title: "", subtitle: "", description: "", phone: "", email: "", webSite: "", businessImgURL: "", businessImgAlt: "", country: "", state: "", city: "", street: "", houseNumber: "", zipcode: "", owner: `${userInfo.email}`, lat: 0, lng: 0
    },
    validationSchema: yup.object({
      title: yup.string().required().min(2), subtitle: yup.string().required().min(2), description: yup.string().required().min(20),
      phone: yup.string().required().min(2), email: yup.string().required().email(), webSite: yup.string().min(10), businessImgURL: yup.string().min(2), businessImgAlt: yup.string().min(2), country: yup.string().required().min(2), state: yup.string().min(2), city: yup.string().required().min(2), street: yup.string().required().min(2), houseNumber: yup.string().required().min(1), zipcode: yup.string().min(2)
    }),
    onSubmit(values: Card) {
      const geocoder = new window.google.maps.Geocoder();
      const place = `${values.country} ${values.city} ${values.street} ${values.houseNumber}`;
      geocoder.geocode({ address: place }, (results, status) => {
        if (status === "OK" && results![0]) {
          const location = results![0].geometry.location;
          const lat = (location.lat());
          const lng = (location.lng());
          addNewCard({ ...values, lat: lat, lng: lng })
            .then((res) => {
              render();
              onHide();
              successMsg("The Business card was created successfully");
            })
            .catch((err) => console.log(err));
        } else {
          console.error("Geocode was not successful for the following reason: " + status);
        }
      });
    }
  });

  return (<div className={`container ${theme}`}  >
    <form className="form-floating mb-3 mt-3" onSubmit={formik.handleSubmit}>
      <h6 className=" mt-4 ">General</h6>
      <div className="row g-2 border rounded-4 border-secondary mt-1">
        <div className="form-floating col-6 mb-3 mt-3">
          <input type="text" className="form-control border-secondary" id="floatingTitle" placeholder="Title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            onBlur={formik.handleBlur} ></input>
          <label htmlFor="floatingTitle">Business title *</label>
          {formik.touched.title && formik.errors.title && (
            <p className="text-danger">{formik.errors.title}</p>)}
        </div>
        <div className="form-floating col-6 mb-3 mt-3">
          <input type="text" className="form-control border-secondary" id="floatingSubtitle" placeholder="Subtitle"
            name="subtitle"
            onChange={formik.handleChange}
            value={formik.values.subtitle}
            onBlur={formik.handleBlur} ></input>
          <label htmlFor="floatingSubtitle">Busines subtitle *</label>
          {formik.touched.subtitle && formik.errors.subtitle && (
            <p className="text-danger">{formik.errors.subtitle}</p>)}
        </div>
        <div className="form-floating col-6 mb-3">
          <input type="text" className="form-control border-secondary"
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
          <input type="text" className="form-control border-secondary" id="floatingPhone" placeholder="Phone Number"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur} ></input>
          <label htmlFor="floatingPhone">Phone Number *</label>
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-danger">{formik.errors.phone}</p>)}
        </div>
        <div className="form-floating col-6 mb-3">
          <input type="text" className="form-control border-secondary" id="floatingEmail" placeholder="name@example.com"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur} ></input>
          <label htmlFor="floatingEmail">Business email address *</label>
          {formik.touched.email && formik.errors.email && (
            <p className="text-danger">{formik.errors.email}</p>)}
        </div>
        <div className="form-floating col-6">
          <input type="text" className="form-control border-secondary" id="floatingWebSite" placeholder="WebSite"
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
      <div className="row g-2 border rounded-4 border-secondary mt-1 ">
        <div className="form-floating col-6 mb-3 mt-3">
          <input
            type="text" className="form-control border-secondary" id="floatingBusinessImgURL" placeholder="Business Image"
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
            type="text" className="form-control border-secondary" id="floatingBusinessImgAlt" placeholder="Business Image alternative name"
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
      <div className="row g-2 border rounded-4 border-secondary mt-1">
        <div className="form-floating col-6 mb-3 mt-3">
          <input type="text" className="form-control border-secondary" id="floatingState" placeholder="State"
            name="state"
            onChange={formik.handleChange}
            value={formik.values.state}
            onBlur={formik.handleBlur} ></input>
          <label htmlFor="floatingState">State</label>
          {formik.touched.state && formik.errors.state && (
            <p className="text-danger">{formik.errors.state}</p>)}
        </div>
        <div className="form-floating col-6 mb-3 mt-3">
          <input type="text" className="form-control border-secondary" id="floatingCountry" placeholder="Country"
            name="country"
            onChange={formik.handleChange}
            value={formik.values.country}
            onBlur={formik.handleBlur} ></input>
          <label htmlFor="floatingCountry">Country *</label>
          {formik.touched.country && formik.errors.country && (
            <p className="text-danger">{formik.errors.country}</p>)}
        </div>
        <div className="form-floating col-6 mb-3">
          <input type="text" className="form-control border-secondary" id="floatingCity" placeholder="City"
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
            onBlur={formik.handleBlur} ></input>
          <label htmlFor="floatingCity">City *</label>
          {formik.touched.city && formik.errors.city && (
            <p className="text-danger">{formik.errors.city}</p>)}
        </div>
        <div className="form-floating col-6 mb-3">
          <input type="text" className="form-control border-secondary" id="floatingStreet" placeholder="Street"
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
            type="text" className="form-control border-secondary" id="floatingHouseNumber" placeholder="House Number"
            name="houseNumber"
            onChange={formik.handleChange}
            value={formik.values.houseNumber}
            onBlur={formik.handleBlur} ></input>
          <label htmlFor="floatingHouseNumber">House Number *</label>
          {formik.touched.houseNumber && formik.errors.houseNumber && (
            <p className="text-danger">{formik.errors.houseNumber}</p>)}
        </div>
        <div className="form-floating col-6 mb-3">
          <input type="text" className="form-control border-secondary" id="floatingZipCode" placeholder="Zip code"
            name="zipcode"
            onChange={formik.handleChange}
            value={formik.values.zipcode}
            onBlur={formik.handleBlur} ></input>
          <label htmlFor="floatingZipCode">Zip Code *</label>
          {formik.touched.zipcode && formik.errors.zipcode && (
            <p className="text-danger">{formik.errors.zipcode}</p>)}
        </div>
      </div>
      <button className="btn btn-secondary w-100 mt-3" type="submit">Create Card</button>
    </form>
    <div className="row">
      <div className="col-6"><button className="btn btn-danger w-100 mt-3" onClick={() => onHide()}>Cancel</button></div>
      <div className="col-6"><button className="btn btn-danger w-100 mt-3" onClick={() => formik.resetForm()}>Clear Form</button></div>
    </div>
  </div>);
}

export default NewCard;