import React from "react";
import BetCardItem from "../Bet/BetCardItem";

function BetCardItemList({ bets }) {
  return (
    <div className="d-flex flex-row m-auto flex-wrap ">
      {bets?.map((bet, i) => (
        <BetCardItem key={i} bet={bet} />
      ))}
    </div>
  );
}

export default BetCardItemList;
