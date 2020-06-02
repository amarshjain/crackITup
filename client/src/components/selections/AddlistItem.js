import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addList} from '../../actions/selection'
import Moment from 'react-moment';

const ExamItem = ({auth, addList, exam: {_id, field, dateOfConduct, from ,to, mmarks}, history}) => {

    const [formData, setFormData] = useState({
        cutoff: ''
    });

    const {cutoff} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
      e.preventDefault();
      console.log(_id, cutoff);
      addList(_id, {cutoff});
      history.push('/selections')
  }
    const modal = `#openModal-about ${_id}`
    const modalId = `openModal-about ${_id}`
    return (
      <Fragment>
        <div class="repo bg-white p-1 my-1">
            <div>
              <h2 className="lead"><a href="#" target="_blank"
                  rel="noopener noreferrer">{field}</a></h2>
              <p>
    Date Of Conduct: <Moment format='DD/MM/YYYY'>{dateOfConduct}</Moment>
              </p>
                <br />
              <p>
                {from}{" "}-{" "}{to}
              </p><br />

              {auth.isAuthenticated && !auth.loading ?
              
                    (<a
                    href={modal}
                    type="button"
                    class="btnexam btn-success"> 
                    Set Cutoff
                    </a>) : null}

            </div>
            <div>
              <ul>
                <li class="badge badge-primary">MMarks: {mmarks}</li>
              </ul>
            </div>
            
          </div>

          <div id={modalId} class="modalDialog">
              <div>
                <a href="#close" title="Close" class="close">X</a>

                <br /> 

                    <form id="form" onSubmit = {e => onSubmit(e)} data-parsley-validate>

                        <h1>Set cutoff marks</h1>
                        <br />
                            <fieldset>
                                <input value={cutoff} onChange={e => onChange(e)} name="cutoff" class="floatlabel" type="number" placeholder="Set cutoff marks for this exam" required data-parsley-no-focus data-parsley-error-message="Please enter maximum marks." />
                            </fieldset>
                            <br />


                        <fieldset>
                                    <input type="submit" value="Publish Selection List" />
                            </fieldset>
                    </form>

              </div>
          </div>
      </Fragment>

          
    )
}

ExamItem.propTypes = {
    auth: PropTypes.object.isRequired,
    exam: PropTypes.object.isRequired,
    addList: PropTypes.func.isRequired,
  }

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {addList})(withRouter(ExamItem))
