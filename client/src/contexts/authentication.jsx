import axios from "axios";
import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });

  const nevigate = useNavigate();

  async function register(data, actions) {
    try {
      await axios.post("http://localhost:4000/auth/register", data);
      nevigate("/registersuccess");
    } catch (err) {
      console.log(err);
      actions.setErrors({ email: err.response.data.message });
    }
  }

  async function login(data, actions) {
    console.log(data);
    try {
      const results = await axios.post(
        "http://localhost:4000/auth/login",
        data
      );
      const token = results.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      setState({ ...state, user: userDataFromToken });
      nevigate("/");
    } catch (err) {
      actions.setErrors({ email: err.response.data.message });
      // (err.response.data.message);
      // actions.resetForm();
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setState({ ...state, user: null });
  }

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ state, login, register, logout, isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
