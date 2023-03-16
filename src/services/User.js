import http from "../utils/http-common";

class UserService {
  // get user info by email.
  getUserByEmail(email) {
    return http.get(`/users/${email}`);
  }
  getUserById(id) {
    return http.get(`/users/${id}`);
  }
  getAll() {
    return http.get("/users/all");
  }
  login(email, password) {
    return http.post("/users/login", { email, password });
  }
  register(email, password, firstName, lastName) {
    return http.put("/users/create", {
      email,
      password,
      firstName,
      lastName,
    });
  }
}

const exportedObject = new UserService();
export default exportedObject;
