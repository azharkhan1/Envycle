import React from 'react'
import aboutImg from '../../containers/images/aboutus-img.png'
import { HashLink  } from 'react-router-hash-link';
import '../../containers/css2/style.css'
import '../../containers/css2/responsive.css'
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            {/*header section start */}
            <div className="header_section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="menu-area">
                            </div>
                        </div>
                        <div className='col-md-8'>
                        
                        <nav className="navbar navbar-expand-lg navbar-light ">
                    <div className='container'>
                        
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto px-2">
                                    <li className="nav-item px-2">
                                        <HashLink className="nav-link " to="/">HOME<span className="sr-only">(current)</span></HashLink>
                                    </li>
                                    <li href="#aboutus">
                                        <HashLink className="nav-link" to="#aboutus">ABOUT US</HashLink>
                                    </li>
                                    <li className="nav-item">
                                        <HashLink className="nav-link" to="#footer">CONTACT US</HashLink>
                                    </li>
                                    <li className="nav-item">
                                        <HashLink className="nav-link" to="/signin">SIGN IN</HashLink>
                                    </li>
                                    
                                </ul>
                        </div>
                    </div>
                </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div className="banner_section layout_padding">
                            <section>
                                <div id="main_slider" className="section carousel slide banner-main" data-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <div className="container">
                                                <div className="row marginii">
                                                    <div className="col-md-5 col-sm-12">
                                                        <div className="carousel-sporrt_text ">
                                                            <h1 className="banner_taital" />
                                                            <div className="ads_bt"><button className="btn" style={{display:'hide'}}></button></div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7 col-sm-12">
                                                        <div className="img-box">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            {/*header section end */}




            {/*about section start */}
            <div id="aboutus" className="about_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="tablet"><img src={aboutImg} /></div>
                        </div>
                        <div className="col-md-6">
                            <div className="about_taital">
                                <div className="about_text mb-4">About Us</div>
                                <p className="dolor_text">Welcome to ENVYCLE (Kachra Hamara Tohfa Apka)
                                Envycle is established in Karachi, Pakistan in 2021. We will be providing high quality Envycle waste
                                handling systems to support your recycling and environmental objectives. Continuously innovating and
                                producing ‘state of the art’ technology to improve your experience and ensure you have the best solution
                                for your compaction and baling needs.
                                We pride ourselves on our expert team who are there to support you every step of the way, we will find you
                                the right compacting or baling solution and give you discounted vouchers in return.
                                We pride ourselves in offering our customers the best equipment, with the best support. As a result our
                                integrity and knowledge means you can be sure of honest, straightforward solutions to your waste and
                                recycling needs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*about section end */}



            <div className="client_img">
                        <div className="container">
                            <div className="mb-4" style={{fontSize:'50px',color:'#047c66',fontWeight:'bold',textAlign:'center'}}>OUR CLIENTS</div>
                            <div className='img-div'>
                            <img src="images/img-3.png" />
                            </div>
                                <h1 className="johan_text">AARISH ALI</h1>
                                <p className="adiser_text">Chief Executive</p>
                                <p className="long_text">I welcome you to Alico Waste Experts, I assure you that we are not here for just
                                business but an effort to stream line your wastes.
                                We shall be economical in thinking, planning and execution. We have everything called team, and not just
                                team but a team of right people. We also understand that Pakistan is facing lot of environmental problems
                                but we shall resolve them slowly and gradually.
                                Due to insufficient resources of Waste Disposal and its recycling, ultimately we are facing many
                                challenges like diseases all around in the country. We commit to focus on the Proper Disposal of the Waste
                                and it's Recycling. And we believe that one day we would be successful to make Pakistan Greener than ever
                                before (Insha’Allah).
                                My appreciation to those who have implemented responsible waste management and my piece of advice to those
                                who have not – It is not rocket science. All it needs is will. Make a choice— to be concerned about
                    people’s lives or to be indifferent. To segregate or not?</p>
                            </div>
            </div>
            {/*client section end */}




            {/*footer section start */}
            <div className="footer-clean">
        <footer id='footer' style={{paddingBottom:20}}>
          <div className="container mx-auto">
            <div className="row justify-content-center">
              <div className="col-sm-4 col-md-9 item">
              <h3>Contact</h3>
                <ul>
                    
                  <li><a href="#"> 
                      <span style={{color: 'lightgreen', fontSize: '20px'}}>
                        <i className="fas fa-phone-alt px-2" />
                      </span>
                      <b>+923422497984
                      </b>                              </a>
                  </li>
                  <li><a href="#"> 
                      <span style={{color: 'lightgreen', fontSize: '20px'}}>
                      <i className="la la-envelope px-2"></i>
                      </span>
                      <b>info@envycle.com</b> 
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 item social">
                <p className='copyright'style={{color:'#ffffff '}}><b>Envycle © 2021</b></p>
              </div>
            </div>
          </div>
        </footer>
      </div>
            {/*footer section end */}


        </div>
    )
}
