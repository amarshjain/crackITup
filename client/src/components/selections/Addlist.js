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

          {exams.length === 0 ?
                <div class="repo bg-white p-1 my-1">
                <div>
                  <h2 className="lead"><a href="#" target="_blank"
                      rel="noopener noreferrer">Please Create Exam Before Releasing a selection List</a></h2>
                </div>
              </div>
                : 
                exams.map(exam => (
                    <AddlistItem key={exam._id} exam={exam} />
                ))
              }

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
