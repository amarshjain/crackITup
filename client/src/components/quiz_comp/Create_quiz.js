import React, { Fragment, useState } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {createExam} from '../../actions/exam';
import Footer from '../layout/Footer'


const Create_quiz = ({createExam, history}) => {

    const [formData, setFormData] = useState({
        field: '',
        dateOfConduct: '',
        from: '',
        to: '',
        mmarks: 0
    });

    const {
        field,
        dateOfConduct,
        from,
        to,
        mmarks
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        createExam(formData);
        history.push('/exams');
    }
    
    return (
        <Fragment>
            <form id="form" onSubmit = {e => onSubmit(e)} data-parsley-validate>

                <h1>Please fill some info about exam...</h1>
                <br />
                <fieldset>
                    <label>Field:</label>
                        <input value={field} onChange={e => onChange(e)} name="field" class="floatlabel" id="name" type="text" placeholder="Field (e.g. Web Development, Machine Learning...)" required data-parsley-no-focus data-parsley-error-message="Please enter Field of exam." />
                    </fieldset>
                    <br />
                <fieldset>
                    <label>Date of conduct:</label>
                    <input value={dateOfConduct} onChange={e => onChange(e)} name="dateOfConduct" class="floatlabel" type="date" placeholder="Date of Conduct" required data-parsley-no-focus data-parsley-error-message="Please enter date of examination." />             
                    </fieldset>
                    <br />
                    <fieldset>
                    <label>Start Time:</label>
                        <input value={from} onChange={e => onChange(e)} name="from" class="floatlabel" type="time" placeholder="from (time)" required data-parsley-no-focus data-parsley-error-message="Please enter satrt time of examination." />
                    </fieldset>
                    <br />
                    <fieldset>
                    <label>End Time:</label>
                        <input value={to} onChange={e => onChange(e)} name="to" class="floatlabel" type="time" placeholder="to (time)" required data-parsley-no-focus data-parsley-error-message="Please enter end time of exam." />
                    </fieldset>
                    <br />
                    <fieldset>
                    <label>Maximum Marks:</label>
                        <input value={mmarks} onChange={e => onChange(e)} name="mmarks" class="floatlabel" type="number" placeholder="Maximum Marks" required data-parsley-no-focus data-parsley-error-message="Please enter maximum marks." />
                    </fieldset>
                    <br />

                
                <fieldset>
                            <input type="submit" value="Submit" />
                    </fieldset>
            </form>
            <Footer />
        </Fragment>
    )
}

Create_quiz.propTypes = {
    createExam: PropTypes.func.isRequired,
}

export default connect(null, {createExam})(withRouter(Create_quiz));
