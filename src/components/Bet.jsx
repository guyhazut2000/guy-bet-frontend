import React from "react";

const Bet = ({
  homeTeamName,
  awayTeamName,
  homeTeamScore,
  awayTeamScore,
  score,
}) => {
  return (
    <div>
      <p>
        {homeTeamName} - {homeTeamScore} {awayTeamName} - {awayTeamScore}
      </p>
      {score !== null ? <p>Score - {score}</p> : <></>}
    </div>
  );
};

export default Bet;
