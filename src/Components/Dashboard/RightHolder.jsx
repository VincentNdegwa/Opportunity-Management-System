import React from "react";

function RightHolder(props) {
  const [currentOpp, setCurrentOpp] = React.useState(
    props.opportunities?.find((item) => item.oppId === props.opportunityId)
  );
  const [Discovery, setDiscovery] = React.useState(
    currentOpp?.stage?.Discovery || false
  );
  const [Proposal, setProposal] = React.useState(
    currentOpp?.stage?.Proposal || false
  );
  const [Shared, setShared] = React.useState(
    currentOpp?.stage?.Shared || false
  );
  const [Negotiations, setNegotiations] = React.useState(
    currentOpp?.stage?.Negotiations || false
  );
  React.useEffect(() => {
    setCurrentOpp(
      props.opportunities?.find((item) => item.oppId === props.opportunityId)
    );
  }, [props.opportunityId, props.opportunities]);
  React.useEffect(() => {
    setDiscovery(currentOpp?.stage?.Discovery || false);
    setProposal(currentOpp?.stage?.Proposal || false);
    setShared(currentOpp?.stage?.Shared || false);
    setNegotiations(currentOpp?.stage?.Negotiations || false);
  }, [currentOpp]);

  //   (Discovery, Proposal shared, Negotiations)
  React.useEffect(() => {
    const newData = props.savedData.map((person) => {
      if (person.id === props.currentUser.id) {
        person.userAcc.forEach((acc) => {
          if (acc.id === props.accId) {
            acc.opportunity.forEach((opp) => {
              if (opp.oppId === props.opportunityId) {
                console.log(opp);
                if (opp.stage.Discovery === false) {
                  console.log("Discovery :", opp.stage.Discovery);
                  console.log("state Discover:", Discovery);
                  const discoveryInterval = setInterval(() => {
                    clearInterval(discoveryInterval);
                    opp.stage.Discovery = true;
                    setDiscovery(true);
                  }, 10000);
                }
                //  else {
                //   console.log("Discovery :", opp.stage.Discovery);
                //   console.log("state Discover:", Discovery);
                //   setDiscovery(true);
                // }

                if (opp.stage.Proposal === false) {
                  console.log("Proposal :", opp.stage.Proposal);
                  console.log("state Proposal:", Proposal);
                  const proposalInterval = setInterval(() => {
                    clearInterval(proposalInterval);
                    opp.stage.Proposal = true;
                    setProposal(true);
                  }, 20000);
                }
                // else {
                //   console.log("Proposal :", opp.stage.Proposal);
                //   console.log("state Proposal:", Proposal);
                //   setProposal(true);
                // }

                if (opp.stage.Shared === false) {
                  const sharedInterval = setInterval(() => {
                    clearInterval(sharedInterval);
                    opp.stage.Shared = true;
                    setShared(true);
                  }, 30000);
                }
                // else {
                //   setShared(true);
                // }

                if (opp.stage.Negotiations === false) {
                  const negotiationsInterval = setInterval(() => {
                    clearInterval(negotiationsInterval);
                    opp.stage.Negotiations = true;
                    setNegotiations(true);
                  }, 40000);
                }
                // else {
                //   setNegotiations(true);
                // }
              }
            });
          }
        });
      }
      return person;
    });
    localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(newData));
  }, [
    props.currentUser.id,
    props.accId,
    props.opportunityId,
    props.savedData,
    Discovery,
    Proposal,
  ]);
  // console.log(Discovery);
  // console.log(Proposal);
  // console.log(Shared);
  // console.log(Negotiations);
  return (
    <div className="dashboard-right">
      <div className="right-holder">
        <div className="display-right">
          <div className="opportunity-display">
            {Discovery ? <div className="oppotunity-bar bar1"></div> : ""}

            {Proposal ? <div className="oppotunity-bar bar2"></div> : ""}

            {Shared ? <div className="oppotunity-bar bar3"></div> : ""}

            {Negotiations ? <div className="oppotunity-bar bar4"></div> : ""}
          </div>
          {/* currentOpp && currentOpp.stage && */}
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
          <div className="opprtunity-details-display">
            <div className="opportunity-display-name">
              {currentOpp?.oppName}
            </div>
            <div className="opportunity-display-company">
              {currentOpp?.oppComp}
            </div>
          </div>

          <div className="display-currencies">{currentOpp?.oppAmount} Ksh</div>

          <div className="opportunity-add-remove">
            <div className="opportunity-icon add " onClick={props.addOpp}>
              <button>Add Opportunity</button>
            </div>
            <div className="opportunity-icon remove" onClick={props.removeOpp}>
              <button>Delete Opportunity</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightHolder;
