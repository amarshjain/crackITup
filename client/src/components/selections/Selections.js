import React, {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import {getLists} from '../../actions/selection'
import {connect} from 'react-redux'

import SelectionItem from './SelectionItem'

const Selections = ({auth, getLists, selection: {loading, selections}}) => {

    useEffect(() => {
        getLists();
    }, [getLists])

    return ( loading ? <Spinner /> : (
        <Fragment>
            {auth.isAuthenticated && auth.loading === false && (
                <Link to="/addlist" className='btn btn-success'>
                    Add Selection List
                </Link>
            )}

            <h1 class="lead my-1">
            <i class="fas fa-list-alt"></i> Choose Exam :
                </h1><br />
                <div class="profile-github">
                    
                {selections.map(selection => (
                    <SelectionItem key={selection._id} selection={selection} />
                ))}

                </div>
        </Fragment>
    )
    )
}

Selections.propTypes = {
    auth: PropTypes.object.isRequired,
    selection: PropTypes.object.isRequired,
    getLists: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    selection: state.selection
});

export default connect(mapStateToProps, {getLists})(Selections)
