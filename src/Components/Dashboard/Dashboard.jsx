import React from "react";
import "./Dashboard.css";
import Opportunities from "./Opportunities";
import OppForm from "./OppForm";
import DashHeader from "./DashHeader";
import RightHolder from "./RightHolder";
import Accounts from "./Accounts";
// import { BsFillPlusSquareFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import ActiveRight from "./ActiveRight";
import { useNavigate } from "react-router-dom";

// import Data from "../../Data";

function Dashboard(props) {
  const navigate = useNavigate();
  console.log(props);
  const [clicked, setClicked] = React.useState(false);
  const [renderOpp, setRenderOpp] = React.useState(true);
  const [renderComp, setRenderComp] = React.useState(false);
  const [formActive, setFormActive] = React.useState(false);
  const [popAccountForm, setPopAccount] = React.useState(false);
  const [savedData, setSavedData] = React.useState(props.savedData);
  //   const [Opportunity, setOpportunity] = React.useState([]);
  //   const [accFormActive, setAccFormActive] = React.useState(false);
  //   let userAcc = [props.currentUser.userAcc];
  const [accId, setAccId] = React.useState();
  const [renderRightHolder, setRenderRightHolder] = React.useState(false);

  const [opportunityId, setOpportunityId] = React.useState();

  function displayOppId(id) {
    console.log(id);
    setOpportunityId(id);
    setRenderRightHolder(true);
  }
  console.log(props.savedData);

  //   console.log(Opportunity);

  function menuClick() {
    setClicked(!clicked);
  }
  function cancelForm() {
    setFormActive(false);
  }
  function renderOpportunities() {
    setRenderOpp(true);
    setClicked(false);
    setRenderComp(false);
  }

  function renderCompnanies() {
    setRenderComp(!renderComp);
    setRenderOpp(false);
    setClicked(false);
  }
  function addOpp() {
    setFormActive(true);
  }
  function removeOpp() {
    console.log("remove opp");
    const alteredData = savedData.map((person) => {
      if (person.id === props.currentUser.id) {
        person.userAcc.forEach((acc) => {
          if (acc.id === accId) {
            acc.opportunity = acc.opportunity.filter(
              (opp) => opp.oppId !== opportunityId
            );
          }
        });
      }
      return person;
    });

    setSavedData(alteredData);
    localStorage.clear();
    localStorage.setItem("data", JSON.stringify(savedData));
  }

  function displayAccOpp(id) {
    console.log(id);
    setAccId(id);
  }

  function createCompanyAcc(event) {
    event.preventDefault();
    const nameCompany = event.target.elements.nameCompany.value;
    const emailCompany = event.target.elements.emailCompany.value;
    const objAcc = {
      id: Date.now(),
      nameCompany: nameCompany,
      emailCompany: emailCompany,
      opportunity: [],
    };

    const newData = savedData.map((persion) => {
      if (persion.id === props.currentUser.id) {
        persion.userAcc.push(objAcc);
      }
      return persion;
    });

    setSavedData(newData);
    localStorage.clear();
    localStorage.setItem("data", JSON.stringify([]));
    localStorage.setItem("data", JSON.stringify(savedData));
    console.log(savedData);
    setPopAccount(false);

    // setOpportunity(
    //   savedData
    //     .find((item) => item.id === props.currentUser.id)
    //     ?.userAcc.flatMap((data) => data.opportunity)
    // );
  }
  function goHome() {
    navigate(`/user/${props.currentUser.id}`);
  }

  function createOpp(event) {
    event.preventDefault();
    const oppName = event.target.elements.oppName.value;
    const oppComp = event.target.elements.oppComp.value;
    const oppAmount = event.target.elements.oppAmount.value;
    const oppEmail = event.target.elements.oppEmail.value;
    const oppObject = {
      oppId: Date.now(),
      oppName: oppName,
      oppComp: oppComp,
      oppAmount: oppAmount,
      oppEmail: oppEmail,
      stage: {
        Discovery: true,
        Proposal: false,
        Shared: false,
        Negotiations: false,
      },
    };

    const updatedData = savedData.map((person) => {
      if (person.id === props.currentUser.id) {
        console.log(person);
        person.userAcc.forEach((acc) => {
          if (acc.nameCompany === oppComp) {
            acc.opportunity.push(oppObject);
            console.log(acc);
          }
        });
      }
      return person;
    });

    setSavedData(updatedData);

    localStorage.setItem("data", JSON.stringify(updatedData));
    setFormActive(false);
  }

  // setOpportunity(getUserOpportunities(updatedData));
  const userAcc = props.currentUser.userAcc.find((item) => item.id === accId);
  const opportunities = userAcc
    ? userAcc.opportunity.flatMap((opp) => opp)
    : [];

  function closePopUp() {
    setPopAccount(false);
  }

  function setPopUp() {
    setPopAccount(true);
  }

  //   formActive
  return (
    <div className="Dashboard">
      {formActive && <OppForm cancelForm={cancelForm} createOpp={createOpp} />}
      {popAccountForm && (
        <div className="account-form-holder">
          <div className="form-cancel" onClick={closePopUp}>
            <ImCross />
          </div>
          <form onSubmit={createCompanyAcc}>
            <label htmlFor="">Company:</label>
            <input type="text" name="nameCompany" />

            <label htmlFor="">Company Address:</label>
            <input
              type="email"
              placeholder="company@gmail.com"
              name="emailCompany"
            />

            <button type="submit" className="create-acc-btn">
              Create
            </button>
          </form>
        </div>
      )}

      <DashHeader
        menuClick={menuClick}
        renderOpportunities={renderOpportunities}
        renderCompnanies={renderCompnanies}
        clicked={clicked}
        currentUser={props.currentUser}
        logOut={props.logOut}
        setPopUp={setPopUp}
        goHome={goHome}
      />

      <div className="dashboard-container">
        <div className="dashboard-holder">
          <div className="dashboard-holder-top">
            {/* =================lEFT================ */}

            <div className="dashboard-left">
              {props.currentUser.userAcc.map((acc) => {
                return (
                  <Accounts
                    acc={acc}
                    key={acc.id}
                    // addAcc={addAcc}
                    displayAccOpp={() => displayAccOpp(acc.id)}
                  />
                );
              })}
            </div>

            {/* ================ DISPLAY=============== */}

            {renderRightHolder ? (
              <RightHolder
                addOpp={addOpp}
                removeOpp={removeOpp}
                opportunityId={opportunityId}
                savedData={savedData}
                currentUser={props.currentUser}
                // addAcc={addAcc}
                opportunities={opportunities}
                accId={accId}
              />
            ) : (
              <ActiveRight
                addOpp={addOpp}
                removeOpp={removeOpp}
                // addAcc={addAcc}
              />
            )}
          </div>
          {/* ======================================================== */}
          <div className="dashboard-holder-bottom">
            <div className="dashboard-bottom">
              {opportunities.map((opp) => (
                <Opportunities
                  key={opp.oppId}
                  data={opp}
                  displayOppId={() => displayOppId(opp.oppId)}
                  opportunityId={opportunityId}
                />
              ))}
            </div>
          </div>
          {/* ============================================== */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
