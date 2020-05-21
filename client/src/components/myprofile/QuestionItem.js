import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const QuestionItem = ({que, exam, auth}) => {

    const [formData, setFormdata] = useState({checkedOpt: ''})

    const onChange = e => {
        setFormdata({...formData, checkedOpt: e.target.value});
    }
    
    const handleClick = e => {
        if(e.target.checked) e.target.checked=false;
    }

    return (
        <Fragment>
            <div class="profile-github">
                <div class="repo bg-white p-1 my-1">
                    <div>
                    <h4><a href="#!" target="_blank"
                        rel="noopener noreferrer">Q. {que.que}</a></h4>

                    <br /><p><input type="radio" value='A' checked={formData.checkedOpt === 'A'} onChange={e => onChange(e)} onClick={e => handleClick(e)} /> A. {que.opts[0]}</p>
                    <br /><p><input type="radio" value='B' checked={formData.checkedOpt === 'B'} onChange={e => onChange(e)} onClick={e => handleClick(e)} /> B. {que.opts[1]}</p>
                    <br /><p><input type="radio" value='C' checked={formData.checkedOpt === 'C'} onChange={e => onChange(e)} onClick={e => handleClick(e)} /> C. {que.opts[2]}</p>
                    <br /><p><input type="radio" value='D' checked={formData.checkedOpt === 'D'} onChange={e => onChange(e)} onClick={e => handleClick(e)} /> D. {que.opts[3]}</p>
                    </div>

                    <div>
                    <ul>

                        <li class="badge badge-light">Marks: {que.marks}</li>

                    </ul>
                    </div>
                    
                </div>
            </div>
        </Fragment>
    );
}

QuestionItem.propTypes = {
    que: PropTypes.object.isRequired,
    exam: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(QuestionItem);
