import React, {useEffect, Fragment} from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {getCurrentProfile} from '../../actions/profile';

const Myprofile = ({getCurrentProfile, auth, profile: {profile, loading}}) => {

    useEffect(() => {
        getCurrentProfile();
    }, []);
    
    return loading && profile === null ? <Spinner /> : <Fragment>

                {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
                <Link to="/edit-profile" className='btn btn-dark'>
                    Edit Profile
                </Link>
                )}

        <div className="profile-grid my-1">
        <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src={profile.user.avatar}
            alt=""
          />
        <h1 className="large">{profile.user.name}</h1>
          <p className="lead">{profile.branch}</p>
          <p>{profile.field}</p>
          <div className="icons my-1">
            <a href="#!" target="_blank" rel="noopener noreferrer">
            <i class="fas fa-phone"> - {profile.phno}</i>
            </a><br /><br />
            <a href="#!" target="_blank" rel="noopener noreferrer">
            <i class="fas fa-user-tie"> - {profile.admno}</i>
            </a>
          </div>
        </div>
      </div>

    </Fragment>;
}

Myprofile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile})(Myprofile)
