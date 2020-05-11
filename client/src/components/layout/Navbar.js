import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

const Navbar = ({ auth: {isAuthenticated, loading}, logout }) => {

    const handleClick = event => {
        var els = document.querySelectorAll('a')
        var body = document.querySelector('body');
        for (var i = 0; i < els.length; i++) {
            els[i].classList.remove('active');
            var allPage = els[i].getAttribute("data-page");
            body.classList.remove(allPage);

          }
          var dataPage = event.target.getAttribute("data-page");
          body.classList.add(dataPage);
          event.target.classList.add('active')
        
    };



    return (
        <nav role='navigation'>
            <Link data-page="home" className="active" onClick={handleClick} to="/">Home</Link>
 
            <Link data-page="exams" className="" onClick={handleClick} to="/exams">Exams</Link>

            { !loading &&
             (<Fragment>{ isAuthenticated ?
                <Link data-page="clients" className="" onClick={handleClick} to="/subscriptions">Subscriptions</Link> :    
             null 
            }</Fragment>)
            }

            { !loading &&
             (<Fragment>{ isAuthenticated ?
                <Link data-page="login" className="" onClick={handleClick} to="/myprofile">My Profile</Link> :    
             <Link data-page="login" className="" onClick={handleClick} to="/login">Login</Link> 
            }</Fragment>)
            }

            { !loading &&
             (<Fragment>{ isAuthenticated ?
                <a className="" onClick={logout} href="#!"><i className="fas fa-sign-out-alt"></i> <span className="hide-sm"></span>Logout</a> :    
                <Link data-page="register" className="" onClick={handleClick} to="/register">Register</Link> 
            }</Fragment>)
            }

 {/* <Link data-page="clients" className="" onClick={handleClick} to="/contactus">Contact Us</Link> */}


        </nav> 
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar);