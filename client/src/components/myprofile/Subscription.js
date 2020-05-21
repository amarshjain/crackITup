import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/auth';
import Moment from 'react-moment';
import { delete_subs } from '../../actions/exam';
import Countdown from './Countdown';

const Subscription = ({delete_subs, loadUser, auth, exam: {_id, field, dateOfConduct, from ,to, mmarks}}) => {

    useEffect(() => {
      loadUser();
    }, [loadUser])

    const dateObj = new Date(dateOfConduct);
    var dateAndTime = `${dateObj.getUTCFullYear()}-0${dateObj.getUTCMonth() + 1}-${dateObj.getUTCDate()}T${from}`;

    if(new Date(dateAndTime) == "Invalid Date"){
        dateAndTime = `${dateObj.getUTCFullYear()}-${dateObj.getUTCMonth() + 1}-${dateObj.getUTCDate()}T${from}`;

    }

  //   {dateObj.getUTCMonth() + 1 > 9 ?
  //     dateAndTime = `${dateObj.getUTCFullYear()}-${dateObj.getUTCMonth() + 1}-${dateObj.getUTCDate()}T${from}`
  //     :
  //     dateAndTime = `${dateObj.getUTCFullYear()}-0${dateObj.getUTCMonth() + 1}-${dateObj.getUTCDate()}T${from}`
  // }
    

    return (

          <div class="repo bg-white p-1 my-1">
            <div>
              <h2 className="lead"><a href="#" target="_blank"
                  rel="noopener noreferrer">{field}</a></h2>
              <p>
    Date Of Conduct: <Moment format='DD/MM/YYYY'>{dateOfConduct}</Moment>
              </p>
                <br />
              <p>
                {from}{" "}-{" "}{to}
              </p><br />

              

              {auth.isAuthenticated && !auth.loading ?
              
              (     <Countdown dateAndTime={dateAndTime} examId={_id}/>    )
                    
                     : null}

                {/* {auth.isAuthenticated && auth.user.admin ?
                 (<Link to={`/edit-exam/${_id}`} class="btnexam btn-primary"><i class="fas fa-pen-square"></i> Edit </Link>
                    ) : null} */}


            </div>
            <div>
              <ul>
              {auth.isAuthenticated ?
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
