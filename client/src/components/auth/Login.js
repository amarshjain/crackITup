import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';

const Login = () => {
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        console.log("SUCCESS");

    }
    
    return (

    <Fragment>
        <div class="login-page">
            <div class="form">
                
                <form class="login-form" onSubmit={e => onSubmit(e)}>
                <input type="text" value={email} onChange={e => onChange(e)} name='email' placeholder="email address" required/>
                <input type="password" value={password} onChange={e => onChange(e)} name='password' placeholder="password" required/>
                <button>login</button>
                <p class="message">Not registered? <Link to="/register">Create an account</Link></p>
                </form>
            </div>
        </div>
    </Fragment>

    )
}

export default Login;