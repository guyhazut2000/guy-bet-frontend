import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// custom components
import BetCardItemList from "../components/Bet/BetCardItemList";
import GameCardItemList from "../components/Game/GameCardItemList";
import Header from "../components/Bet/Header";
// services
import BetService from "../services/Bet";
import GameService from "../services/Game";
// alert

const Bets = () => {
  // Current user
  const user = useSelector((state) => state.user.currentUser);

  // Bets, games and score data
  const [bets, setBets] = useState();
  const [futureGames, setFutureGames] = useState();
  const [score, setScore] = useState();

  // Bet types options
  const [betTypesOptions, setBetTypesOptions] = useState({
    match_up: true,
    next_round_winner: true,
    top_scorer: true,
    tournament_winner: true,
  });

  // Bet type labels
  const betTypes = [
    "match_up",
    "next_round_winner",
    "top_scorer",
    "tournament_winner",
  ];

  // Bet status options
  const [betStatusOptions, setBetStatusOptions] = useState({
    live: true,
    won: false,
    lose: false,
  });

  // Bet status labels
  const betStatuses = ["live", "won", "lose"];

  // Convert DB Schema type String to UI String
  const dict = {
    match_up: "Match Up",
    next_round_winner: "Next Round Winner",
    top_scorer: "Top Scorer",
    tournament_winner: "Tournament Winner",
    live: "Live",
    won: "Won",
    lose: "Lose",
  };

  /**
   * @description This function calculate the user total score.
   * @param {string} userId MongoDB Object Id String
   * @returns {number} Sum of user scores.
   */
  const getUserScore = async (userId) => {
    let sumOfUserScore = 0;

    try {
      const res = await BetService.getAllByUserId(userId);

      if (res.data !== null) {
        const bets = res.data;
        bets?.forEach((bet) => (sumOfUserScore += bet.score));
      }
    } catch (error) {
      console.error(error);
    }

    // set score
    setScore(sumOfUserScore);
  };

  /**
   * @param {String} userId  MongoDB Object Id String
   * @description This function gets all the user bets by userId and filter them based on the user type and status checkbox options.
   */
  const getAllBetsByUserId = async (userId) => {
    try {
      const res = await BetService.getAllByUserId(userId);

      if (res.data !== null) {
        let bets = res.data;

        // filter bet based on user type and status checkbox options
        bets = filterBetsByTypes(bets);
        bets = filterBetsByStatues(bets);
        setBets(bets);
      } else {
        setBets(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * @param {String} userId MongoDB Object Id String
   * @description Get all future games with status - 'live' and type - 'match_up' which the user didn't bet on them already.
   */
  const getFutureGames = async () => {
    try {
      const games = await GameService.getAll();
      const userBets = await BetService.getAllByUserId(user._id);

      if (games?.data !== null && bets?.data !== null) {
        // Get all games with status = 'live' and type = 'match_up' and user didn't bet on them.
        const filteredGames = games.data?.filter((game) => {
          return (
            game.status === "live" &&
            !userBets.data
              ?.filter(
                (bet) => bet.status === "live" && bet.type === "match_up"
              )
              ?.map((bet) => {
                return bet.gameId;
              })
              ?.includes(game._id)
          );
        });
        setFutureGames(filteredGames);
      } else {
        setFutureGames(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * @param {Array} bets
   * @description Filter user bets by type options.
   */
  const filterBetsByTypes = (bets) => {
    return bets?.filter((bet) => {
      if (betTypesOptions[bet.type]) return true;
      return false;
    });
  };

  /**
   * @param {Array} bets
   * @description Filter user bets by status options.
   */
  const filterBetsByStatues = (bets) => {
    return bets?.filter((bet) => {
      if (betStatusOptions[bet.status]) return true;
      return false;
    });
  };

  // Get all user bets
  useEffect(() => {
    getAllBetsByUserId(user._id);
  }, [bets]);

  // Get user score
  useEffect(() => {
    getUserScore(user._id);
  }, []);

  // Get future games
  useEffect(() => {
    getFutureGames();
  }, []);

  /**
   * @param {Event} e
   * @description This function filter the user bets types based on the checkbox inputs.
   */
  const handleTypeClick = (e) => {
    setBetTypesOptions({
      ...betTypesOptions,
      [e.target.id]: !betTypesOptions[e.target.name],
    });
    setBets(filterBetsByTypes(bets));
  };
  /**
   * @param {Event} e
   * @description This function filter the user bets status based on the checkbox inputs.
   */
  const handleStatusClick = (e) => {
    setBetStatusOptions({
      ...betStatusOptions,
      [e.target.id]: !betStatusOptions[e.target.name],
    });
    setBets(filterBetsByStatues(bets));
  };

  return (
    <div className="container-fluid d-flex flex-column gap-2">
      <Header title="Bets" />
      <div className="d-flex flex-column">
        <h3>Type</h3>
        <form className="d-flex flex-column flex-sm-row gap-2 ">
          {betTypes.map((type) => {
            return (
              <div className="d-flex gap-1 ">
                <label htmlFor={type}>{dict[type]}</label>
                <input
                  type="checkbox"
                  id={type}
                  name={type}
                  value={type}
                  onChange={handleTypeClick}
                  checked={betTypesOptions[type]}
                />
              </div>
            );
          })}
        </form>
      </div>
      <div className="mt-3 d-flex flex-column">
        <h3> Status </h3>
        <form className="d-flex flex-column flex-sm-row gap-2 ">
          {betStatuses.map((status) => {
            return (
              <div className="d-flex gap-1 ">
                <label htmlFor={status}>{dict[status]}</label>
                <input
                  type="checkbox"
                  id={status}
                  name={status}
                  value={status}
                  onChange={handleStatusClick}
                  checked={betStatusOptions[status]}
                />
              </div>
            );
          })}
        </form>
      </div>

      <h3 className="my-5">Score: {score}</h3>

      {bets ? (
        <BetCardItemList bets={bets} />
      ) : bets === null ? (
        <p>There is no bets</p>
      ) : (
        <p>Loading bets...</p>
      )}
      <Header title="Future Games" />
      {futureGames ? (
        <GameCardItemList games={futureGames} />
      ) : futureGames === null ? (
        <p>There is no bets</p>
      ) : (
        <p>Loading Future bets...</p>
      )}
    </div>
  );
};

export default Bets;
