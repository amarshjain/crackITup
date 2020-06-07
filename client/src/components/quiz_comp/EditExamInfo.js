import React, { Fragment, useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {editExam, getExam} from '../../actions/exam';
import Spinner from '../layout/Spinner'
import Footer from '../layout/Footer'


const EditExamInfo = ({editExam, getExam, exam: {loading, exam}, match, history}) => {

    const [formData, setFormData] = useState({
        field: '',
        dateOfConduct: '',
        from: '',
        to: '',
        mmarks: 0
    });
    
    useEffect(() => {
        getExam(match.params.id);


        if(exam !== null){
            setFormData({
            field: loading || !exam.field ? '' : exam.field,
            dateOfConduct: loading || !exam.dateOfConduct ? '' : exam.dateOfConduct.split("T")[0],
            from: loading || !exam.from ? '' : exam.from,
            to: loading || !exam.to ? '' : exam.to,
            mmarks: loading || !exam.mmarks ? '' : exam.mmarks
        })
        }
        
    }, [loading, getExam])

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
        editExam(formData, exam._id);
        // history.push('/exams');
    }
    
    return (
        <Fragment>
            {loading || exam === null ? <Spinner /> : 
            <form id="form" onSubmit = {e => onSubmit(e)} data-parsley-validate>

                <h1>Edit Exam Info</h1>
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
            }
            
            <Footer />
        </Fragment>
    )
}

EditExamInfo.propTypes = {
    editExam: PropTypes.func.isRequired,
    getExam: PropTypes.func.isRequired,
    exam: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    exam: state.exam
})

export default connect(mapStateToProps, {editExam, getExam})(withRouter(EditExamInfo));
