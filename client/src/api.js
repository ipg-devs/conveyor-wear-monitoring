import axios from "axios";
import trike from "trike";

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: "https://5000.pink-shrimp-90.telebit.io/api/"
    }); // TODO: need to make this a env var?
  }

  login = (username, password) =>
    this.api
      .post("user/login", { username: username, password: password })
      .then(({ data }) => {
        if (data.error) throw data;
        return data;
      });

  logout = () =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        resolve(true);
      }, 1000)
    );

  getTableData = () => {
    const [err, token] = trike(() => localStorage.getItem("token"));

    if (err) {
      localStorage.removeItem("token");
      return Promise.reject(err);
    }

    return this.api
      .get("bwms/", {
        headers: {
          authorization: `bearer ${token}`
        }
      })
      .then(res => {
        const { data } = res;

        return {
          columns: Object.keys(data[0]),
          rows: data
        };
      });
  };

  getAllUsers = () => {
    const [err, token] = trike(() => localStorage.getItem("token"));

    if (err) {
      localStorage.removeItem("token");
      return Promise.reject(err);
    }

    return this.api
      .get("user/", {
        headers: {
          authorization: `bearer ${token}`
        }
      })
      .then(res => res.data);
  };

  createNewUser = user => {
    const [err, token] = trike(() => localStorage.getItem("token"));

    if (err) {
      localStorage.removeItem("token");
      return Promise.reject(err);
    }

    return this.api
      .post(
        "user/create",
        { ...user },
        {
          headers: {
            authorization: `bearer ${token}`
          }
        }
      )
      .then(res => res.data);
  };

  updateUserPassword = ({ username, newPassword }) => {
    const [err, token] = trike(() => localStorage.getItem("token"));

    if (err) {
      localStorage.removeItem("token");
      return Promise.reject(err);
    }

    return this.api
      .post(
        "user/update-password",
        { username, newPassword },
        {
          headers: {
            authorization: `bearer ${token}`
          }
        }
      )
      .then(res => res.data);
  };

  getAllSites = () => {
    const [err, token] = trike(() => localStorage.getItem("token"));

    if (err) {
      localStorage.removeItem("token");
      return Promise.reject(err);
    }

    return this.api
      .get("site", {
        headers: {
          authorization: `bearer ${token}`
        }
      })
      .then(res => res.data);
  };
}

export default new Api();
