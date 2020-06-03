import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types';
import {answering} from '../../actions/exam';
import {connect} from 'react-redux';

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
        // const optChosen = ''
        //     answering(examId, que._id, {optChosen});

    }

    // const setNull = e => {
    //     if(e.target.checked) {
    //         const optChosen = ''
    //         answering(examId, que._id, {optChosen});        }
    // }
    
    const onChange = e => {
        setFormdata({...formData, checkedOpt: e.target.value});
        const optChosen = e.target.value
        answering(examId, que._id, {optChosen});
    }
    


    return (
        <Fragment>
                <div class="repo bg-white p-1 my-1">
                    <div>
                    <h4><a href="#!" target="_blank"
                        rel="noopener noreferrer">Q. {que.que}</a></h4>

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
