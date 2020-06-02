import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import {submitExam} from '../../actions/exam';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

const ExamCountdown = ({dateAndTime, examId, submitExam}) => {

  const submit = () => {
    submitExam(examId);
  }
    
    // console.log("2020-05-23T17:00")
    const calculateTimeLeft = () => {
        
    const difference = +new Date(dateAndTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ?
      
      (  <button
        type="button"
        class="btnexam btn-success"><i class="fas fa-clock"></i> Time Left: {timerComponents}
        </button>)
        
                :
                submit()
                  // (<button
                  // class="btnexam btn-danger"><i class="fas fa-clock"></i>
                  //  Auto Submitting...</button>

                  //   )
      
      }
    </div>
  );
}

ExamCountdown.propTypes = {
    dateAndTime: PropTypes.string.isRequired,
    examId: PropTypes.string.isRequired,
    submitExam: PropTypes.func.isRequired,
}

export default connect(null, {submitExam})(ExamCountdown);

