import http from "../utils/http-common";

class GameService {
  getAll() {
    return http.get("/games/all");
  }
  getGameById(gameId) {
    return http.get(`/games/${gameId}`);
  }
}

const exportedObject = new GameService();
export default exportedObject;
