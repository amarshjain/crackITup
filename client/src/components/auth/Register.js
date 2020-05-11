import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import PropTypes from 'prop-types'



const Register = ({setAlert}) => {

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
            setAlert('Passwords do not match', 'warning');
        } else {
            setAlert('SUCCESS');

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

Register.propTypes = {
    setAlert: PropTypes.func.isRequired
}

export default connect(null, {setAlert})(Register);
