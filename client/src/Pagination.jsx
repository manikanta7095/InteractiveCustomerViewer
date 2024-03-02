

import React from 'react';

const Pagination = ({ recordsPerPage, totalRecords, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-5">
      <ul className="pagination justify-content-center">
        {pageNumbers.map(number => (
          <li key={number} className="mx-2">
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 ${
                currentPage === number ? 'bg-blue-500 text-blue' : 'bg-gray-300'
              } rounded`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
