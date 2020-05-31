import React, {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import {getExams} from '../../actions/exam'
import {connect} from 'react-redux'

const Selections = ({auth, getExams, exams: {loading, exams}}) => {

    useEffect(() => {
        getExams();
    }, [getExams])

    return ( loading ? <Spinner /> : (
        <Fragment>
            {auth.isAuthenticated && auth.loading === false && (
                <Link to="/addlist" className='btn btn-success'>
                    Add Selection List
                </Link>
            )}

            <h1 class="lead my-1">
                <i class="fas fa-book-open"></i> Choose Exam :
                </h1><br />
                <div class="profile-github">
                    
                {/* {exams.map(exam => (
                    <ExamItem key={exam._id} exam={exam} />
                ))} */}

                </div>
        </Fragment>
    )
    )
}

Selections.propTypes = {
    auth: PropTypes.object.isRequired,
    exams: PropTypes.object.isRequired,
    getExams: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    exams: state.exam
})

export default connect(mapStateToProps, {getExams})(Selections)
