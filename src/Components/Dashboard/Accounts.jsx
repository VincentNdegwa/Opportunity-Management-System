import React from "react";

function Accounts(props) {
  return (
    <div className="Accounts" onClick={props.displayAccOpp}>
      <div className="account-holder">
        <div className="account-item">
          <div className="account-name">{props.acc.nameCompany}</div>
          <div className="account-email">{props.acc.emailCompany}</div>
        </div>
      </div>
    </div>
  );
}

export default Accounts;
