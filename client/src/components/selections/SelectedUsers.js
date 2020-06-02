import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getList} from '../../actions/selection'
import Spinner from '../layout/Spinner'
import SelectedUserItem from './SelectedUserItem'


const SelectedUsers = ({getList, match, auth: {isAuthenticated, user}, selection: {loading, selection}}) => {

    useEffect(() => {
        getList(match.params.id);
    }, [getList]);

    return (
        <Fragment>
            { selection === null || loading ? <Spinner /> : (<Fragment>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i> Selected Profiles
                </p>
                <div className="profiles">
                    {selection.selectedUsers.length > 0 ? (
                        selection.selectedUsers.map(info => (
                            <SelectedUserItem key={info.profile._id} info={info} />
                        ))
                    ) : <Spinner />}
                </div>
                </Fragment>)}
        </Fragment>
    )
}

SelectedUsers.propTypes = {
    selection: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getList: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    selection: state.selection
})

export default connect(mapStateToProps, {getList})(SelectedUsers)
