import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/auth';
import Moment from 'react-moment';
import { delete_subs } from '../../actions/exam';
import Countdown from './Countdown';

const Subscription = ({delete_subs, loadUser, auth, exam: {_id, isSubmitted, field, dateOfConduct, from ,to, mmarks}}) => {

    useEffect(() => {
      loadUser();
    }, [loadUser])

    const dateObj = new Date(dateOfConduct);
    var dateAndTime = `${dateObj.getUTCFullYear()}-0${dateObj.getUTCMonth() + 1}-0${dateObj.getUTCDate()}T${from}`;

    if(new Date(dateAndTime) == "Invalid Date"){
        dateAndTime = `${dateObj.getUTCFullYear()}-${dateObj.getUTCMonth() + 1}-${dateObj.getUTCDate()}T${from}`;
        if(new Date(dateAndTime) == "Invalid Date"){
          dateAndTime =`${dateObj.getUTCFullYear()}-${dateObj.getUTCMonth() + 1}-0${dateObj.getUTCDate()}T${from}`;
            if(new Date(dateAndTime) == "Invalid Date"){
              dateAndTime =`${dateObj.getUTCFullYear()}-0${dateObj.getUTCMonth() + 1}-${dateObj.getUTCDate()}T${from}`;
            }
        }

    }

    var today = new Date();
    var currentDate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-0'+today.getDate();

    if(new Date(currentDate) == "Invalid Date"){
      currentDate = `${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}T${from}`;
      if(new Date(currentDate) == "Invalid Date"){
        currentDate =`${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-0${today.getUTCDate()}T${from}`;
          if(new Date(currentDate) == "Invalid Date"){
            currentDate =`${today.getUTCFullYear()}-0${today.getUTCMonth() + 1}-${today.getUTCDate()}T${from}`;
          }
      }

  }
    var currentTime = today.getHours() + ":" + today.getMinutes();
    var currentDateTime = currentDate+'T'+currentTime;
    
    return (

          <div class="repo bg-white p-1 my-1">
            <div>
              <h2 className="lead"><a href="#!"
                  rel="noopener noreferrer">{field}</a></h2>
              <p>
    Date Of Conduct: <Moment format='DD/MM/YYYY'>{dateOfConduct}</Moment>
              </p>
                <br />
              <p>
                {from}{" "}-{" "}{to}
              </p><br />

              

              {auth.isAuthenticated && !auth.loading && !isSubmitted ?
              
              (     <Countdown dateAndTime={dateAndTime} examId={_id}/>    )
                    
                     : 
                     <Link to={`/exam/${_id}`}
                  class="btnexam btn-success"><i class="fas fa-poll"></i> {" "}
                   View Result</Link>
                  }

            </div>
            <div>
              <ul>
              {currentDateTime < dateAndTime ?
                 (<button onClick={e => delete_subs(_id)}
                 type="button"
                 class="btnexam btn-danger"> <i class="fas fa-times"></i>
                 </button>) : null}
                <li class="badge badge-primary">MMarks: {mmarks}</li>
              </ul>
            </div>
          </div>
    )
}

Subscription.propTypes = {
    auth: PropTypes.object.isRequired,
    exam: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
    delete_subs: PropTypes.func.isRequired,

  }

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {loadUser, delete_subs})(Subscription)
