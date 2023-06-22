import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from "axios";

function SignIn() {
    const [ email, setEmail ] = useState( "" )
    const [ password, setPassword ] = useState( "" )
    const { login } = useContext(AuthContext);

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    async function handleFormSubmit(e) {
        e.preventDefault()
        toggleError(false);
        toggleLoading(true);
        try {
            const res = await axios.post('http://localhost:3000/login',{
                email: email,
                password: password,
            })
            login(res.data.accessToken, '/profile');
            console.log(res)
        } catch (e) {
            console.error(e)
            toggleError(true);
        }
        toggleLoading(false);
    }

  return (
    <>
        {loading && <p>Loading....</p>}
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

        <form onSubmit={handleFormSubmit}>
            <input
                placeholder="Email"
                type="email"
                id="email-field"
                name="email"
                value={ email }
                onChange={ e => setEmail( e.target.value ) }/>
            <input
                placeholder="Password"
                type="password"
                id="password-field"
                name="password"
                value={ password }
                onChange={ e => setPassword( e.target.value ) }/>
            {error && <p className="error">Uw emailadres en/of wachtwoord is onjuist. Probeer opnieuw.</p>}
            <button type="submit">Login</button>
        </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;