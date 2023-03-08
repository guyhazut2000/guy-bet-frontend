import http from "../utils/http-common";

class BonusService {
  create(data) {
    return http.put("/bonuses/create", data);
  }
  getAllByUserId(userId) {
    return http.post("/bonuses/all", userId);
  }

  update(bonus) {
    return http.post("/bonuses/update", bonus);
  }
}

const exportedObject = new BonusService();
export default exportedObject;
