import React, { useEffect, useState } from "react";
import UserService from "../services/User";
import BetService from "../services/Bet";
import { scoreComparator } from "../utils/MatchComparator";
import capitalizeFirstLetter from "../utils/StringUtils";

const TableScore = () => {
  const [users, setUsers] = useState();

  const getUserScore = async (id) => {
    const res = await BetService.getAllById(id);
    let totalScore = 0;
    if (res.data !== null) {
      const userBets = res.data.bets;
      userBets.forEach((bet) => (totalScore += bet.score));
      return totalScore;
    }
    return 0;
  };

  const getAllUsersWithScore = async () => {
    let users = [];
    const res = await UserService.getAll();
    if (res.data !== null) {
      users = res.data.users;
      Promise.all(
        users.map(async (user) => {
          return { ...user, score: await getUserScore(user) };
        })
      ).then((updatedUsers) => setUsers(updatedUsers));
    }
  };

  useEffect(() => {
    getAllUsersWithScore();
  }, []);

  return (
    <div>
      <h1>TableScore</h1>
      {users?.sort(scoreComparator).map((user, i) => {
        return (
          <p key={i}>
            {capitalizeFirstLetter(user?.firstName) +
              " " +
              capitalizeFirstLetter(user?.lastName) +
              " Total Score: " +
              user?.score}
          </p>
        );
      })}
    </div>
  );
};

export default TableScore;
