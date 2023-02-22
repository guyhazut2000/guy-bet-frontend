import React, { useState } from "react";
import BetService from "../services/Bet";
import MatchService from "../services/Match";

const BetForm = ({ userId, matchId, bet }) => {
  const [newBet, setNewBet] = useState({ userId, matchId });

  const handleClick = async (event) => {
    event.preventDefault();
    const currentTime = new Date();
    const res = await MatchService.getMatchById(matchId);
    const matchTime = res.data.match.date;
    let matchDate = new Date(matchTime);
    if (currentTime < matchDate) {
      const res = await BetService.create({
        ...newBet,
        homeTeamName: bet.homeTeamName,
        awayTeamName: bet.awayTeamName,
      });
      if (res.data) {
        alert("bet is added");
        window.location.reload();
      } else {
        alert("bet failed");
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewBet({ ...newBet, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <p>
        {bet?.homeTeamName} vs {bet?.awayTeamName}
      </p>
      <label htmlFor="homeTeam">Home </label>
      <input type="number" id="homeTeamScore" onChange={handleChange} />
      <label htmlFor="awayTeam">Away </label>
      <input type="number" id="awayTeamScore" onChange={handleChange} />
      <button onClick={handleClick}>Submit</button>
      <br />
    </div>
  );
};

export default BetForm;
