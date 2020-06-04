import React, {useState, Fragment, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createProfile, getCurrentProfile} from '../../actions/profile';

const EditProfile = ({profile: {profile, loading}, createProfile, getCurrentProfile, history}) => {

    const [formData, setFormData] = useState({
        field: '',
        branch: '',
        admno: '',
        phno: ''
    });

    useEffect(() => {
        getCurrentProfile();

        setFormData({
            field: loading || !profile.field ? '' : profile.field,
            branch: loading || !profile.branch ? '' : profile.branch,
            admno: loading || !profile.admno ? '' : profile.admno,
            phno: loading || !profile.phno ? '' : profile.phno
        })
    }, [loading, getCurrentProfile])

    const {
        field,
        branch,
        admno,
        phno
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true)
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

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile))
