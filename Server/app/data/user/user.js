import { hashPassword } from "../../helpers/crypto.js";
import { randomBytes } from "crypto";

class User {
  constructor({ username, email, password, role }) {
    this.user_id = `${this.randomString(5)}-${this.randomString(
      5
    )}-${this.randomString(5)}-${this.randomString(5)}`;
    this.username = username;
    this.email = email || "";
    this.password = hashPassword(password);
    this.role = role || "user";
    this.projects = [];
  }

  randomString(length) {
    return randomBytes(length).toString("hex");
  }

  validate() {
    if (!this.username) {
      return {
        error: "Username is required",
      };
    }
    if (!this.password) {
      return {
        error: "Password is required",
      };
    }
    if (!this.role) {
      return {
        error: "Role is required",
      };
    }
    return {
      user: this,
    };
  }
}

export default User;
