import { useHistory } from "react-router-dom";
import "./CompletedSteps.css";

const CompletedSteps = ({ stepOne, stepTwo, stepThree, stepFour }) => {
  const history = useHistory();
  return (
    <div className="completedSteps">
      <div className={stepOne ? "active" : ""}>
        <p>Sign In</p>{" "}
      </div>
      <div
        className={stepTwo ? "active" : ""}
        onClick={() => history.push("/shipping")}
      >
        <p>Shipping</p>{" "}
      </div>
      <div
        className={stepThree ? "active" : ""}
        onClick={() => history.push("/payment")}
      >
        <p className="compeletedSteps__payment">Payment</p>
      </div>
      <div className={stepFour ? "active" : "completedSteps__lastStep"}>
        <p className="completedSteps__finish">Finish</p>
      </div>
    </div>
  );
};

export default CompletedSteps;
