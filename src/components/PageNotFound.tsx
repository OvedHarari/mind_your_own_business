import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface PageNotFoundProps { }

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
  let navigate = useNavigate();
  return (
    <div className="container mt-5">
      <h1 className="display-3 my-5">404 - Page Not Found !</h1>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default PageNotFound;
