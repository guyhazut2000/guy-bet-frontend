import http from "../utils/http-common";

class MatchService {
  getAll() {
    return http.get("/matches/all");
  }
  getMatchById(matchId) {
    return http.get(`/matches/${matchId}`);
  }
}

const exportedObject = new MatchService();
export default exportedObject;
