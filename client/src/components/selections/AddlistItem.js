import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

const ExamItem = ({auth, removeExam, subscribe, exam: {_id, field, dateOfConduct, from ,to, mmarks}}) => {

    const [formData, setFormData] = useState({
        modal: false,
        cutoff: ''
    });

    const {modal} = formData;

    const toggle = () => {
         setFormData({...formData, modal: !formData.modal});
    }


    return (

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
              
                    (<button onClick={toggle}
                    type="button"
                    class="btnexam btn-success"> 
                    Set Cutoff
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

ExamItem.propTypes = {
    auth: PropTypes.object.isRequired,
    exam: PropTypes.object.isRequired
  }

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(ExamItem)
