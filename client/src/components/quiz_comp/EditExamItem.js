import React, {Fragment} from 'react'
import PropTypes from 'prop-types';
import {deleteQue} from '../../actions/exam';
import {connect} from 'react-redux';

const EditExamItem = ({que, exam, auth, deleteQue}) => {
    return (
        <Fragment>
            <div class="profile-github">
                <div class="repo bg-white p-1 my-1">
                    <div>
                    <h4><a href="#" target="_blank"
                        rel="noopener noreferrer">Q. {que.que}</a></h4>
                    <br /><p>A. {que.opts[0]}</p>
                    <br /><p>B. {que.opts[1]}</p>
                    <br /><p>C. {que.opts[2]}</p>
                    <br /><p>D. {que.opts[3]}</p>
                    <br /><p className="badge badge-primary">Correct Option: {que.ans}</p>
                    </div>

                    <div>
                    <ul>

                        <li class="badge badge-light">Marks: {que.marks}</li>

                    </ul>
                    </div>

                    <div>
                    <ul>

                                {auth.isAuthenticated && auth.user.admin ?
                        (<button
                            onClick={e => deleteQue(exam._id, que._id)}
                        type="button"
                        class="btnexam btn-danger"> <i class="fas fa-times"></i>
                        </button>) : null}

                    </ul>
                    </div>
                    
                </div>
            </div>
        </Fragment>
    );
}

EditExamItem.propTypes = {
    que: PropTypes.object.isRequired,
    exam: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteQue: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deleteQue})(EditExamItem)
