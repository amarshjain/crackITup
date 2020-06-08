import React, {Fragment, useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {getExam, addQue} from '../../actions/exam';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import EditExamItem from './EditExamItem';

// Text editor
import * as Showdown from "showdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

const EditExam = ({getExam, addQue, match, exam: {exam, loading}, auth: {isAuthenticated, user}}) => {


    const [selectedTab, setSelectedTab] = React.useState("write");

    useEffect(() => {
        getExam(match.params.id);
    }, [getExam]);

    let [formData, setFormdata] = useState({
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correct: '',
        marks: ''
    });

    let [question, setQuestion] = useState('')

    const {
        optionA,
        optionB,
        optionC,
        optionD,
        correct,
        marks
    } = formData;

    const onChange = e => setFormdata({...formData, [e.target.name]: e.target.value});

    // const handleChange = e => setFormdata({...formData, question: e.target.value});

    const onSubmit = e => {

        e.preventDefault();

        // question = question.replace(/(?:\r\n|\r|\n)/g, '<br>');

        let que = question;
        const ans = correct;
        const opts = [];
        opts.push(formData.optionA);
        opts.push(formData.optionB);
        opts.push(formData.optionC);
        opts.push(formData.optionD);
        addQue(match.params.id ,{que, opts, ans, marks});
        setFormdata({
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            correct: '',
            marks: ''
        });
        setQuestion('');
        

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
                        <ReactMde
                            value={question}
                            name="question"
                            onChange={  setQuestion }
                            selectedTab={selectedTab}
                            onTabChange={setSelectedTab}
                            generateMarkdownPreview={markdown =>
                                Promise.resolve(converter.makeHtml(markdown))
                            }
                        />
                        {/* <textarea name="question" value={question} onChange={e => onChange(e)} class="floatlabel"  placeholder="Question" required data-parsley-no-focus data-parsley-error-message="Please enter a message." ></textarea> */}
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
                        {/* <input name="correct" value={correct} onChange={e => onChange(e)} class="floatlabel" id="name" type="text" placeholder="Correct Option" required data-parsley-no-focus data-parsley-error-message="All the Options are required." /> */}
                        <select name="correct" placeholder="Select Correct Option" value={correct} onChange={(e) => onChange(e)}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </select>
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
