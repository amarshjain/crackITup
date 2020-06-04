import React, {useState, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createProfile} from '../../actions/profile';

const CreateProfile = ({createProfile, history}) => {
    const [formData, setFormData] = useState({
        field: '',
        branch: '',
        admno: '',
        phno: ''
    });

    const {
        field,
        branch,
        admno,
        phno
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history)
    }

    return (
        <Fragment>

<form action="#" onSubmit = {e => onSubmit(e)}>
  <h1 className="lead">

    <br />
  </h1>
  
  <div className="float-label">
    <input type="text" value={field} onChange={e => onChange(e)} placeholder="Field (e.g. Web Development, Machine Learning....)" name="field" id="email" />
    
  </div>
  
  <div className="float-label">
    <input type="text" value={branch} onChange={e => onChange(e)} placeholder="Branch" name="branch" id="f-name" />
  </div>
  
  <div className="float-label">
    <input type="text" value={admno} onChange={e => onChange(e)} placeholder="Adm. Number" name="admno" id="f-name" />
  </div>
  
 <div className="float-label">
    <input type="text" value={phno} onChange={e => onChange(e)} placeholder="Phone no." name="phno" id="f-name" />
  </div>
    


  
  <div className="float-label">
        <br />
        <p>*Please fill above info properly, it will be published in selection list</p>
  </div>
  <br />
  <button className="btn" type="submit">Submit</button>
</form>  

        </Fragment>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
}



export default connect(null, {createProfile})(withRouter(CreateProfile))
