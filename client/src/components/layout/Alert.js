import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Alert = ({alerts}) => alerts !== null && alerts.length > 0 && alerts.map(alert => (

    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
    <div className="alert-container">
      <button type="button" className="close-icon" data-dismiss="alert" aria-label="Close">
			<span>clear</span>
      </button>
      {alert.msg}
    </div>
  </div>
));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert);
