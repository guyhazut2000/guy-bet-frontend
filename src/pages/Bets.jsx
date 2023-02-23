import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Bet from "../components/Bet";
import BetService from "../services/Bet";
import MatchService from "../services/Match";
import {
  DateComparator,
  GetTodayBets,
  GetAllHistoryBets,
} from "../utils/MatchComparator";
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
    <div className="container-fluid ">
      <h3 className="text-center py-3">My Bets</h3>
      {bets ? (
        <div className="row d-flex gap-2">
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
        </div>
      ) : (
        <p className="text-center text-info">Loading Previous Bets...</p>
      )}
      <br />
      <br />
      <h3 className="text-center text-success ">Total Score - {totalScore}</h3>
      <br />
      <br />
      <h3 className="text-center py-3">Up Coming Games</h3>
      {futureBets ? (
        <div className="row d-flex gap-2">
          {futureBets?.map((bet, i) => (
            <BetForm key={i} bet={bet} userId={user._id} matchId={bet._id} />
          ))}
        </div>
      ) : (
        <p className="text-center text-info">Loading Up Coming Bets...</p>
      )}
    </div>
  );
};

export default Bets;
