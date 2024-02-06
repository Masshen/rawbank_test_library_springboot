import { isEmpty } from "lodash";
import http from "./authConfig";

const TOKEN = "librar_token";
const REFRESH_TOKEN = "library_refresh_token";
const LOGIN = "library_login";

class AuthApi {
  async refreshToken() {
    const refresh_token = await this.getRefreshToken();
    let rep = false;
    if (refresh_token) {
      await http
        .post("/auth/refresh", { refresh_token })
        .then((response) => response.data)
        .then((response) => {
          if (response.token) {
            rep = true;
            localStorage.setItem(TOKEN, response.token);
            localStorage.setItem(REFRESH_TOKEN, response.refresh_token);
          }
        })
        .catch((e) => console.warn("Error", e));
    }
    return rep;
  }

  async logout() {
    await localStorage.removeItem(TOKEN);
    await localStorage.removeItem(REFRESH_TOKEN);
  }

  async getToken() {
    return await localStorage.getItem(TOKEN);
  }

  async getRefreshToken() {
    return await localStorage.getItem(REFRESH_TOKEN);
  }

  setToken(value: string) {
    localStorage.setItem(TOKEN, value);
  }
  setLogin(data: any) {
    localStorage.setItem(LOGIN, JSON.stringify(data));
  }

  async relogin() {
    let value = false;
    const user: string | null = localStorage.getItem(LOGIN);
    if (!isEmpty(user)) {
      const data = JSON.parse(user ?? "");
    }
    return value;
  }
}

export default new AuthApi();
