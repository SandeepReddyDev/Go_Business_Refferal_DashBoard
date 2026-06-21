export default function Pagination({ page, totalPages, totalItems, pageSize, onPageChange }) {
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination-bar">
      <p>
        Showing {start}–{end} of {totalItems} entries
      </p>
      <div className="pagination-controls" aria-label="Pagination">
        <button type="button" onClick={() => onPageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        {pages.map((pageNumber) => (
          <button
            type="button"
            className={pageNumber === page ? 'active' : ''}
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            aria-current={pageNumber === page ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        ))}
        <button type="button" onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
