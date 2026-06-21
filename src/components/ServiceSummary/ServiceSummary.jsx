const fields = [
  ['Service', 'service'],
  ['Your Referrals', 'yourReferrals'],
  ['Active Referrals', 'activeReferrals'],
  ['Total Ref. Earnings', 'totalRefEarnings']
];

function getValue(summary, key) {
  return summary?.[key] ?? summary?.[key.charAt(0).toUpperCase() + key.slice(1)] ?? '-';
}

export default function ServiceSummary({ summary = {} }) {
  return (
    <section className="section-card">
      <h2>Service summary</h2>
      <div className="summary-grid">
        {fields.map(([label, key]) => (
          <article className="summary-card" key={key}>
            <span>{label}</span>
            <strong>{getValue(summary, key)}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
