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

                
            {profile !== null ? (<Fragment>
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
            <a href="#!">
            <i className="fas fa-user-tie"> - {profile.admno}</i>
            </a><br /><br />
            <a href="#!">
            <i className="fas fa-phone"> - {profile.phno}</i>
            </a>
          </div>
        </div>
        <div class="profile-github">
          <h1 class="lead my-1">
          <i class="fas fa-cloud-download-alt"></i> Subscriptions
          </h1>

          <div class="repo bg-white p-1 my-1">
            <div>
              <h4><a href="#" target="_blank"
                  rel="noopener noreferrer">Repo Two</a></h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, laborum!
              </p>
            </div>
            <div>
              <ul>
                <li class="badge badge-primary">Stars: 44</li>
                <li class="badge badge-dark">Watchers: 21</li>
                <li class="badge badge-light">Forks: 25</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
            </Fragment>) : (<Fragment>
              <div className="profile-grid my-1">
        <div className="profile-top bg-primary p-2">
        <img
            className="round-img my-1"
            src={auth.user.avatar}
            alt=""
          />
        <h1 className="large">Welcome {auth.user.name}</h1>
          <p className="lead">You have not yet setup a profile!</p>
          <br />
          <Link to='/create-profile' className="btn btn-light my-1" > Create Profile </Link>
          </div>
          </div>
            </Fragment>)}

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
