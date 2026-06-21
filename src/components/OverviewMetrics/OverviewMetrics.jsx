const icons = ['$', '💳', '🔗', '⌛', '%', '💰', '👥', '⇄'];

export default function OverviewMetrics({ metrics = [] }) {
  return (
    <section className="section-card">
      <h2>Overview</h2>
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <article className="metric-card" key={`${metric.label}-${index}`}>
            <span className="metric-icon" aria-hidden="true">
              {icons[index % icons.length]}
            </span>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
