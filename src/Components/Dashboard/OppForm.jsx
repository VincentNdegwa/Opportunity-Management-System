import React from "react";
import { ImCross } from "react-icons/im";

function OppForm(props) {
  return (
    <div className="dashboard-form">
      <div className="form-cancel" onClick={props.cancelForm}>
        <ImCross />
      </div>
      <div className="dashboard-form-holder">
        <form onSubmit={props.createOpp}>
          <div className="form-group">
            <label>Opportunity Name:</label>
            <input type="text" name="oppName" />
          </div>

          <div className="form-group">
            <label>Comapany:</label>
            <input type="text" name="oppComp" />
          </div>

          <div className="form-group">
            <label>Amount(ksh):</label>
            <input type="numbers" name="oppAmount" />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="oppEmail" />
          </div>

          <button type="submit" className="opp-submit-button">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default OppForm;
