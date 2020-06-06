import React, {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import {getLists} from '../../actions/selection'
import {connect} from 'react-redux'

import SelectionItem from './SelectionItem'
import Footer from '../layout/Footer'


const Selections = ({auth, getLists, selection: {loading, selections}}) => {

    useEffect(() => {
        getLists();
    }, [getLists])

    return ( loading ? <Spinner /> : (
        <Fragment>
            {auth.isAuthenticated && auth.loading === false && auth.user.admin && (
                <Link to="/addlist" className='btn btn-success'>
                    Add Selection List
                </Link>
            )}

            <h1 class="lead my-1">
            <i class="fas fa-list-alt"></i> Choose Exam :
                </h1><br />
                <div class="profile-github">

                {selections.length === 0 ?
                <div class="repo bg-white p-1 my-1">
                <div>
                  <h2 className="lead"><a href="#!"
                      rel="noopener noreferrer">No Selection List released yet...</a></h2>
                </div>
              </div>
                : 
                selections.map(selection => (
                    <SelectionItem key={selection._id} selection={selection} />
                ))
              }

                </div>
                <Footer />
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
