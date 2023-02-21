import http from "../utils/http-common";

class BetService {
  getAllById(id) {
    return http.post("/bets/all", { id });
  }
  getAll() {
    return http.get("/bets/all");
  }

  create(bet) {
    return http.put("/bets/create", bet);
  }
}

const exportedObject = new BetService();
export default exportedObject;
