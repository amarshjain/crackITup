import React from 'react'
import Footer from './Footer'

const Home = props => {
    return (
        <div>


    <div id="about-main">
        <div class="jumbotron">
            <div class="jumbotron-inner">
                <div class="top-box">
                    <div class="content-box">
                        <h1><br />
                            CrackITup
                        </h1>
                        <p>
                            CrackITup is a simple user friendly website for conducting quiz exams.  <br /> Our mission is to allow examination online with a more user-friendly UI!!! 
                        </p>
                    </div>                    
                </div>
            </div>
            <div class="img-layer-container">
                <div class="team-image" id="team-image">
                    <img src="https://media2.giphy.com/media/LOznMvZUKneOhiIscg/giphy.gif" />
                </div>
            </div>            
        </div>

        <div class="story-container">
            <div class="need-for-dx-container">
                <br/><br/><br/><br />
                {/* <h3 class="text-center">
                    Need for this WEBSITE
                </h3>
                <p>
                Quizzes help students identify what they know and what they don't know. The students then have a better idea of how well they are grasping the material, hopefully motivating them to study more and helping them allocate their study time effectively by focusing on the information that still needs more practice.<br /><br />
                Frequent quizzes give the teacher an idea of how well the class as a whole grasps the concepts. In my class, if a couple of students are struggling, I can reach out to them and encourage them to come to my office to ask questions individually. If many students are struggling, this tells me that I need to do something different during class. I can rethink the way I am explaining something, provide additional instruction in the classroom, or create an engaging activity for the class to do together to make sure the content is clear.  <br /><br />
                In these tough times of COVID-19 and lockdown, We all should encourage our spirits to learn something new everyday <br/> <br/> 
                KEEP LEARNING KEEP QUIZZING!!!
                  </p> */}
                <div class="img-container">
                    <img src="https://cdn.dribbble.com/users/2026288/screenshots/6923164/brain_800_600.gif"/>
                </div>
            </div>

            <div class="container-divider"></div>
        </div>
    </div> 
    <Footer /> 
    </div>
    )
}


export default Home
