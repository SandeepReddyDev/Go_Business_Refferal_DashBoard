import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="login-card not-found-card">
        <h1>404</h1>
        <p>Page not found</p>
        <Link className="btn btn-primary login-submit" to="/">
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
