import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    // $(function(){
    //     var link = $("nav a");
    //    //click handler
    //     link.on("click" , function(){
    //       var $this = $(this);
    //       var page = $this.data("page");
                        
    //       $("body").removeClass().addClass(page);
    //       link.removeClass("active");
    //       $this.addClass("active");
    //     })
    //   });
    


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
            <Link data-page="exams" className="" onClick={handleClick} to="/">Exams</Link>
            <Link data-page="clients" className="" onClick={handleClick} to="/contactus">Contact Us</Link>
            <Link data-page="login" className="" onClick={handleClick} to="/login">Login</Link>
            <Link data-page="register" className="" onClick={handleClick} to="/register">Register</Link>

        </nav> 
    )
}



export default Navbar;