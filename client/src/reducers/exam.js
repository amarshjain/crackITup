import {GET_EXAMS, GET_EXAM, CREATE_EXAM, REMOVE_EXAM, EXAM_ERROR} from '../actions/types';

const initialState = {
    exams: [],
    exam: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {

    const {type, payload} = action;

    switch(type) {
        case GET_EXAMS:
            return {
                ...state,
                exams: payload,
                loading: false
            }

        case GET_EXAM:
            return {
                ...state,
                exam: payload,
                loading: false
            }

        case CREATE_EXAM:
            return {
                ...state,
                exams: [payload, ...state.exams],
                loading: false
            }

        case REMOVE_EXAM:
            return {
                ...state,
                exams: state.exams.filter(exam => exam._id !== payload),
                loading: false
            }

        case EXAM_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default:
            return state;

    }

}