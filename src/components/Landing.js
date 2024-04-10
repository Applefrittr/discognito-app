import { Link } from "react-router-dom";
import { useInView, motion } from "framer-motion";
import { useRef, useEffect } from "react";
import Splash from "../assets/images/incog-landing.png";
import AnimatePage from "./AnimatePage";
import testimonials from "../data/testimonials";
import about from "../data/about";
import demo from "../assets/gifs/DiscogDemo.gif";
import email from "../assets/images/email.png";

function Landing() {
  const testRef = useRef();
  const testContentRef = useRef();
  const testInVIew = useInView(testContentRef);

  const demoRef = useRef();
  const demoInView = useInView(demoRef);

  useEffect(() => {
    if (testRef.current.classList.contains("scale"))
      testRef.current.classList.remove("scale");
    else testRef.current.classList.add("scale");
  }, [testInVIew]);

  useEffect(() => {
    if (demoRef.current.classList.contains("demo-slidein"))
      demoRef.current.classList.remove("demo-slidein");
    else demoRef.current.classList.add("demo-slidein");
  }, [demoInView]);

  return (
    <AnimatePage>
      <section className="Landing">
        <section className="hero">
          <div className="hero-content">
            <h1>Discognito</h1>
            <p>Find out who is talking behind your back :D</p>
            <Link to="/client" className="hero-button">
              Connect
            </Link>
          </div>
          <div className="hero-img">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
              src={Splash}
              alt=""
            />
          </div>
        </section>
        <section className="testimonial-section" ref={testRef}>
          <h2>They're talking about us!</h2>
          <div ref={testContentRef}>
            {testimonials.map((testimonial) => {
              return (
                <div className="testimonial">
                  <div>
                    <img
                      src={testimonial.avatar}
                      className="testimonial-avatar"
                      alt=""
                    />
                    <p>
                      <b>{testimonial.name}</b>
                    </p>
                  </div>
                  <i>"{testimonial.text}"</i>
                </div>
              );
            })}
          </div>
        </section>
        <section className="about">
          <h2>You are Big Brother</h2>
          <div className="about-container">
            <p>{about}</p>
            <div className="demo-container">
              <img
                src={demo}
                ref={demoRef}
                className="demo"
                alt={<b>Demo Gif</b>}
              ></img>
            </div>
          </div>
        </section>
        <footer className="contact">
          <ul class="contact-links-container">
            <li class="link-container">
              <a
                href="https://github.com/Applefrittr"
                target="_blank"
                rel="noreferrer"
              >
                <i class="devicon-github-original colored"></i>
              </a>
            </li>
            <li class="link-container">
              <a href="mailto: abc@example.com">
                <img src={email} alt="email" />
              </a>
            </li>
          </ul>
          <p>Created by Applefrittr April 2024</p>
        </footer>
      </section>
    </AnimatePage>
  );
}

export default Landing;
