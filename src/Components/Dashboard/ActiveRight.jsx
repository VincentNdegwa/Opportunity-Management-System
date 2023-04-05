import React from "react";

function ActiveRight(props) {
  return (
    <div className="dashboard-right">
      <div className="right-holder">
        <div className="display-right">
          <div className="opportunity-display">
            <div className="oppotunity-bar bar1"></div>

            <div className="oppotunity-bar bar2"></div>

            <div className="oppotunity-bar bar3"></div>

            <div className="oppotunity-bar bar4"></div>
          </div>
          <div className="opportunity-key">
            <div className="key1 key">
              <p>Discovery</p>
            </div>
            <div className="key2 key">
              <p>Proposal</p>
            </div>
            <div className="key3 key">
              <p>Shared</p>
            </div>
            <div className="key4 key">
              <p>Negotiation</p>
            </div>
          </div>
        </div>

        <div className="display-left">
          <div className="display-currencies">00000 Ksh</div>
          <div className="opportunity-add-remove">
            <div className="opportunity-icon add" onClick={props.addOpp}>
              +
            </div>
            <div className="opportunity-icon remove" onClick={props.removeOpp}>
              -
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveRight;
