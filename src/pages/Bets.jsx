import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Bet from "../components/Bet";
import BetService from "../services/Bet";
import MatchService from "../services/Match";
import { DateComparator } from "../utils/MatchComparator";
import Swal from "sweetalert2";
import BetForm from "../components/BetForm";

const Bets = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [bets, setBets] = useState();
  const [futureBets, setFutureBets] = useState();
  let totalScore = 0;

  const getUserBets = async (userId) => {
    const res = await BetService.getAllById(userId);
    if (res.data !== null) setBets(res.data.bets);
  };

  const getFutureBets = async () => {
    const matches = await MatchService.getAll();
    const futureBets = matches.data.matches.filter((match) =>
      DateComparator(match.date)
    );
    setFutureBets(futureBets);
  };

  useEffect(() => {
    getUserBets(user._id);
    getFutureBets();
  }, []);

  return (
    <div>
      <h1>My Bets</h1>
      {bets?.forEach((item) => (totalScore += item?.score))}
      {bets?.map((bet, i) => (
        <Bet
          key={i}
          homeTeamName={bet?.homeTeamName}
          awayTeamName={bet?.awayTeamName}
          homeTeamScore={bet?.homeTeamScore}
          awayTeamScore={bet?.awayTeamScore}
          score={bet?.score}
        />
      ))}
      <p>Total Score - {totalScore}</p>
      <h3>Up Coming Games</h3>
      {futureBets?.map((bet, i) => (
        <div key={i} className="match-bet">
          <BetForm bet={bet} userId={user._id} matchId={bet._id} />
        </div>
      ))}
    </div>
  );
};

export default Bets;
