import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'

const Countdown = ({dateAndTime}) => {


    
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
      
                    (<button
                    type="button"
                    class="btnexam btn-success"><i class="fas fa-pen-alt"></i>
                     Give Test
                    </button>)
      
      }
    </div>
  );
}

Countdown.propTypes = {
    dateAndTime: PropTypes.string.isRequired,
}

export default Countdown;

