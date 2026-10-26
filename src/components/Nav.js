
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav aria-label="Main navigation">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/#about">About</Link></li>
        <li><Link to="/#menu">Menu</Link></li>
        <li><Link to="/booking">Reservations</Link></li>
        <li><Link to="/#order">Order Online</Link></li>
        <li><Link to="/#login">Login</Link></li>
      </ul>
    </nav>
  );
}
