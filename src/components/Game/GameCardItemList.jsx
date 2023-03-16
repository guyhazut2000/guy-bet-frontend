import React from "react";
import GameCardItem from "./GameCardItem";

const GameCardItemList = ({ games }) => {
  return (
    <div className="row d-flex gap-3 m-auto">
      {games?.map((game, i) => (
        <GameCardItem key={i} game={game} />
      ))}
    </div>
  );
};

export default GameCardItemList;
