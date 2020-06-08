import axios from 'axios';
import {setAlert} from './alert';
import {loadUser} from './auth';
import {
    CREATE_EXAM,
    GET_EXAMS,
    GET_EXAM,
    REMOVE_EXAM,
    EXAM_ERROR,
    ADD_QUE,
    DELETE_QUE,
    SUBSCRIBE,
    REMOVE_SUBS,
    ANSWERING,
    SUBMIT_EXAM
} from './types'

// Get Exams
export const getExams = () => async dispatch => {
    try {
        const res = await axios.get('/api/exams');
        dispatch({
            type: GET_EXAMS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: EXAM_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

//Create Exam
export const createExam = formData => async dispatch => {

    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/exams', formData, config);
        dispatch({
            type: CREATE_EXAM,
            payload: res.data
        });

        dispatch(setAlert('Exam Created', 'success'))

    } catch (err) {
        dispatch({
            type: EXAM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });    }

};

// Edit exam
export const editExam = (formData, examId) => async dispatch => {

    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put(`/api/exams/edit/${examId}`, formData, config);
        dispatch({
            type: GET_EXAM,
            payload: res.data
        });

        dispatch(setAlert('Exam Info Updated', 'success'))

    } catch (err) {
        dispatch({
            type: EXAM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });    }

};

//Remove Exam
export const removeExam = id => async dispatch => {
    try {
        await axios.delete(`/api/exams/${id}`);
        dispatch({
            type: REMOVE_EXAM,
            payload: id
        });

        dispatch(setAlert('Exam Removed', 'success'));

    } catch (err) {
        dispatch({
            type: EXAM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get exam
export const getExam = id => async dispatch => {
    try {
        const res = await axios.get(`/api/exams/${id}`);

        dispatch({
            type: GET_EXAM,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type:EXAM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add question
export const addQue = (examId, {que, opts, ans, marks}) => async dispatch => {
    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }

    try {
        
        const res = await axios.put(`/api/exams/${examId}/que`,{que, opts, ans, marks}, config);
        dispatch({
            type: ADD_QUE,
            payload: res.data
        });
        dispatch(setAlert('Question Added', 'success'));

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'warning')));
        }
        dispatch({
            type: EXAM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Edit Question
export const editQue = (examId, que_id, {que, opts, ans, marks}) => async dispatch => {
    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }

    try {
        
        const res = await axios.put(`/api/exams/${examId}/que/${que_id}`,{que, opts, ans, marks}, config);
        dispatch({
            type: GET_EXAM,
            payload: res.data
        });
        dispatch(setAlert('Question Updated', 'success'));

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'warning')));
        }
        dispatch({
            type: EXAM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete question
export const deleteQue = (examId, queId) => async dispatch => {

    try {
        await axios.delete(`/api/exams/${examId}/que/${queId}`);
        dispatch({
            type: DELETE_QUE,
            payload: queId
        });
        dispatch(setAlert('Question Deleted', 'success'));
    } catch (err) {
        dispatch({
            type: EXAM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }

}

// Subscribe an examination
export const subscribe = (examId) => async dispatch => {
    try {
        const res = await axios.put(`/api/exams/${examId}/subs`);
        dispatch({
            type: SUBSCRIBE,
            payload: res.data
        });
        dispatch(loadUser());
        dispatch(setAlert('Exam Subscribed, Please check your PROFILE section...', 'success'));
    } catch (err) {
        dispatch({
            type: EXAM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Remove a subscription
export const delete_subs = (examId) => async dispatch => {
    try {
        await axios.delete(`/api/exams/${examId}/subs`);
        dispatch({
            type: REMOVE_SUBS,
            payload: examId
        });
        dispatch(loadUser());
        dispatch(setAlert('Subscription removed successfully.', 'success'));

    } catch (err) {
        dispatch({
            type: EXAM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add options
export const answering = (examId, queId, {optChosen}) => async dispatch => {
    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }
    
    try {
        const res = await axios.put(`/api/exams/${examId}/${queId}`, {optChosen}, config);
        dispatch({
            type: ANSWERING,
            payload: res.data
        });
        dispatch(loadUser());

    } catch (err) {
        dispatch({
            type: EXAM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Submitting exam
export const submitExam = (examId) => async dispatch => {
    try {
        console.log(examId)
        const res = await axios.put(`/api/exams/${examId}`);
        dispatch({
            type: SUBMIT_EXAM,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: EXAM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}