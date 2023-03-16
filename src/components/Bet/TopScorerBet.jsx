import React from "react";
import { Mbappe, Haaland } from "../../images/index";

function TopScorerBet({ playerName, score, status }) {
  return (
    <div className="d-flex flex-column">
      <h4 className="mb-4 text-center">Top Scorer</h4>
      <p className="mx-2 gap-2 d-flex mb-2">
        <b>prediction - </b> {playerName}
      </p>
      <img
        src={playerName === "haaland" ? Haaland : Mbappe}
        className="mt-4 card-img-top align-self-center"
        alt="Team Logo"
        style={{ height: "12rem", width: "12rem" }}
      />
      <div
        style={{
          color: status === "live" ? "black" : score > 0 ? "green" : "red",
        }}
      >
        <p>
          <b>Status</b> - {status}
        </p>
        <p>
          <b>Score</b> - {status === "live" ? "TBA" : score}
        </p>
      </div>
    </div>
  );
}

export default TopScorerBet;
