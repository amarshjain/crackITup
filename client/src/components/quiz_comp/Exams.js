import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import ExamItem from '../quiz_comp/ExamItem';
import {getExams} from '../../actions/exam';

const Exams = ({getExams, exams: {exams, loading}}) => {

    useEffect(() => {
        getExams();
    }, [getExams])

    return ( loading ? <Spinner /> : (
        <Fragment>
            <h1 class="lead my-1">
          <i class="fas fa-book-open"></i> Upcoming Exams:
          </h1><br />
          <div class="profile-github">
            
            {exams.map(exam => (
                <ExamItem key={exam._id} exam={exam} />
            ))}

            </div>
            
        </Fragment>
    ) )
}

Exams.propTypes = {
    getExams: PropTypes.func.isRequired,
    exams: PropTypes.object.isRequired
}

const  mapStateToProps = state => ({
    exams: state.exam
})

export default connect(mapStateToProps, {getExams})(Exams)
