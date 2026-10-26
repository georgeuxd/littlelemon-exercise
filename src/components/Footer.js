
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <img
          src="/logo_littlelemon.svg"
          alt="Little Lemon logo"
          className="footer-logo"
        />
      </div>

      <div>
        <h3>Little Lemon</h3>
        <p>Fresh Mediterranean food, made with care.</p>
      </div>

      <div>
        <h3>Explore</h3>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/booking">Reservations</Link></li>
        </ul>
      </div>

      <p className="footer-copyright">
        © {new Date().getFullYear()} Little Lemon
      </p>
    </footer>
  );
}
