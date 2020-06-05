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
                            CrackIT
                        </h1>
                        <p>
                            CrackIT is simple user friendly website for conducting quiz exams.  <br /> Our mission is to allow examination online with a more user-friendly UI!!! 
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
                <h3 class="text-center">
                    Need for the WEBSITE
                </h3>
                <p>
                    Application Programming Interfaces (APIs) have taken the world by storm and are now the de facto standard of software communication. Almost every software product nowadays consumes APIs. The business model of numerous companies around the world relies upon the consumption of their APIs. API providers, therefore, strive to increase API adoption rates by spending millions of dollars every year to improve developer experience. This is usually done by providing Software Development Kits (SDKs) and API documentation to developer consuming their API(s). Developing SDKs and writing documentation, however, are arduous, monotonous and error-prone tasks. It is a slow process and costs a lot of time and money.
                </p>
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
