import React, {Fragment} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const EditExam = ({auth: {isAuthenticated, user}}) => {
    return (

        <Fragment>
            {isAuthenticated && user.admin ? 
            (<Fragment>
             <h1>Edit Exam</h1>
            <form id="form" data-parsley-validate>

            <fieldset>
                        <textarea class="floatlabel" placeholder="Question" required data-parsley-no-focus data-parsley-error-message="Please enter a message." ></textarea>
                </fieldset>
            <fieldset>
                        <input type="submit" value="Submit" />
                </fieldset>
            </form>
            </Fragment>)
 : null}

        </Fragment>
    )
}

EditExam.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(EditExam);
