import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BUPOTPagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  from,
  to,
  links,
  onPageChange,
}) => {
  // Extract page numbers from pagination URLs
  const getPageFromUrl = (url) => {
    if (!url) return null;
    const matches = url.match(/[?&]page=(\d+)/);
    return matches ? parseInt(matches[1]) : null;
  };

  // Get page numbers from links
  const firstPage = links?.first ? getPageFromUrl(links.first) : 1;
  const lastPage = links?.last ? getPageFromUrl(links.last) : totalPages;
  const nextPage = links?.next ? getPageFromUrl(links.next) : null;
  const prevPage = links?.prev ? getPageFromUrl(links.prev) : null;

  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-between items-center px-4 py-3 bg-white border-t border-gray-200">
      <div>
        <p className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onPageChange(firstPage)}
          disabled={!prevPage}
          className={`px-3 py-1 rounded ${
            !prevPage
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          First
        </button>
        <button
          onClick={() => onPageChange(prevPage || 1)}
          disabled={!prevPage}
          className={`px-3 py-1 rounded ${
            !prevPage
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <FaChevronLeft className="h-4 w-4" />
        </button>

        {/* Show page numbers */}
        <div className="flex space-x-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((pageNum) => {
              // Show first, last, and pages around current
              return (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              );
            })
            .map((pageNum, index, array) => {
              // Add ellipsis if needed
              const showEllipsisBefore =
                index > 0 && array[index - 1] !== pageNum - 1;
              const showEllipsisAfter =
                index < array.length - 1 && array[index + 1] !== pageNum + 1;

              return (
                <React.Fragment key={pageNum}>
                  {showEllipsisBefore && (
                    <span className="px-3 py-1 bg-gray-100 rounded">...</span>
                  )}
                  <button
                    onClick={() => handlePageClick(pageNum)}
                    className={`px-3 py-1 rounded ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                  {showEllipsisAfter && (
                    <span className="px-3 py-1 bg-gray-100 rounded">...</span>
                  )}
                </React.Fragment>
              );
            })}
        </div>

        <button
          onClick={() => onPageChange(nextPage || totalPages)}
          disabled={!nextPage}
          className={`px-3 py-1 rounded ${
            !nextPage
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <FaChevronRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => onPageChange(lastPage)}
          disabled={!nextPage}
          className={`px-3 py-1 rounded ${
            !nextPage
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default BUPOTPagination;
