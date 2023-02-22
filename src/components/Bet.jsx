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
        {homeTeamName} - {awayTeamName} {homeTeamScore} - {awayTeamScore}
        {score !== null ? " Score : " + score : ""}
      </p>
    </div>
  );
};

export default Bet;
