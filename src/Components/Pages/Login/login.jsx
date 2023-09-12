import React, { useState, useContext } from 'react';
import styles from './login.module.css';
import cookies from '../../Others/Cookies/cookies';
import Spinner from '../../Others/Spinner/spinner';

function Login() {
    
    const cookie = cookies.get('token');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [error, setError] = useState(false);

    const submitHandler = async (event) => {
        event.preventDefault();
        setSpinner(true);
    
        await fetch('https://bes-care-server.onrender.com/admin-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(res => res.json()).then(data => {
            console.log(data);
            if (data.status === 'success'){
                cookies.set('token', data.data);
                setSpinner(false);
                return window.location.assign('/welcome');
            }
            else {
                setSpinner(false);
                setError(true);
            }
        }).catch(err => console.log(err));
    }

    const errorMsg = <div className={styles.errorMsgContainer}>
        <h4 className={styles.errorMsgH4}>Something went wrong</h4>
        <p>Please try again</p>
        <button className={styles.errorMsgBtn} onClick={() => setError(false)}>Ok</button>
    </div>

    if (cookie !== undefined) return window.location.href = '/welcome';

    return (
        <>
        <Spinner spinner={spinner} />
        <div className={styles.errorMsg} style={error ? {display: 'flex'} : {display: 'none'}}>
            {errorMsg}
        </div>
        <section className={styles.loginContainerMain}>
            <div className={styles.loginContainer}>
                <h4 className={styles.loginH4}>Please login to continue</h4>
                <form className={styles.loginForm} onSubmit={submitHandler}>
                    <fieldset className={styles.formInputContainer}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input type="email"
                            className={styles.input}
                            placeholder="Email address"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}/>
                    </fieldset>
                    <fieldset className={styles.formInputContainer}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input type="password"
                            className={styles.input}
                            placeholder="Password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}/>
                    </fieldset>
                    <input disabled={!email || !password} type="submit" value="Login" className={styles.loginBtn} id="login-btn"/>
                </form>
            </div>
        </section>
        </>
    )
}

export default Login
