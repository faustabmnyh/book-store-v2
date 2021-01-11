import { Link } from "react-router-dom";
import "./CompletedSteps.css";

const CompletedSteps = ({
  stepOne,
  stepTwo,
  stepThree,
  stepFour,
}) => {
  return (
    <div className="completedSteps">
      <div>
        <div className="completedSteps__content">
          <div
            className={stepOne ? "completedSteps__rounded active" : "completedSteps__rounded"}
          >
            1
          </div>
          <div
            className={stepTwo ? "completedSteps__line active" : "completedSteps__line"}
          ></div>
        </div>
        <div className="completedSteps__textOne">Sign In</div>
      </div>
      <Link to="/shipping">
        <div>
          <div className="completedSteps__content">
            <div
              className={
                stepTwo ? "completedSteps__rounded active" : "completedSteps__rounded"
              }
            >
              2
            </div>
            <div
              className={stepThree ? "completedSteps__line active" : "completedSteps__line"}
            ></div>
          </div>
          <div className="completedSteps__textTwo">Shipping</div>
        </div>
      </Link>
      <Link to="/paymentmethods">
        <div>
          <div className="completedSteps__content">
            <div
              className={
                stepThree ? "completedSteps__rounded active" : "completedSteps__rounded"
              }
            >
              3
            </div>
            <div
              className={stepFour ? "completedSteps__line active" : "completedSteps__line"}
            ></div>
          </div>
          <div className="completedSteps__textThree">Payment</div>
        </div>
      </Link>
      <div>
        <div
          className={stepFour ? "completedSteps__rounded active" : "completedSteps__rounded"}
        >
          4
        </div>
        <div className="completedSteps__textFive">Success Order</div>
      </div>
    </div>
  );
};

export default CompletedSteps;
