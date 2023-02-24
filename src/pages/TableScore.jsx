import React, { useEffect, useState } from "react";
import UserService from "../services/User";
import BetService from "../services/Bet";
import { ScoreComparator } from "../utils/MatchComparator";
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
    <div className="mx-3 py-3">
      <br />
      <h1 className="text-center"> Table Score</h1>
      <br />
      <br />
      {users ? (
        <div className="">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">No.</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {users?.sort(ScoreComparator).map((user, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{capitalizeFirstLetter(user?.firstName)}</td>
                    <td>{capitalizeFirstLetter(user?.lastName)}</td>
                    <td>{user?.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-info">Loading Table...</p>
      )}
    </div>
  );
};

export default TableScore;
