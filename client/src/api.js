import axios from "axios";
import trike from "trike";


class Api {
  constructor(apiURL) {
    console.log(apiURL)
    this.api = axios.create({
      baseURL: `${apiURL}/api/`
    });
  }

  login = (username, password) =>
    this.api
      .post("user/login", { username: username, password: password })
      .then(({ data }) => {
        if (data.error) throw data.error;
        return data;
      });

  logout = () =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        resolve();
      })
    );

  getTableData = (ids) => {
    const [err, token] = trike(() => localStorage.getItem("token"));

    if (err) {
      localStorage.removeItem("token");
      return Promise.reject(err);
    }
    return this.api
      .post("bwms/", {
        ids: JSON.stringify(ids)
      },{
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
export default new Api(process.env.NODE_ENV === 'production' ? process.env.CURRENT_SITE : "http://localhost:5000");
