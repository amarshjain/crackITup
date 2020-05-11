import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common['x-auth-token'] = token
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;




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