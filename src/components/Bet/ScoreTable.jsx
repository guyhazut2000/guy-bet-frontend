import React, { useEffect, useState } from "react";
import UserService from "../../services/User";
import BetService from "../../services/Bet";
import { ScoreComparator } from "../../utils/MatchComparator";
import capitalizeFirstLetter from "../../utils/StringUtils";

const ScoreTable = () => {
  const [users, setUsers] = useState();

  /**
   * @description This function calculate the total sum of the user scores.
   * @param {string} id the user MongoDB Object Id
   * @returns {number} The user total bets score.
   */
  const getUserScore = async (id) => {
    let sumOfUserScore = 0;

    try {
      const res = await BetService.getAllByUserId(id);

      if (res.data !== null) {
        const bets = res.data;
        bets?.forEach((bet) => (sumOfUserScore += bet.score));
      }
    } catch (error) {
      console.error(error);
    }

    return sumOfUserScore;
  };

  const getAllUsersWithScore = async () => {
    let users = [];

    const res = await UserService.getAll();
    if (res.data !== null) {
      users = [...res.data];
      Promise.all(
        users.map(async (user) => {
          return { ...user, score: await getUserScore(user?._id) };
        })
      ).then((updatedUsers) => setUsers(updatedUsers));
    }
  };

  useEffect(() => {
    getAllUsersWithScore();
  }, []);

  return (
    <div className="mx-3 py-3">
      <h1 className="text-center"> Table Score</h1>
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

export default ScoreTable;
