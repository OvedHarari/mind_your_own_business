import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addUser } from "../services/usersService";
import { successMsg } from "../services/feedbacksService";
import User from "../interfaces/User";
import { createFavoritsById } from "../services/favoritsService";

interface SignUpProps {
  setUserInfo: Function;
}
const SignUp: FunctionComponent<SignUpProps> = ({ setUserInfo }) => {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {firstName: "",middleName: "",lastName: "",phone: "",email: "",password: "",gender: "",userImgURL: "/public/user_male.webp",
      // address: {
      country: "",state: "",city: "",street: "",houseNumber: "",zipcode: "", 
           // },
      role: "user",},
    validationSchema: yup.object({firstName: yup.string().required().min(2),middleName: yup.string().min(2),lastName: yup.string().required().min(2),
      phone: yup.string().required().min(2),email: yup.string().required().email(),password: yup.string().required().min(8),gender: yup.string().required(),userImgURL: yup.string().min(2),     
       // address: yup.object({
      country: yup.string().required().min(2),state: yup.string().min(2),city: yup.string().required().min(2),street: yup.string().required().min(2),
      houseNumber: yup.string().required().min(2),zipcode: yup.string().min(2),
            // }),
      role: yup.string().min(2),    }),
    onSubmit(values: User) {
      addUser(values)
        .then((res) => {
          navigate("/");
          sessionStorage.setItem("userInfo",JSON.stringify({email: res.data.email,userId: res.data.id,role: res.data.role}));
          setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string));
          createFavoritsById(res.data.id)
          successMsg(`${values.email} was registered and logged in`);        })
        .catch((err) => console.log(err));  },  });
  return (
    <div className="container  mt-5">
      <form className="form-floating mb-3 mt-3" onSubmit={formik.handleSubmit}>
        <p className="display-3">Sign Up !</p>
        <h6 className=" mt-4 ">General</h6>
        <div className="row border rounded-4">
          <div className="form-floating col-6 mb-3 mt-3">
            <input type="text" className="form-control" id="floatingFirstName" placeholder="John Doe"
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              onBlur={formik.handleBlur} ></input>
            <label htmlFor="floatingFirstName">First Name *</label>
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-danger">{formik.errors.firstName}</p>)}
          </div>
          <div className="form-floating col-6 mb-3 mt-3">
            <input type="text" className="form-control" id="floatingMiddleName" placeholder="John Doe"
              name="middleName"
              onChange={formik.handleChange}
              value={formik.values.middleName}
              onBlur={formik.handleBlur} ></input>
            <label htmlFor="floatingmiddleName">Middle Name</label>
            {formik.touched.middleName && formik.errors.middleName && (
              <p className="text-danger">{formik.errors.middleName}</p>)}
          </div>
          <div className="form-floating col-6 mb-3">
            <input type="text" className="form-control"
              id="floatingLastName"
              placeholder="John Doe"
              name="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              onBlur={formik.handleBlur} ></input>
            <label htmlFor="floatingLastName">Last Name *</label>
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-danger">{formik.errors.lastName}</p>)}
          </div>
          <div className="form-floating col-6 mb-3">
            <input type="text" className="form-control" id="floatingPhone" placeholder="John Doe"
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
            <label htmlFor="floatingEmail">Email address *</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>)}
          </div>
          <div className="form-floating col-6">
            <input type="text" className="form-control" id="floatingPassword" placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur} ></input>
            <label htmlFor="floatingPassword">Password *</label>
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>)}
          </div>
        </div>
        <h6 className="mt-4">Gander / Image</h6>
        <div className="row border rounded-4">
          <div className="form-floating col-6 mb-3 mt-3">
            <select className="form-select" aria-label="Grnder" id="floatingGender" placeholder="John Doe"
              name="gender"
              onChange={formik.handleChange}
              value={formik.values.gender}
              onBlur={formik.handleBlur} >
              <option value=""></option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            <label htmlFor="floatingGender">Gender *</label>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-danger">{formik.errors.gender}</p>)}
          </div>
          <div className="form-floating col-6 mb-3 mt-3">
            <input
              type="text" className="form-control" id="floatingUserImgURL" placeholder="John Doe"
              name="userImgURL"
              onChange={formik.handleChange}
              value={formik.values.userImgURL}
              onBlur={formik.handleBlur} ></input>
            <label htmlFor="floatingUserImgURL">User Image URL</label>
            {formik.touched.userImgURL && formik.errors.userImgURL && (
              <p className="text-danger">{formik.errors.userImgURL}</p>)}
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
            <input
              type="text"
              className="form-control"
              id="floatingZipCode"
              placeholder="John Doe"
              name="zipcode"
              onChange={formik.handleChange}
              value={formik.values.zipcode}
              onBlur={formik.handleBlur} ></input>
            <label htmlFor="floatingZipCode">Zip Code *</label>
            {formik.touched.zipcode && formik.errors.zipcode && (
              <p className="text-danger">{formik.errors.zipcode}</p>)}
          </div>
          <div className="form-check ms-3 text-start fw-bold">
            <input className="form-check-input" type="checkbox" id="roleCheckbox"
              name="role"
              checked={formik.values.role === "business"}
              onChange={(e) => {
                formik.setFieldValue("role",e.target.checked ? "business" : "user");}}
              onBlur={formik.handleBlur} />
            <label className="form-check-label " htmlFor="roleCheckbox">
              SignUp as Business
            </label>
            {formik.touched.role && formik.errors.role && (
              <p className="text-danger">{formik.errors.role}</p>)}
          </div>
        </div>
        <button className="btn btn-secondary w-100 mt-3" type="submit">SignUp</button>
      </form>
      <label className="form-check-label" htmlFor="form2Example3">
        Already signed up? <br />
        <Link to={"/signin"}>Click here to SignIn</Link>
      </label>
    </div>
  );
};
export default SignUp;
