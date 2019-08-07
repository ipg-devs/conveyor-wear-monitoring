import axios from "axios";
import trike from "trike";


class Api {
  constructor(baseUrl) {
    this.api = axios.create({
      baseURL: baseUrl
    });
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
          authorization: `bearer ${ token }`
        }
      })
      .then(res => {
        const { data } = res;

        return data;
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
          authorization: `bearer ${ token }`
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
            authorization: `bearer ${ token }`
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
            authorization: `bearer ${ token }`
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
          authorization: `bearer ${ token }`
        }
      })
      .then(res => res.data);
  };

  createNewSite = (site) => {
    const [err, token] = trike(() => localStorage.getItem("token"));

    if (err) {
      localStorage.removeItem("token");
      return Promise.reject(err);
    }
    return this.api
      .post(
        "site/create",
        { ...site },
        {
          headers: {
            authorization: `bearer ${ token }`
          }
        }
      )
      .then(res => res.data);
  }
}


 // TODO: set BASE_URL in client/package.json
export default new Api(process.env.BASE_URL || "https://ipg-app.herokuapp.com/api/");
