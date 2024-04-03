import { Link } from "react-router-dom";
import Splash from "../images/incog-landing.png";
import AnimatePage from "./AnimatePage";

function Landing() {
  return (
    <AnimatePage>
      <section className="Landing">
        <div className="landing-content">
          <h1>Discognito</h1>
          <p>Find out who is talking behind your back :D</p>
          <Link to="/client" className="landing-button">
            Connect
          </Link>
        </div>
        <div className="landing-img">
          <img src={Splash} alt="" />
        </div>
      </section>
    </AnimatePage>
  );
}

export default Landing;
