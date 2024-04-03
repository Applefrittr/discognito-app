import { Link } from "react-router-dom";

function Landing() {
  return (
    <section className="Landing">
      <h1>Discognito</h1>
      <p>Find out who is talking behind your back :D</p>
      <Link to="/client" className="landing-button">
        Connect
      </Link>
    </section>
  );
}

export default Landing;
