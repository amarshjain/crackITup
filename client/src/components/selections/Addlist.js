import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import AddlistItem from './AddlistItem'
import {getExams} from '../../actions/exam'

const Exams = ({getExams, exams: {exams, loading}}) => {

    useEffect(() => {
        getExams();
    }, [getExams])

    return ( loading ? <Spinner /> : (
        <Fragment>
            <h1 class="lead my-1">
          <i class="fas fa-book-open"></i> Select Exam To Publish Selection List:
          </h1><br />
          <div class="profile-github">
            
            {exams.map(exam => (
                <AddlistItem key={exam._id} exam={exam} />
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
