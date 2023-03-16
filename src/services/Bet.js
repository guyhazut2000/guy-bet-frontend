import http from "../utils/http-common";

class BetService {
  getAllByUserId(userId) {
    return http.post("/bets/all", { userId });
  }
  getAll() {
    return http.get("/bets/all");
  }

  create(bet) {
    return http.put("/bets/create", bet);
  }
  update(bet) {
    return http.post("/bets/update", bet);
  }
}

const exportedObject = new BetService();
export default exportedObject;
