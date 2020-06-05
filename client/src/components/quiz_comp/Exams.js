import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import ExamItem from '../quiz_comp/ExamItem';
import {getExams} from '../../actions/exam';
import Footer from '../layout/Footer'


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
            
            {exams.length === 0 ?
                <div class="repo bg-white p-1 my-1">
                <div>
                  <h2 className="lead"><a href="#!"
                      rel="noopener noreferrer">No Upcoming Exams yet...</a></h2>
                </div>
              </div>
                : 
                exams.map(exam => (
                    <ExamItem key={exam._id} exam={exam} />
                ))
              }

            </div>
            <Footer />
            
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
