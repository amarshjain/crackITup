import React, { Fragment, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';
import Footer from '../layout/Footer'


const Login = ({ login, isAuthenticated }) => {
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    }

    // Redirect if logged in
    if(isAuthenticated) {
        return <Redirect to="/myprofile" />
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
        <Footer />
    </Fragment>

    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);