import React from 'react'
import TicketPage from "../TicketPage/TicketPage"
import "./Home.css"
import heroimg from "../../assets/hero-logo.webp"


const Home = () => {
  return (
    <div>
        <section class="hero">
  <div class="hero-content">
    <h1>Why Cancel? <span>Just Exchange!</span></h1>
    <p>
      Don't let cancellation charges ruin your plans. Exchange your tickets easily and let someone else take the journey!
    </p>
    <div class="hero-btns">
      <div class="btn btn-primary">Sell Your Ticket</div>
      <div  class="btn btn-secondary">Browse Tickets</div>
    </div>
  </div>
  <div class="hero-image">
    <img src={heroimg} alt="Ticket Exchange" />
    <span className='heroimg-shadow'></span>
  </div>
</section>
        <TicketPage/>
    </div>
  )
}

export default Home