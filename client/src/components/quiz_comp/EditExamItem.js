import React, {Fragment, useState, useEffect} from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';
import {deleteQue, editQue} from '../../actions/exam';
import {connect} from 'react-redux';

// Text Editor
import * as Showdown from "showdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";


const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });



const EditExamItem = ({que, exam, auth, deleteQue, editQue, history}) => {

    const [selectedTab, setSelectedTab] = React.useState("write");

    let [formData, setFormdata] = useState({
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correct: '',
        marks: ''
    });

    let [question, setQuestion] = useState('');

    let queId = que._id;
    const modal = `#openModal-about ${exam._id}/${que._id}`
    const modalId = `openModal-about ${exam._id}/${que._id}`

    useEffect(() => {

        setQuestion(que.que)
        
        setFormdata({
            optionA: que.opts[0],
            optionB: que.opts[1],
            optionC: que.opts[2],
            optionD: que.opts[3],
            correct: que.ans,
            marks: que.marks
        })
    }, []);

    const {
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
        history.push(`/edit-exam/${exam._id}#close`);
        let que = question;
        const ans = correct;
        const opts = [];
        opts.push(formData.optionA);
        opts.push(formData.optionB);
        opts.push(formData.optionC);
        opts.push(formData.optionD);
        console.log(queId)
        editQue(exam._id, queId, {que, opts, ans, marks});        
    } 

    return (
        <Fragment>
            <div class="profile-github">
                <div class="repo bg-white p-1 my-1">
                    <div>
                                <ReactMde
                                    value={que.que}
                                    selectedTab={"preview"}
                                    readOnly={true}
                                    generateMarkdownPreview={markdown =>
                                        Promise.resolve(converter.makeHtml(markdown))
                                    }
                                />
                    {/* <div id="question" dangerouslySetInnerHTML= {{__html: converter.makeHtml(que.que)}} /> */}
                        
                    <br /><p>A. {que.opts[0]}</p>
                    <br /><p>B. {que.opts[1]}</p>
                    <br /><p>C. {que.opts[2]}</p>
                    <br /><p>D. {que.opts[3]}</p>
                    <br /><p className="badge badge-primary">Correct Option: {que.ans}</p><br />

                    {auth.isAuthenticated && auth.user.admin ?
                 (<a
                    href={modal}
                    type="button"
                    class="btnexam btn-primary"> 
                    Edit
                    </a>) : null}


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

            <div id={modalId} class="modalDialog">
              <div>
                <a href="#close" title="Close" class="close">X</a>

                <br />

                <form id="form" onSubmit={e => onSubmit(e)} data-parsley-validate>
    
                    <br />
                    <h1>Edit Question:</h1>

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
                                <input name="marks" value={marks} onChange={e => onChange(e)} class="floatlabel" id="name" type="number" placeholder="Marks associated with this question" required data-parsley-no-focus data-parsley-error-message="Marks for question are required." />
                            </fieldset>
                            <br />
                            
                    <fieldset>
                            <input type="submit" className="btnexam btn-success" value="Update Question" />
                            <br />
                    </fieldset>
                                
                                <br />

                    </form>

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
    editQue: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deleteQue, editQue})(withRouter(EditExamItem))
