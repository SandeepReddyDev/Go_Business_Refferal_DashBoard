import { useCallback, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import Loading from '../../components/Loading/Loading.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import OverviewMetrics from '../../components/OverviewMetrics/OverviewMetrics.jsx';
import ServiceSummary from '../../components/ServiceSummary/ServiceSummary.jsx';
import ReferralShare from '../../components/ReferralShare/ReferralShare.jsx';
import ReferralTable from '../../components/ReferralTable/ReferralTable.jsx';
import { fetchReferralDashboard } from '../../services/referralApi.js';
import { normalizeReferrals } from '../../utils/referralData.js';

function unwrapDashboardPayload(responseData) {
  return responseData?.data || responseData || {};
}

function parseError(error) {
  return {
    status: error.response?.status,
    message: error.response?.data?.message || error.message || 'Unable to load referrals'
  };
}

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    metrics: [],
    serviceSummary: {},
    referral: {},
    referrals: []
  });
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchReferralDashboard({ search, sort });
      const payload = unwrapDashboardPayload(response.data);
      setDashboard({
        metrics: payload.metrics || [],
        serviceSummary: payload.serviceSummary || {},
        referral: payload.referral || {},
        referrals: normalizeReferrals(payload.referrals)
      });
    } catch (apiError) {
      setError(parseError(apiError));
    } finally {
      setIsLoading(false);
    }
  }, [search, sort]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return (
    <div className="app-page">
      <Navbar />
      <main className="shell page-main">
        <div className="page-heading">
          <h1>Referral Dashboard</h1>
          <p>Track your referrals, earnings, and partner activity in one place.</p>
        </div>
        {isLoading ? (
          <Loading label="Loading dashboard" />
        ) : (
          <>
            <ErrorMessage error={error} />
            {!error && (
              <>
                <OverviewMetrics metrics={dashboard.metrics} />
                <ServiceSummary summary={dashboard.serviceSummary} />
                <ReferralShare referral={dashboard.referral} />
                <ReferralTable
                  referrals={dashboard.referrals}
                  search={search}
                  sort={sort}
                  onSearchChange={setSearch}
                  onSortChange={setSort}
                />
              </>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
