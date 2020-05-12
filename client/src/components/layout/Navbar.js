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
            <Link data-page="home" className="active" onClick={handleClick} to="/"><i class="fas fa-home"></i> Home</Link>
 
            <Link data-page="exams" className="" onClick={handleClick} to="/exams"><i class="fas fa-clipboard"></i> Exams</Link>

            {/* { !loading &&
             (<Fragment>{ isAuthenticated ?
                <Link data-page="clients" className="" onClick={handleClick} to="/subscriptions">Subs.</Link> :    
             null 
            }</Fragment>)
            } */}

            { !loading &&
             (<Fragment>{ isAuthenticated ?
                <Link data-page="login" className="" onClick={handleClick} to="/myprofile"><i class="fas fa-user-circle"></i> Profile</Link> :    
             <Link data-page="login" className="" onClick={handleClick} to="/login"><i class="fas fa-sign-in-alt"></i> Login</Link> 
            }</Fragment>)
            }

            { !loading &&
             (<Fragment>{ isAuthenticated ?
                <a className="" onClick={logout} href="#!"><i className="fas fa-sign-out-alt"></i> <span className="hide-sm"></span>Logout</a> :    
                <Link data-page="register" className="" onClick={handleClick} to="/register"><i class="fas fa-user-plus"></i> Register</Link> 
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