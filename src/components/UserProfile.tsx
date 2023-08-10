import { FunctionComponent } from "react";
import { updateUser } from "../services/usersService";
import User from "../interfaces/User";
import { useFormik } from "formik";
import * as yup from "yup";
import { successMsg } from "../services/feedbacksService";

interface UserProfileProps {
  userInfo: any;
  onHide: Function;
  setUserProfile: Function;
  userProfile: any;
  editForm: boolean;
  setEditForm: Function;
  render: Function;
  togglePassword: Function;
  passwordShown: boolean;
}
const UserProfile: FunctionComponent<UserProfileProps> = ({ onHide, userProfile, editForm, setEditForm, render, togglePassword, passwordShown }) => {
  let formik = useFormik({
    initialValues: {
      firstName: userProfile.firstName, middleName: userProfile.middleName, lastName: userProfile.lastName, phone: userProfile.phone, email: userProfile.email, password: userProfile.password, gender: userProfile.gender, userImgURL: userProfile.userImgURL, country: userProfile.country, state: userProfile.state, city: userProfile.city, street: userProfile.street, houseNumber: userProfile.houseNumber, zipcode: userProfile.zipcode, role: userProfile.role, isActive: userProfile.isActive
    },
    validationSchema: yup.object({
      firstName: yup.string().required().min(2), middleName: yup.string().min(2), lastName: yup.string().required().min(2),
      phone: yup.string().required().min(2), email: yup.string().required().email(), password: yup.string().required().min(8).matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%#^*?&]{8,}$/, "Password must contain at least 1 uppercase letter, lowercase letter, digit and special character (@$!%*?&#^)"), gender: yup.string().required(), userImgURL: yup.string().min(2), country: yup.string().required().min(2), state: yup.string().min(2), city: yup.string().required().min(2), street: yup.string().required().min(2), houseNumber: yup.string().required().min(2), zipcode: yup.string().min(2), role: yup.string().min(2)
    }),
    enableReinitialize: true,
    onSubmit(values: User) {
      updateUser(values, userProfile.id)
        .then((res) => {
          setEditForm(true)
          onHide();
          render();
          successMsg(`Changes where saved for user ${values.email}`);
        })
        .catch((err) => console.log(err));
    },
  });
  return <>
    <div className="row g-0">
      <div className="col-md-4">
      </div>
      <div className="container">
        <form className="form-floating  mt-3" onSubmit={formik.handleSubmit}>
          <h6 className=" mt-4 text-start">General</h6>
          <div className="row g-2 border rounded-4 border-secondary mt-1">
            <div className="form-floating col-6 mb-3 mt-3">
              <input type="text" className="form-control border-secondary " id="floatingFirstName" placeholder="First Nane"
                name="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                disabled={editForm} ></input>
              <label htmlFor="floatingFirstName">First Name *</label>
              {formik.touched.firstName && formik.errors.firstName && (<p className="text-danger">{formik.errors.firstName}</p>)}
            </div>
            <div className="form-floating col-6 mb-3 mt-3">
              <input type="text" className="form-control border-secondary" id="floatingMiddleName" placeholder="Middle Name"
                name="middleName"
                onChange={formik.handleChange}
                value={formik.values.middleName}
                onBlur={formik.handleBlur} disabled={editForm}></input>
              <label htmlFor="floatingmiddleName">Middle Name</label>
              {formik.touched.middleName && formik.errors.middleName && (<p className="text-danger">{formik.errors.middleName}</p>)}
            </div>
            <div className="form-floating col-6 mb-3">
              <input type="text" className="form-control border-secondary" id="floatingLastName" placeholder="Last Name"
                name="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                onBlur={formik.handleBlur} disabled={editForm}></input>
              <label htmlFor="floatingLastName">Last Name *</label>
              {formik.touched.lastName && formik.errors.lastName && (<p className="text-danger">{formik.errors.lastName}</p>)}
            </div>
            <div className="form-floating col-6 mb-3">
              <input type="text" className="form-control border-secondary" id="floatingPhone" placeholder="Phone Number"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                onBlur={formik.handleBlur} disabled={editForm}></input>
              <label htmlFor="floatingPhone">Phone Number *</label>
              {formik.touched.phone && formik.errors.phone && (<p className="text-danger">{formik.errors.phone}</p>)}
            </div>
            <div className="form-floating col-6 mb-3">
              <input type="text" className="form-control border-secondary" id="floatingEmail" placeholder="name@example.com"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur} disabled={editForm}></input>
              <label htmlFor="floatingEmail">Email address *</label>
              {formik.touched.email && formik.errors.email && (<p className="text-danger">{formik.errors.email}</p>)}
            </div>
            <div className="form-floating col-6">
              <input type={passwordShown ? "text" : "password"} className="form-control border-secondary" id="floatingPassword" placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur} disabled={editForm}></input>
              <div className="passIcon">
                {passwordShown ? <i className="fa-solid fa-eye-slash passIcon" onClick={() => togglePassword(!passwordShown)}></i> : <i className="fa-solid fa-eye passIcon" onClick={() => togglePassword(!passwordShown)}></i>}
              </div>
              <label htmlFor="floatingPassword">Password *</label>
              {formik.touched.password && formik.errors.password && (<p className="text-danger">{formik.errors.password}</p>)}
            </div>
          </div>
          <h6 className="mt-4 text-start">Gander / Image</h6>
          <div className="row g-2 border rounded-4 border-secondary mt-1">
            <div className="form-floating col-6 mb-3 mt-3 ">
              <select className="form-select border-secondary" aria-label="Grnder" id="floatingGender" placeholder="Gender"
                name="gender"
                onChange={formik.handleChange}
                value={formik.values.gender}
                onBlur={formik.handleBlur}
                disabled={editForm}>
                <option value=""></option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              <label className="lable" htmlFor="floatingGender">Gender *</label>
              {formik.touched.gender && formik.errors.gender && (<p className="text-danger">{formik.errors.gender}</p>)}
            </div>
            <div className="form-floating col-6 mb-3 mt-3">
              <input
                type="text" className="form-control border-secondary" id="floatingUserImgURL" placeholder="User Image URL"
                name="userImgURL"
                onChange={formik.handleChange}
                value={formik.values.userImgURL}
                onBlur={formik.handleBlur} disabled={editForm}></input>
              <label htmlFor="floatingUserImgURL">User Image URL</label>
              {formik.touched.userImgURL && formik.errors.userImgURL && (<p className="text-danger">{formik.errors.userImgURL}</p>)}
            </div>
          </div>
          <h6 className="mt-4 text-start">Address</h6>
          <div className="row g-2 border rounded-4 border-secondary mt-1">
            <div className="form-floating col-6 mb-3 mt-3">
              <input type="text" className="form-control border-secondary" id="floatingState" placeholder="State"
                name="state"
                onChange={formik.handleChange}
                value={formik.values.state}
                onBlur={formik.handleBlur} disabled={editForm}></input>
              <label htmlFor="floatingState">State</label>
              {formik.touched.state && formik.errors.state && (<p className="text-danger">{formik.errors.state}</p>)}
            </div>
            <div className="form-floating col-6 mb-3 mt-3">
              <input type="text" className="form-control border-secondary" id="floatingCountry" placeholder="Country"
                name="country"
                onChange={formik.handleChange}
                value={formik.values.country}
                onBlur={formik.handleBlur} disabled={editForm}></input>
              <label htmlFor="floatingCountry">Country *</label>
              {formik.touched.country && formik.errors.country && (<p className="text-danger">{formik.errors.country}</p>)}
            </div>
            <div className="form-floating col-6 mb-3">
              <input type="text" className="form-control border-secondary" id="floatingCity" placeholder="City"
                name="city"
                onChange={formik.handleChange}
                value={formik.values.city}
                onBlur={formik.handleBlur} disabled={editForm}></input>
              <label htmlFor="floatingCity">City *</label>
              {formik.touched.city && formik.errors.city && (<p className="text-danger">{formik.errors.city}</p>)}
            </div>
            <div className="form-floating col-6 mb-3">
              <input type="text" className="form-control border-secondary" id="floatingStreet" placeholder="Street"
                name="street"
                onChange={formik.handleChange}
                value={formik.values.street}
                onBlur={formik.handleBlur} disabled={editForm}></input>
              <label htmlFor="floatingStreet">Street *</label>
              {formik.touched.street && formik.errors.street && (<p className="text-danger">{formik.errors.street}</p>)}
            </div>
            <div className="form-floating col-6 mb-3">
              <input
                type="text" className="form-control border-secondary" id="floatingHouseNumber" placeholder="House Number"
                name="houseNumber"
                onChange={formik.handleChange}
                value={formik.values.houseNumber}
                onBlur={formik.handleBlur} disabled={editForm}></input>
              <label htmlFor="floatingHouseNumber">House Number *</label>
              {formik.touched.houseNumber && formik.errors.houseNumber && (<p className="text-danger">{formik.errors.houseNumber}</p>)}
            </div>
            <div className="form-floating col-6 mb-3">
              <input
                type="text"
                className="form-control border-secondary" id="floatingZipCode" placeholder="Zip Code"
                name="zipcode"
                onChange={formik.handleChange}
                value={formik.values.zipcode}
                onBlur={formik.handleBlur} disabled={editForm}></input>
              <label htmlFor="floatingZipCode">Zip Code *</label>
              {formik.touched.zipcode && formik.errors.zipcode && (
                <p className="text-danger">{formik.errors.zipcode}</p>)}
            </div>
          </div>
          <button className="btn btn-secondary w-100 mt-3" type="submit">Save Changes</button>
        </form>
        <div className="col-6">
          <button className="btn btn-danger mt-3" onClick={() => { onHide(); setEditForm(true) }}>Close Without Saving</button>
        </div>
      </div>
    </div>
  </>
};

export default UserProfile;