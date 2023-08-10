import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface PageNotFoundProps { }

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
  let navigate = useNavigate();
  return (
    <div className="container mt-5">
      <h1 className="display-3 my-5">Oooops! <br /> Something whent wrong!! <br /> <small className="fs-4">Please contact website administrator</small> </h1>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default PageNotFound;
