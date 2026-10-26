
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">A taste of the Mediterranean</p>

        <h1>Little Lemon</h1>

        <h2>Good food. Beautiful moments.</h2>

        <p>
          Discover fresh Mediterranean flavors, seasonal ingredients
          and a warm dining experience inspired by family traditions.
        </p>

        <Link className="button-primary" to="/booking">
          Reserve a Table
        </Link>
      </div>

      <img
        className="hero-image"
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85"
        alt="Elegant restaurant dining experience"
      />
    </section>
  );
}
