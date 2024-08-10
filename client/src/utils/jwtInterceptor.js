import axios from "axios";

function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    const hasToken = Boolean(localStorage.getItem("token"));

    if (hasToken) {
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
    }
    return req;
  });

  axios.interceptors.response.use(
    (req) => {
      return req;
    },
    (err) => {
      if (
        err.response.status === 401 &&
        err.response.statusText === "Unauthorized"
      ) {
        localStorage.removeItem("token");
        // if (navigate) {
        //   navigate("/login");
        // } else {
        //   window.location.href = "/login";
        // }
        console.log(window.location.pathname);
        const newPath = "/login";
        window.location.replace(newPath);
      }
      return Promise.reject(err);
    }
  );
}

export default jwtInterceptor;
