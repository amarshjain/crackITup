import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

const Navbar = ({ auth: {isAuthenticated, loading, user}, logout }) => {

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
    var el = document.querySelector(`[data-page=${localStorage.getItem("bodyClass")}]`);

    if(el === null){
        el = document.querySelector(`[data-page='home']`);
    }
    el.classList.add('active');

    }, 500);
    }
    }



    




    return (
        <nav role='navigation'>
            <Link data-page="home" className="" onClick={handleClick} to="/"><i data-page="home" className="fas fa-home"></i><span className="hide-sm"> Home</span></Link>
 

            { !loading && user !== null &&
             (<Fragment>{ isAuthenticated ?
                <Link data-page="exams" className="" onClick={handleClick} to="/exams"><i data-page="exams" class="fas fa-clipboard"></i> Exams</Link>
                :    
             null 
            }</Fragment>)
            }

            { !loading && user !== null &&
             (<Fragment>{ isAuthenticated && user.admin ?
                <Link data-page="clients" className="" onClick={handleClick} to="/create-exam"><i data-page="clients" class="fas fa-edit"></i> Create Exam</Link> :    
             null 
            }</Fragment>)
            }

            { !loading && user !== null &&
             (<Fragment>{ isAuthenticated ?
                <Link data-page="register" className="" onClick={handleClick} to="/selections"><i class="fas fa-list-alt"></i> Selections</Link> :    
             null 
            }</Fragment>)
            }

            { !loading &&
             (<Fragment>{ isAuthenticated ?
                <Link data-page="login" className="" onClick={handleClick} to="/myprofile"><i data-page="login" class="fas fa-user-circle"></i> Profile</Link> :    
             <Link data-page="login" className="" onClick={handleClick} to="/login"><i data-page="login" class="fas fa-sign-in-alt"></i> Login</Link> 
            }</Fragment>)
            }

            { !loading &&
             (<Fragment>{ isAuthenticated ?
                <a className="" onClick={logout} href="/login"><i className="fas fa-sign-out-alt"></i> <span className="hide-sm"> Logout</span></a> :    
                <Link data-page="register" className="" onClick={handleClick} to="/register"><i data-page="register" class="fas fa-user-plus"></i><span className="hide-sm">Register</span></Link> 
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
