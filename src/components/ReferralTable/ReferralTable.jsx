import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { formatDate } from '../../utils/formatDate.js';

const PAGE_SIZE = 10;

export default function ReferralTable({ referrals = [], search, sort, onSearchChange, onSortChange }) {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const totalPages = Math.max(1, Math.ceil(referrals.length / PAGE_SIZE));
  const paginatedReferrals = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return referrals.slice(start, start + PAGE_SIZE);
  }, [page, referrals]);

  const handleSearch = (event) => {
    setPage(1);
    onSearchChange(event.target.value);
  };

  const handleSort = (event) => {
    setPage(1);
    onSortChange(event.target.value);
  };

  const goToPage = (nextPage) => {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
  };

  return (
    <section className="section-card table-card">
      <h2>All referrals</h2>
      <div className="table-toolbar">
        <label>
          Search
          <input
            type="search"
            placeholder="Name or service…"
            value={search}
            onChange={handleSearch}
          />
        </label>
        <label>
          Sort by date
          <select value={sort} onChange={handleSort}>
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </label>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Service</th>
              <th>Date</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {paginatedReferrals.map((referral) => (
              <tr
                key={referral.id}
                tabIndex="0"
                onClick={() => navigate(`/referral/${referral.id}`, { state: { referral } })}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    navigate(`/referral/${referral.id}`, { state: { referral } });
                  }
                }}
              >
                <td>{referral.name}</td>
                <td>{referral.serviceName}</td>
                <td>{formatDate(referral.date)}</td>
                <td className="profit">{formatCurrency(referral.profit)}</td>
              </tr>
            ))}
            {paginatedReferrals.length === 0 && (
              <tr>
                <td colSpan="4" className="empty-cell">
                  No referrals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        totalItems={referrals.length}
        pageSize={PAGE_SIZE}
        onPageChange={goToPage}
      />
    </section>
  );
}
