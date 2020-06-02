import React from 'react'
import PropTypes from 'prop-types'

const SelectedUserItem = ({info: {name, avatar, email, profile: {admno, phno} }}) => {
    return (
        <div className="profile bg-light">
          <img src={avatar} alt="" className="round-img"/>
          <div>
              <h2 className='lead'>{name}</h2>
              <p>E-mail: {email}</p>
              <p>Admission No.: {admno}</p>
              <p>Phone No.: {phno}</p>
              
              {/* <Link to={`/profile/${_id}`} className='btn btn-primary'>
                  View Profile
              </Link> */}
          </div>
          
        </div>
    )
}

SelectedUserItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default SelectedUserItem
