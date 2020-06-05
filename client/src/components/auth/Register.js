import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types'
import Footer from '../layout/Footer'




const Register = ({setAlert, register, isAuthenticated}) => {

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
        if(password !== password2){
            setAlert('Passwords do not match', 'warning');
        } else {
            register({name, email, password});

        }

    }

    // Redirect if logged in
    if(isAuthenticated) {
        return <Redirect to="/myprofile" />
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
            <Footer />
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, register})(Register);
