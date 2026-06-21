import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Loading from '../../components/Loading/Loading.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import { fetchReferralDetails } from '../../services/referralApi.js';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { formatDate } from '../../utils/formatDate.js';
import { extractReferralFromResponse, normalizeReferral } from '../../utils/referralData.js';

export default function ReferralDetails() {
  const { id } = useParams();
  const location = useLocation();
  const initialReferral = location.state?.referral ? normalizeReferral(location.state.referral) : null;
  const [referral, setReferral] = useState(initialReferral);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadReferral() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchReferralDetails(id);
        const matchedReferral = extractReferralFromResponse(response.data, id);

        if (!matchedReferral) {
          setError({
            status: response.status,
            message: 'Referral details were not found for this ID'
          });
          return;
        }

        setReferral(matchedReferral);
      } catch (apiError) {
        setError({
          status: apiError.response?.status,
          message: apiError.response?.data?.message || apiError.message || 'Unable to load referral'
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadReferral();
  }, [id]);

  return (
    <div className="app-page details-page">
      <Navbar />
      <main className="shell page-main">
        <Link className="back-link" to="/">
          ← Back to dashboard
        </Link>
        <div className="page-heading">
          <h1>Referral Details</h1>
          <p>Full information for this referral partner.</p>
        </div>
        {isLoading && <Loading label="Loading referral" />}
        {!isLoading && <ErrorMessage error={error} />}
        {!isLoading && !error && referral && (
          <section className="details-card">
            <div className="details-card-header">
              <h2>{referral.name}</h2>
              <span>{referral.serviceName}</span>
            </div>
            <dl>
              <div>
                <dt>Referral ID</dt>
                <dd>{referral.id}</dd>
              </div>
              <div>
                <dt>Partner Name</dt>
                <dd>{referral.name}</dd>
              </div>
              <div>
                <dt>Service Name</dt>
                <dd>{referral.serviceName}</dd>
              </div>
              <div>
                <dt>Date</dt>
                <dd>{formatDate(referral.date)}</dd>
              </div>
              <div>
                <dt>Profit</dt>
                <dd>{formatCurrency(referral.profit)}</dd>
              </div>
            </dl>
          </section>
        )}
      </main>
    </div>
  );
}
