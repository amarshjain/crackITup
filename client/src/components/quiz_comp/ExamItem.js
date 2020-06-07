import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {removeExam, subscribe} from '../../actions/exam';

const ExamItem = ({auth, removeExam, subscribe, exam: {_id, field, dateOfConduct, from ,to, mmarks}}) => {

  var subscribed = false;
  if(auth.user !== null){
    auth.user.exams.map(exam => exam._id).forEach(id => {
      if(id == _id) subscribed = true
    });
  }

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

              {auth.isAuthenticated && !auth.loading ?
              
                  (subscribed ?
                    
                    (<button
                  type="button"
                  class="btnexam btn-light"
                  disabled={subscribed}><i class="fas fa-cloud-download-alt"></i>
                  Subscribed
                  </button>) : 

                  (<button onClick={e => subscribe(_id)}
                  type="button"
                  class="btnexam btn-danger"
                  disabled={subscribed}><i class="fas fa-cloud-download-alt"></i>
                  Subscribe
                  </button>))  
              
                     : null}

                {auth.isAuthenticated && auth.user.admin ?
                 (<Link to={`/edit-exam-info/${_id}`} class="btnexam btn-primary"><i class="fas fa-pen-square"></i> Edit Exam Info</Link>
                    ) : null}

                {auth.isAuthenticated && auth.user.admin ?
                 (<Link to={`/edit-exam/${_id}`} class="btnexam btn-success"><i class="fas fa-pen-square"></i> Add Questions </Link>
                    ) : null}
                
                {auth.isAuthenticated && auth.user.admin ?
                 (<button onClick={e => removeExam(_id)}
                 type="button"
                 class="btnexam btn-danger"> <i class="fas fa-times"></i>
                 </button>) : null}


            </div>
            <div>
              <ul>
                <li class="badge badge-primary">MMarks: {mmarks}</li>
              </ul>
            </div>
          </div>
    )
}

ExamItem.propTypes = {
    auth: PropTypes.object.isRequired,
    exam: PropTypes.object.isRequired,
    removeExam: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
  }

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {removeExam, subscribe})(ExamItem)
