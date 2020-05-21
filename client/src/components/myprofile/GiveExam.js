import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/auth';
import Countdown from './Countdown';
import QuestionItem from './QuestionItem';
import Spinner from '../layout/Spinner';

const GiveExam = ({auth: {isAuthenticated, loading, user}, loadUser, match}) => {

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    
    const examIndex = loading ? '' : user.exams.map(exam => exam._id).indexOf(match.params.id);
    const exam = loading ? '' : user.exams[examIndex];

    const dateObj = loading  ? '' : new Date(exam.dateOfConduct);
    var dateAndTime = loading  ? '' : `${dateObj.getUTCFullYear()}-0${dateObj.getUTCMonth() + 1}-${dateObj.getUTCDate()}T${exam.to}`;

    if(new Date(dateAndTime) == "Invalid Date"){
        dateAndTime =loading ? '' : `${dateObj.getUTCFullYear()}-${dateObj.getUTCMonth() + 1}-${dateObj.getUTCDate()}T${exam.to}`;

    }

    return (
        <Fragment>
            {loading && user === null ? (<Spinner />) : (
                <div class="profile-github">
                <div class="repo bg-white p-1 my-1">
                <div>
                  <h2 className="lead"><a href="#" target="_blank"
                      rel="noopener noreferrer">{exam.field}</a></h2>
                  <p>
        Date Of Conduct: <Moment format='DD/MM/YYYY'>{exam.dateOfConduct}</Moment>
                  </p>
                    <br />
                  <p>
                    {exam.from}{" "}-{" "}{exam.to}
                  </p><br />
    
            
                  <Countdown dateAndTime={dateAndTime} examId={"123"}/><br />
                        
                  <div class="profile-github">
                  
                        {exam.ques.map(que => (
                        <QuestionItem key={que.id} que={que} exam={exam} />
                        ))}
                    
                    </div>
    
                </div>
                <div>
                  <ul>
                    <li class="badge badge-primary">MMarks: {exam.mmarks}</li>
                  </ul>
                </div>
              </div>
              </div>
            )}
        </Fragment>
    )
}

GiveExam.propTypes = {
    auth: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {loadUser})(GiveExam)
