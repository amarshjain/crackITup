import React, {Fragment, useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {getExam, addQue} from '../../actions/exam';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import EditExamItem from './EditExamItem';

const EditExam = ({getExam, addQue, match, exam: {exam, loading}, auth: {isAuthenticated, user}}) => {

    useEffect(() => {
        getExam(match.params.id);
    }, [getExam]);

    const [formData, setFormdata] = useState({
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correct: '',
        marks: ''
    });

    const {
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correct,
        marks
    } = formData;

    const onChange = e => setFormdata({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        const que = question;
        const ans = correct;
        const opts = [];
        opts.push(formData.optionA);
        opts.push(formData.optionB);
        opts.push(formData.optionC);
        opts.push(formData.optionD);
        addQue(match.params.id ,{que, opts, ans, marks});
        setFormdata({
            question: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            correct: '',
            marks: ''
        });
        

    } 

    return (

        <Fragment>
            {exam === null || loading ? <Spinner /> : (<Fragment>

            {isAuthenticated && user.admin ? 

            (<Fragment>
            <form id="form" onSubmit={e => onSubmit(e)} data-parsley-validate>
            <h1>{exam.field}</h1>
            <br />

                <div>
                    {exam.ques.map(que => (
                    <EditExamItem key={que.id} que={que} exam={exam} />
                    ))}
                </div>
                

            <br />
            <h1>Add Questions:</h1>

            <fieldset>
                        <label>Question:</label>
                        <textarea name="question" value={question} onChange={e => onChange(e)} class="floatlabel"  placeholder="Question" required data-parsley-no-focus data-parsley-error-message="Please enter a message." ></textarea>
                </fieldset>
                <br />
                <fieldset>
                    <label>Option A:</label>
                        <input name="optionA" value={optionA} onChange={e => onChange(e)} class="floatlabel" id="name" type="text" placeholder="Option A" required data-parsley-no-focus data-parsley-error-message="All the Options are required." />
                    </fieldset>
                    <br />
                    <fieldset>
                    <label>Option B:</label>
                        <input name="optionB" value={optionB} onChange={e => onChange(e)} class="floatlabel" id="name" type="text" placeholder="Option B" required data-parsley-no-focus data-parsley-error-message="All the Options are required." />
                    </fieldset>
                    <br />
                    <fieldset>
                    <label>Option C:</label>
                        <input name="optionC" value={optionC} onChange={e => onChange(e)} class="floatlabel" id="name" type="text" placeholder="Option C" required data-parsley-no-focus data-parsley-error-message="All the Options are required." />
                    </fieldset>
                    <br />
                    <fieldset>
                    <label>Option D:</label>
                        <input name="optionD" value={optionD} onChange={e => onChange(e)} class="floatlabel" id="name" type="text" placeholder="Option D" required data-parsley-no-focus data-parsley-error-message="All the Options are required." />
                    </fieldset>
                    <br />
                    <fieldset>
                    <label>Correct Option:</label>
                        <input name="correct" value={correct} onChange={e => onChange(e)} class="floatlabel" id="name" type="text" placeholder="Correct Option" required data-parsley-no-focus data-parsley-error-message="All the Options are required." />
                    </fieldset>
                    <br />

                    <fieldset>
                    <label>Marks:</label>
                        <input name="marks" value={marks} onChange={e => onChange(e)} class="floatlabel" id="name" type="text" placeholder="Marks associated with this question" required data-parsley-no-focus data-parsley-error-message="Marks for question are required." />
                    </fieldset>
                    <br />
                    
            <fieldset>
                    <input type="submit" className="btnexam btn-success" value="Add Question" />
                    <br />
            </fieldset>

                <Link to="/exams" className="btn btn-success"><i class="fas fa-thumbs-up"></i> Done </Link>
                        
                        <br />

            </form>


             
            </Fragment>)
 : null}

        </Fragment>)}

        </Fragment>

        
    )
}

EditExam.propTypes = {
    auth: PropTypes.object.isRequired,
    getExam: PropTypes.func.isRequired,
    addQue: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    exam: state.exam
})

export default connect(mapStateToProps, {getExam, addQue})(EditExam);
