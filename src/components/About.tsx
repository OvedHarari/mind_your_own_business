import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface AboutProps {
  userInfo: any;
}
const About: FunctionComponent<AboutProps> = ({ userInfo }) => {
  
  return (
    <div className="container mt-2">
      <h1 className="display-1 mb-3 fw-bold">
        <img
          src="/mindYourOwnBusiness_LOGO.png"
          alt="Mind Your Own Business logo"
          width="55"
          height="49"
        ></img>
        Mind Your Own Business
      </h1>
      <div className="fs-2 mt-5 mb-5">
        <p>
          Welcome to "Mind Your Own Business" website!
          <br /> We are a platform that connects businesses with potential
          customers in a user-friendly way. <br />
          Seamless and efficient experience in discovering and managing
          businesses' information.
        </p>
      </div>
      <div className=" text-start">
        <div className="row">
          <div className="card col" style={{ width: "40rem" }}>
            <div className="card-body">
              <h5 className="card-title fs-2">
                <i className="fa-solid fa-bullseye fs-5 mb-3"></i> For Casual
                Users:
              </h5>
              <div className="card-text fs-4">
                <p>
                  If you're a casual user, you can browse through various
                  businesses' cards and find out more about them. You have the
                  option to mark your favorite business cards, creating a
                  personalized collection for easy access later.
                </p>
                <p>
                  To start exploring businesses and adding your favorites, you
                  can sign up as a casual user by clicking on the link below:
                </p>
              </div>
            </div>
          </div>
          <div className="card col mx-4" style={{ width: "40rem" }}>
            <div className="card-body">
              <h5 className="card-title fs-2">
                <i className="fa-solid fa-bullseye fs-5 mb-3"></i> For Business
                Users:
              </h5>
              <div className="card-text fs-4">
                <p>
                  Are you a business owner looking to expand your reach and
                  attract more customers? Sign up as a business user to create
                  and manage your own business cards on our platform.
                </p>
                <p>
                  With a business account, you can showcase your services,
                  contact information, and other details to potential customers.
                  Update your card at any time to keep your audience informed.
                </p>
                <p>
                  To get started as a business user, click on the link below:
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!userInfo.email && (
        <Link to="/signup" className="btn btn-secondary mt-5">
          SignUp to M.Y.O.B !!!
        </Link>
      )}
      <h3 className="mt-5">Have Questions or Need Support?</h3>
      <p>
        We are committed to providing excellent customer support to ensure your
        experience on our platform is smooth and enjoyable. If you have any
        questions, encounter issues, or need assistance, our support team is
        ready to help.
      </p>
      <p>
        Feel free to reach out to our support team at{" "}
        <a href="mailto:MOUB-Support@Test.com">MOUB-Support@Test.com</a>, and
        we'll be more than happy to assist you.
      </p>
      <p className="mt-4">
        Thank you for choosing our platform! Whether you're a casual user or a
        business owner, we hope our website becomes a valuable tool for you to
        discover and connect with businesses in a meaningful way.
      </p>
    </div>
  );
};

export default About;
