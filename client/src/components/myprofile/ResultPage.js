import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'

const ResultPage = ({exam}) => {
    return (
        <div>
            <div class='wrapper'>
                <div class='glow'></div>
                <div class='mask'>
                    <div id="trophy-font">
                        <h2 id="smallTextU">Exam has been submitted!</h2><br />

                        <h1>You've got {exam.marksobt} out of {exam.mmarks}</h1><br/>
                        <h2 id="smallText">Selection list will be released soon on this website!</h2>

                        <Link to="/myprofile" className="btnexam btn-success"><i class="fas fa-thumbs-up"></i> Done </Link>

                    </div>
                
                <div class='containerTrophy'>
                    <div class='star'>&#10022;</div>
                    <div class='main'></div>
                    <div class='stem1'></div>
                    <div class='stemCrease'></div>
                    <div class='stem2'></div>
                    <div class='base'></div>
                    <div class='arms'></div>
                    
                </div>
                </div>
            </div>
        </div>
    )
}

ResultPage.propTypes = {
    exam: PropTypes.object.isRequired
}

export default ResultPage
