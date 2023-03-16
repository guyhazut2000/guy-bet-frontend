import React from "react";
import MatchUpBet from "./MatchUpBet";
import NextRoundWinnerBet from "./NextRoundWinnerBet";
import TopScorerBet from "./TopScorerBet";
import TournamentWinnerBet from "./TournamentWinnerBet";

const BetCardItem = ({ bet }) => {
  return (
    <div
      className="card d-flex my-3 mx-auto m-lg-3 p-3 "
      style={{ width: "22rem", height: "27rem" }}
    >
      {bet.type === "match_up" ? (
        <MatchUpBet
          homeTeamName={bet?.homeTeamName}
          awayTeamName={bet?.awayTeamName}
          homeTeamScore={bet?.homeTeamScore}
          awayTeamScore={bet?.awayTeamScore}
          score={bet?.score}
          status={bet?.status}
          gameId={bet?.gameId}
          betId={bet?._id}
        />
      ) : bet.type === "next_round_winner" ? (
        <NextRoundWinnerBet
          firstTeamName={bet?.firstTeamName}
          secondTeamName={bet?.secondTeamName}
          prediction={bet?.prediction}
          score={bet?.score}
          status={bet?.status}
        />
      ) : bet.type === "top_scorer" ? (
        <TopScorerBet
          playerName={bet?.playerName}
          score={bet?.score}
          status={bet?.status}
        />
      ) : (
        bet.type === "tournament_winner" && (
          <TournamentWinnerBet
            teamName={bet?.teamName}
            score={bet?.score}
            status={bet?.status}
          />
        )
      )}
    </div>
  );
};

export default BetCardItem;
