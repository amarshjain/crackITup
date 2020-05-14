import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

const Navbar = ({ auth: {isAuthenticated, loading}, logout }) => {

    var body = document.querySelector('body');

    const handleClick = event => {
        var els = document.querySelectorAll('a')
        for (var i = 0; i < els.length; i++) {
            els[i].classList.remove('active');
            var allPage = els[i].getAttribute("data-page");
            body.classList.remove(allPage);

          }
          var dataPage = event.target.getAttribute("data-page");
          localStorage.setItem("bodyClass", dataPage);

          body.classList.add(dataPage);
          event.target.classList.add('active')
        
    };


    if(localStorage.getItem("bodyClass")){
            body.classList.add(localStorage.getItem("bodyClass"));

    if(!loading){
            setTimeout(() => {
    const el = document.querySelector(`[data-page=${localStorage.getItem("bodyClass")}]`);
    el.classList.add('active');

    console.log(el);
    }, 500);
    }
    }



    




    return (
        <nav role='navigation'>
            <Link data-page="home" className="" onClick={handleClick} to="/"><i data-page="home" className="fas fa-home"></i> Home</Link>
 
            <Link data-page="exams" className="" onClick={handleClick} to="/exams"><i data-page="exams" class="fas fa-clipboard"></i> Exams</Link>

            {/* { !loading &&
             (<Fragment>{ isAuthenticated ?
                <Link data-page="clients" className="" onClick={handleClick} to="/subscriptions">Subs.</Link> :    
             null 
            }</Fragment>)
            } */}

            { !loading &&
             (<Fragment>{ isAuthenticated ?
                <Link data-page="login" className="" onClick={handleClick} to="/myprofile"><i data-page="login" class="fas fa-user-circle"></i> Profile</Link> :    
             <Link data-page="login" className="" onClick={handleClick} to="/login"><i data-page="login" class="fas fa-sign-in-alt"></i> Login</Link> 
            }</Fragment>)
            }

            { !loading &&
             (<Fragment>{ isAuthenticated ?
                <a className="" onClick={logout} href="#!"><i className="fas fa-sign-out-alt"></i> <span className="hide-sm"></span>Logout</a> :    
                <Link data-page="register" className="" onClick={handleClick} to="/register"><i data-page="register" class="fas fa-user-plus"></i> Register</Link> 
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
});




export default connect(mapStateToProps, {logout})(Navbar);
