import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';


const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if(password != password2){
            console.log("Passwords dont match");
        } else {
            console.log('SUCCESS');

        }

    }

    return (
        <Fragment>
            <div className="login-page">
                <div className="form">
                    <form className="register-form" onSubmit={e => onSubmit(e)}>
                    <input type="text" value={name} onChange={e => onChange(e)} name='name' placeholder="name" required/>

                    <input type="text" value={email} onChange={e => onChange(e)} name='email' placeholder="email address" required/>

                    <input type="password" value={password} onChange={e => onChange(e)} name='password' placeholder="password" required/>

                    <input type="password" value={password2} onChange={e => onChange(e)} name='password2' placeholder="confirm password" required/>

                    <button>create</button>
                    <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
                    </form>

                </div>
            </div>
        </Fragment>
    )
}

export default Register;
