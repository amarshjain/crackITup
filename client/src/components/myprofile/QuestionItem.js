import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types';
import {answering} from '../../actions/exam';
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

const QuestionItem = ({ answering, que, examId, auth, match}) => {

    // answering(exam.id, que.id, '');

    const [formData, setFormdata] = useState({checkedOpt: ''})

    const {checkedOpt} = formData;

    const handleClick = e => {
        if(e.target.checked) {
            // e.target.checked=false;
            setFormdata({...formData, checkedOpt: ''});
            const optChosen = ''
            answering(examId, que._id, {optChosen});
        }

    }

    
    const onChange = e => {
        setFormdata({...formData, checkedOpt: e.target.value});
        const optChosen = e.target.value
        answering(examId, que._id, {optChosen});
    }
    


    return (
        <Fragment>
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
                    <br /><p><input type="radio" value='A' checked={checkedOpt === 'A'} onClick={e => handleClick(e)} onChange={e => onChange(e)} /> A. {que.opts[0]}</p>
                    <br /><p><input type="radio" value='B' checked={checkedOpt === 'B'} onClick={e => handleClick(e)} onChange={e => onChange(e)} /> B. {que.opts[1]}</p>
                    <br /><p><input type="radio" value='C' checked={checkedOpt === 'C'} onClick={e => handleClick(e)} onChange={e => onChange(e)} /> C. {que.opts[2]}</p>
                    <br /><p><input type="radio" value='D' checked={checkedOpt === 'D'} onClick={e => handleClick(e)} onChange={e => onChange(e)} /> D. {que.opts[3]}</p>
                    </div>

                    <div>
                    <ul>

                        <li class="badge badge-light">Marks: {que.marks}</li>

                    </ul>
                    </div>
                    
                </div>
        </Fragment>
    );
}

QuestionItem.propTypes = {
    que: PropTypes.object.isRequired,
    examId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {answering})(QuestionItem);
