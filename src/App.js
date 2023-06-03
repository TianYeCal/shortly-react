import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Brand from "./images/icon-brand-recognition.svg";
import Detailed from "./images/icon-detailed-records.svg";
import { ReactComponent as Facebook } from "./images/icon-facebook.svg";
import Fully from "./images/icon-fully-customizable.svg";
import { ReactComponent as Instagram } from "./images/icon-instagram.svg";
import { ReactComponent as Pinterest } from "./images/icon-pinterest.svg";
import { ReactComponent as Twitter } from "./images/icon-twitter.svg";
import Illustration from "./images/illustration-working.svg";
import Logo from "./images/logo.svg";
import { ReactComponent as LogoIcon } from "./images/logo.svg";
import { nanoid } from "nanoid";
import ShortenLink from "./ShortenLink";
import axios from "axios";
import { AiOutlineMenu } from "react-icons/ai";

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );
  const [link, setLink] = useState("");
  const [shortenedLink, setShortenedLink] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const getLink = async () => {
    if (!link) return;
    try {
      const resp = await axios(`https://api.shrtco.de/v2/shorten?url=${link}`);
      setShortenedLink(resp.data.result.full_share_link);
    } catch (error) {
      if (!error.response.data.okay) {
        setIsError(true);
        setErrorMsg("Please input valid url address");
        return;
      }
    }
    setIsError(false);
    return;
  };

  const addItem = () => {
    const item = {
      id: nanoid(),
      link: link,
      shortenedLink: shortenedLink,
      isCopied: false,
    };
    if (isError) return;
    setItems([...items, item]);
  };
  const deleteItem = (itemId) => {
    const newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!link) {
      setIsError(true);
      setErrorMsg("Url cannot be empty");
      return;
    }
    if (isError) {
      return;
    }
    setIsError(false);
    addItem(link);
    setLink("");
  };

  console.log(items);
  useEffect(() => {
    getLink();
  }, [link]);
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);
  return (
    <Wrapper>
      <nav>
        <div className="container nav-container">
          <img src={Logo} alt="logo pic" />
          <div className="nav-links-login desktop">
            <div className="nav-link">
              <a href="/#">Features</a>
              <a href="/#">Pricing</a>
              <a href="/#">Resources</a>
            </div>
            <div className="login-btn">
              <button className="btn login">Login</button>
              <button className="btn signUp">Sign up</button>
            </div>
          </div>
          <button className="mobil menu-btn">
            <AiOutlineMenu
              className="menu-icon "
              onClick={() => setOpenModal(!openModal)}
            />
          </button>
        </div>
      </nav>
      {openModal && (
        <div className="modal">
          <div className="modal-links">
            <button className="nav-btn">About</button>
            <button className="nav-btn">Services</button>
            <button className="nav-btn">Projects</button>
          </div>
          <div className="modal-btns">
            <button className="nav-btn">Login</button>
            <button className="btn">CONTACT</button>
          </div>
        </div>
      )}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-info">
            <h1>More than just shorter links</h1>
            <p className="desc">
              Build your brand's recognition and get detailed insights on how
              your links are performing
            </p>
            <button className="btn">Get Started</button>
          </div>
          <img src={Illustration} alt="hero img" className="hero-img" />
        </div>
      </section>
      <section className="shorten">
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-control">
            <input
              type="text"
              className={isError ? "form-input error-input" : "form-input"}
              // className="form-input"
              placeholder="Shorten a link here..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <button type="submit" className="btn shorten-btn">
              Shorten It!
            </button>
          </div>
          {isError && <p className="small">{errorMsg}</p>}
        </form>
      </section>
      <ShortenLink items={items} deleteItem={deleteItem} />

      <section className="features">
        <div className="container features-container">
          <h2 className="features-title">Advanced Statistics</h2>
          <p className="features-desc">
            Track how your links are performing across the web with our advanced
            statistics dashboard.
          </p>
          <div className="feature-section">
            <div className="single-feature">
              <div className="feature-img">
                <img src={Brand} alt="brand icon" className="img img-icon" />
              </div>
              <div className="single-feature-info">
                <h3 className="feature-title">Brand Recognition</h3>
                <p className="feature-desc">
                  Brand Recognition Boost your brand recognition with each
                  click. Generic links don’t mean a thing. Branded links help
                  instil confidence in your content.
                </p>
              </div>
            </div>
            <div className="divided-line"></div>
            <div className="single-feature sec-feature">
              <div className="feature-img">
                <img src={Detailed} alt="brand icon" className="img img-icon" />
              </div>
              <div className="single-feature-info">
                <h3 className="feature-title">Detailed Records</h3>
                <p className="feature-desc">
                  Gain insights into who is clicking your links. Knowing when
                  and where people engage with your content helps inform better
                  decisions.
                </p>
              </div>
            </div>
            <div className="divided-line"></div>
            <div className="single-feature last-feature">
              <div className="feature-img">
                <img src={Fully} alt="brand icon" className="img img-icon" />
              </div>
              <div className="single-feature-info">
                <h3 className="feature-title">Fully Customizable</h3>
                <p className="feature-desc">
                  Improve brand awareness and content discover ability through
                  customizable links, supercharging audience engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="boost">
        <h3 className="boost-title">Boost your links today</h3>
        <button className="btn">Get Started</button>
      </section>
      <footer>
        <div className="container footer-container">
          <LogoIcon className="logo" />
          <div className="footer-right">
            <div className="first-col">
              <p className="col-title">Features</p>
              <p className="col-detail">Link Shortening</p>
              <p className="col-detail">Branded Links</p>
              <p className="col-detail">Analytics</p>
            </div>
            <div className="first-col">
              <p className="col-title">Resources</p>
              <p className="col-detail">Blog</p>
              <p className="col-detail">Developers</p>
              <p className="col-detail">support</p>
            </div>
            <div className="first-col">
              <p className="col-title">Company</p>
              <p className="col-detail">About</p>
              <p className="col-detail">Our Team</p>
              <p className="col-detail">Careers</p>
              <p className="col-detail">Contact</p>
            </div>
            <div className="social-icons">
              <Facebook className="social-icon" />
              <Pinterest className="social-icon" />
              <Twitter className="social-icon" />
              <Instagram className="social-icon" />
            </div>
          </div>
        </div>
      </footer>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  max-width: 100vw;
  padding: 2rem 0;
  overflow: hidden;
  position: relative;
  z-index: 1;
  .nav-container {
    display: flex;
    align-items: center;
    gap: 2rem;
    position: relative;
  }
  .modal {
    z-index: 10;
    background: hsl(257, 27%, 26%);
    position: absolute;
    top: 8rem;
    left: 1rem;
    width: 90vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: grey;
    border-radius: 1rem;
    padding: 2rem 0;
    margin: 0 auto;
    text-align: center;
  }
  .menu-btn {
    border: none;
    background: transparent;
  }
  .nav-buttons-mobil {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    padding: 3rem 0;
  }
  .modal-links {
    display: flex;
    flex-direction: column;
    width: 90%;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid hsl(257, 7%, 63%);
  }
  .nav-btn {
    border: none;
    background: transparent;
    color: var(--white);
    /* margin-left: 2rem; */
    font-weight: 700;
    font-size: 16px;
    font-family: "Poppins", sans-serif;
  }
  .nav-btn:hover {
    color: hsl(180, 66%, 49%);
  }
  .modal-btns {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  .nav-btn:hover {
    cursor: pointer;
  }
  .contact {
    color: var(--dark-blue);
    font-family: "Poppins", sans-serif;
    background-color: #fff;
    border-radius: 2rem;
    padding: 0.5rem 0.75rem;
    /* font-family: "Barlow", "Fraunces", serif, sans-serif; */
  }
  .contact:hover {
    background: var(--gray-blue);
  }
  .nav-links-login {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    a {
      color: hsl(257, 7%, 63%);
    }
  }
  .nav-link,
  .login-btn {
    display: flex;
    gap: 1rem;
  }
  .nav-link a:hover,
  .login-btn button:hover {
    cursor: pointer;
  }
  .nav-link a:hover {
    color: hsl(180, 66%, 49%);
  }

  .mobil {
    display: none;
  }
  .menu-icon {
    font-size: 32px;
    color: hsl(257, 7%, 63%);
  }
  .menu-icon:hover {
    cursor: pointer;
  }
  .hero {
    width: 100%;
    max-width: 100vw;
    position: relative;
    /* overflow: hidden; */
    padding: 3rem 0rem;
    padding-bottom: 6rem;

    .hero-info {
      margin-top: 5rem;
      width: 50%;
      h1 {
        font-weight: 700;
        margin-bottom: 1rem;
        line-height: 5rem;
        font-size: 56px;
      }
      .desc {
        color: hsl(257, 7%, 63%);
        line-height: 1.5rem;
        margin-bottom: 2rem;
      }
    }
    .hero-img {
      position: absolute;
      top: 20%;
      right: -5%;
      height: 25rem;
    }
  }
  .shorten {
    margin-top: 5rem;
    background: hsl(0, 0%, 90%);
    position: relative;
    padding: 3rem 0;
    .form {
      position: absolute;
      top: -50%;
      left: 9.5%;
      width: 80vw;
    }
    .shorten-btn {
      border-radius: 0.5rem;
      width: 10rem;
      padding: 0.75rem 1rem;
    }
  }
  .shorten-links {
    background: hsl(0, 0%, 90%);
    padding-bottom: 2rem;
  }
  .single-link {
    background-color: white;
    display: flex;
    align-items: center;
    padding: 1rem 0.75rem;
    justify-content: space-between;
    border-radius: 0.25rem;
  }
  .shorten-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .shortened-link {
    color: hsl(180, 66%, 49%);
  }
  .copy-btn {
    border-radius: 0.25rem;
  }
  .features {
    background: hsl(0, 0%, 90%);
    padding: 3rem 0;
  }
  .features-container {
    max-width: 80vw;
    margin: 0 auto;
  }
  .features-title,
  .features-desc {
    text-align: center;
  }
  .features-desc {
    color: hsl(257, 7%, 63%);
  }
  .features-title {
    font-weight: 700;
    margin-bottom: 1rem;
    font-size: 24px;
  }
  .feature-desc {
    color: hsl(257, 7%, 63%);
    line-height: 1.5rem;
    margin-bottom: 2rem;
  }
  .feature-section {
    display: flex;
    align-items: center;
  }
  .single-feature {
    background: white;
    padding: 0 1rem;
    padding-top: 2rem;
    position: relative;
    border-radius: 0.25rem;
    .feature-img {
      height: 4rem;
      width: 4rem;
      padding: 1rem;
      background: hsl(257, 27%, 26%);
      border-radius: 50%;
      position: absolute;
      top: -2rem;
      left: 10%;
    }
  }
  .sec-feature {
    margin-top: 5rem;
  }
  .last-feature {
    margin-top: 10rem;
  }
  .divided-line {
    width: 10rem;
    height: 0.5rem;
    background: hsl(180, 66%, 49%);
  }
  .feature-title {
    margin-top: 2rem;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  .feature-desc {
    font-size: 14px;
    text-align: left;
  }
  .boost {
    text-align: center;
    padding: 2rem 0;

    h3 {
      color: white;
      font-weight: 700;
      font-size: 32px;
      margin-bottom: 2rem;
      text-transform: none;
    }
    button {
      padding: 1rem 2rem;
      font-size: 18px;
      border-radius: 2rem;
      margin-bottom: 1rem;
    }
  }
  footer {
    background: hsl(260, 8%, 14%);
  }
  .logo {
    color: white;
    stroke: white;
    fill: #fff;
  }
  .footer-container {
    padding: 3rem 0;
    color: white;
    display: flex;
    justify-content: space-between;
  }
  .footer-right {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
  }
  .col-title {
    font-size: 18px;
    margin-bottom: 1.5rem;
  }
  .col-detail {
    color: hsl(257, 7%, 63%);
    margin-bottom: 1rem;
  }
  .col-detail:hover {
    color: hsl(180, 66%, 49%);

    cursor: pointer;
  }
  .social-icons {
    display: flex;
    gap: 1rem;
  }
  .social-icon {
    fill: #fff;
    cursor: pointer;
  }
  .social-icon:hover {
    fill: hsl(180, 66%, 49%);
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .container {
      max-width: 90vw;
    }
    .nav-container {
      display: flex;
      justify-content: space-between;
    }
    .desktop {
      display: none;
    }
    .mobil {
      display: block;
    }
    .hero {
      .hero-img {
        top: 5%;
        right: -25%;
        height: 20rem;
      }
      .hero-info {
        text-align: center;
        width: 100%;
        margin-top: 100%;
        h1 {
          font-size: 32px;
          line-height: 3rem;
        }
      }
    }
    .input-control {
      flex-direction: column;
      gap: 3rem;
    }
    .form-input {
      position: relative;
    }
    .small {
      position: absolute;
      bottom: 6rem;
      left: 2.5rem;
    }
    .shorten {
      .form {
        position: absolute;
        top: -90%;
        left: 9.5%;
        width: 80vw;
      }
      .shorten-btn {
        width: 100%;
      }
    }
    .feature-section {
      flex-direction: column;
      align-items: center;
      margin-top: 5rem;
    }
    .single-feature {
      background: white;
      padding: 0 1rem;
      /* padding-top: 2rem; */
      position: relative;
      border-radius: 0.25rem;
      /* margin-top: 5rem; */
      text-align: center;
      .feature-img {
        height: 4rem;
        width: 4rem;
        padding: 1rem;
        background: hsl(257, 27%, 26%);
        border-radius: 50%;
        position: absolute;
        top: -2rem;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .sec-feature {
      margin-top: 2rem;
    }
    .last-feature {
      margin-top: 2rem;
    }
    .divided-line {
      width: 0.5rem;
      height: 3rem;
      background: hsl(180, 66%, 49%);
      transform: translateX(5%);
    }
    .feature-title {
      /* margin-top: 2rem; */
      font-size: 18px;
      font-weight: 700;
      /* margin-bottom: 1rem; */
    }
    .feature-desc {
      font-size: 14px;
      text-align: center;
    }
    footer {
      background: hsl(260, 8%, 14%);
    }

    .footer-container {
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      text-align: center;
    }
    .footer-right {
      flex-direction: column;
    }
    .col-title {
      font-size: 18px;
      margin-bottom: 1.5rem;
    }
    .col-detail {
      color: hsl(257, 7%, 63%);
      margin-bottom: 1rem;
    }
    .col-detail:hover {
      color: hsl(180, 66%, 49%);

      cursor: pointer;
    }
    .social-icons {
      display: flex;
      gap: 1rem;
    }
    .social-icon {
      fill: #fff;
      cursor: pointer;
    }
    .social-icon:hover {
      fill: hsl(180, 66%, 49%);
      cursor: pointer;
    }
    .form-input {
      padding: 0.75rem 1rem;
    }
    .boost {
      text-align: center;
      padding: 2rem 0.75rem;

      h3 {
        color: white;
        font-weight: 700;
        font-size: 28px;
        margin-bottom: 2rem;
        text-transform: none;
      }
      button {
        padding: 0.75rem 1.5rem;
        font-size: 18px;
        border-radius: 2rem;
        margin-bottom: 1rem;
      }
    }
  }
`;
export default App;
