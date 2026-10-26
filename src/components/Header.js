
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="site-header">
      <a href="/" aria-label="Little Lemon homepage">
        <img
          src="/logo_littlelemon.svg"
          alt="Little Lemon logo"
          className="site-logo"
        />
      </a>

      <Nav />
    </header>
  );
}
