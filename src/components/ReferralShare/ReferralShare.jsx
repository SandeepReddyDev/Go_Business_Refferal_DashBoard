import { useState } from 'react';

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);

  const copyValue = async () => {
    await navigator.clipboard.writeText(value || '');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="copy-field">
      <label>{label}</label>
      <div>
        <input value={value || ''} readOnly aria-label={label} />
        <button className="btn btn-primary" type="button" onClick={copyValue}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

export default function ReferralShare({ referral = {} }) {
  return (
    <section className="section-card">
      <h2>Refer friends and earn more</h2>
      <div className="share-grid">
        <CopyField label="Your Referral Link" value={referral.link} />
        <CopyField label="Your Referral Code" value={referral.code} />
      </div>
    </section>
  );
}
