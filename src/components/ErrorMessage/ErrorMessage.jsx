export default function ErrorMessage({ error }) {
  if (!error) {
    return null;
  }

  return (
    <div className="error-message" role="alert">
      <strong>{error.status ? `${error.status} ` : ''}Error</strong>
      <span>{error.message}</span>
    </div>
  );
}
