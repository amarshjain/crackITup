import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteList} from '../../actions/selection'
import Moment from 'react-moment';

const SelectionItem = ({auth, deleteList, selection: {_id, exam: {field, dateOfConduct, from ,to, mmarks}}}) => {

    return (
        <div class="repo bg-white p-1 my-1">
            <div>
              <h2 className="lead"><a href="#!"
                  rel="noopener noreferrer">{field}</a></h2>
              <p>
    Date Of Conduct: <Moment format='DD/MM/YYYY'>{dateOfConduct}</Moment>
              </p>
                <br />
              <p>
                {from}{" "}-{" "}{to}
              </p><br />

                {auth.isAuthenticated ?
                 (<Link to={`/selections/${_id}`} class="btnexam btn-success"><i class="fas fa-list-alt"></i> Show Selection List </Link>
                    ) : null}
                
                {auth.isAuthenticated && auth.user.admin ?
                 (<button onClick={e => deleteList(_id)}
                 type="button"
                 class="btnexam btn-danger"> <i class="fas fa-times"></i>
                 </button>) : null}


            </div>
            <div>
              <ul>
                <li class="badge badge-primary">MMarks: {mmarks}</li>
              </ul>
            </div>
          </div>
              )

}

SelectionItem.propTypes = {
    auth: PropTypes.object.isRequired,
    selection: PropTypes.object.isRequired,
    deleteList: PropTypes.func.isRequired,
  }

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deleteList})(SelectionItem)