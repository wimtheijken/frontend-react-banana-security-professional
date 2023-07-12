import React, {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import {checkTokenValidity} from "../helper/checkTokenValidity";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const [auth, toggleAuth] = useState({
    isAuth: false,
    user: null,
    secret: null,
    status: "pending"
  });
  console.log(auth.isAuth)

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken && checkTokenValidity(storedToken)) {
      void login(storedToken)
    } else {
      void logout()
    }
  }, [])

  async function login(jwt_token, redirect) {
    const decodedToken = jwt_decode(jwt_token);
    localStorage.setItem('token', jwt_token);
    console.log(decodedToken)
    try {
      const {
        data: {
          email,
          username,
          id
        }
      } = await axios.get(`http://localhost:3000/600/users/${decodedToken.sub}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt_token}`
        }
      })

      const {
        data: {
          title,
          content
      }
      } = await axios.get(`http://localhost:3000/660/private-content`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt_token}`
        }
      })

      toggleAuth({
        ...auth,
        isAuth: true,
        user: {
          email,
          username,
          id
        },
        secret: {
          title,
          content
        },
        status: "done"
      })
      console.log(title)
      console.log('De gebruiker is ingelogd!')
      if (redirect) navigate(redirect);
    } catch (e) {
      console.error(e)
    }
  }

  function logout() {
    localStorage.removeItem('token');
    toggleAuth({
      ...auth,
      isAuth: false,
      user: null,
      secret: null,
      status: "done"
    })
    console.log('De gebruiker is uitgelogd!')
    navigate('/')
  }

  const data = {
    isAuth: auth.isAuth,
    user: auth.user,
    secret: auth.secret,
    logout: logout,
    login: login
  };

  return (
      <AuthContext.Provider value={data}>
        {auth.status === "done" ? children : <p>loading...</p>}
      </AuthContext.Provider>
  );
}

export default AuthContextProvider;