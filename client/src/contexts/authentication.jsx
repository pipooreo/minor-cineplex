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
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/register`,
        data
      );
      nevigate("/registersuccess");
    } catch (err) {
      console.log(err);
      actions.setErrors({ email: err.response.data.message });
    }
  }

  async function login(data, actions) {
    try {
      actions.setErrors({ notice: false });
      const results = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        data
      );
      const token = results.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      setState({ ...state, user: userDataFromToken });
      nevigate("/");
    } catch (err) {
      err = err.response.data.message;
      // console.log(err);
      if (err.includes("Email")) {
        actions.setErrors({ email: err });
      }
      if (err.includes("Password")) {
        actions.setErrors({ password: err });
      } else {
        console.log(err);
      }
    }
  }

  async function requestResetPassword(data, actions) {
    // console.log(data);

    try {
      const results = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/request-reset-password`,
        data
      );
      return results;
    } catch (err) {
      // console.log(err);
      actions.setErrors({ email: err.response.data.message });
      // (err.response.data.message);
      // actions.resetForm();
    }
  }

  async function resetPassword(data, actions) {
    // console.log(data);

    try {
      const results = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/reset-password`,
        data
      );
      nevigate("/login");
    } catch (err) {
      // console.log(err);
      err = err.response.data.message;
      if (err.includes("OTP")) actions.setErrors({ otp: err });
      // err.response.data.message;
      // actions.resetForm();
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setState({ ...state, user: null });
    nevigate("/");
  }

  async function updateProfile(data, actions) {
    try {
      const result = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/auth/update-profile`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // actions.setFieldValue("success", true);
      // console.log(result);
      // result = { status: 500 };
      return result;
      // nevigate("/registersuccess");
    } catch (err) {
      console.log(err);
      actions.setErrors({ email: err.response.data.message });
      return err;
    }
  }

  async function updatePassword(data, actions) {
    // console.log(data);
    try {
      const result = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/auth/update-password`,
        data
      );
      return result;
      // nevigate("/registersuccess");
    } catch (err) {
      console.log(err);
      // actions.setErrors({ email: err.response.data.message });
    }
  }

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        register,
        logout,
        requestResetPassword,
        resetPassword,
        updateProfile,
        updatePassword,
        isAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
