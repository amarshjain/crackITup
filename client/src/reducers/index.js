import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import exam from './exam';
import selection from './selection';

export default combineReducers({
    alert,
    auth,
    profile,
    exam,
    selection
});