import axios from 'axios';
import {setAlert} from './alert';
import {
    CREATE_EXAM,
    GET_EXAMS,
    GET_EXAM,
    REMOVE_EXAM,
    EXAM_ERROR
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
        console.log(res.data)
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