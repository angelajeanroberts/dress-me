import React from 'react'
import {Link} from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="window">
      <img
        className="background-image"
        src="https://usersthink.com/img/99-free-images-large/71-usersthink-stock-image.jpg"
      />
      <div className="center-display-landing" />
      <div className="center-dispaly-landing-no-opac">
        <div id="landing-page-title">DRESS ME</div>
        <h2>a decentralized personal shopping experience</h2>
        <div className="landing-page-paragraph">
          <h2>Need help finding that perfect outfit?</h2>
          <p>
            Choose your stylists from your friends or our network of fashion
            experts. Tell us what you're looking for and receive a myriad of
            options without having to search multiple websites. If you think
            your stylist did an amazing job, you can directly send a payment to
            them using Ethereum!
          </p>
        </div>
        <div className="landing-page-paragraph">
          <h2>Eager to share your expertise?</h2>
          <p>
            If you find yourself constantly helping your friends find the
            perfect piece for every occassion, you have a place here at Dress
            Me. Sign up as a stylist and earn some extra cash while helping your
            friends or building your client book.
          </p>
        </div>
        <div>
          <Link to="/home">
            <button type="button" className="enter-button">
              Enter Site
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
