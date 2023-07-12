import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function Profile() {
    const { isAuth, user, secret } = useContext(AuthContext);
  return (
    <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </section>
      { isAuth ?
      <section>
              <h2>{secret.title}</h2>
              <p>{secret.content}</p>
      </section>
          :
      <section>
          <h2>Strikt geheime profiel-content</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>
      </section>
      }
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;