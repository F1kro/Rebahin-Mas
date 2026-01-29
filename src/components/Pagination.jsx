import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxVisible = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  
  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Base style untuk tombol ala komik
  const btnBase = "relative flex items-center justify-center border-2 border-black font-black uppercase italic transition-all active:translate-x-0 active:translate-y-0 active:shadow-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0";

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 mt-16 mb-12">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} p-2 bg-white hover:bg-yellow-300`}
      >
        <FiChevronLeft size={24} />
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`${btnBase} w-10 h-10 bg-white hover:bg-yellow-300`}
          >
            1
          </button>
          {startPage > 2 && <span className="font-black text-2xl px-2">...</span>}
        </>
      )}

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${btnBase} w-10 h-10 ${
            currentPage === page
              ? 'bg-[#FF0000] text-white -rotate-3 scale-110 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10'
              : 'bg-white text-black hover:bg-yellow-300'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="font-black text-2xl px-2">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`${btnBase} w-10 h-10 bg-white hover:bg-yellow-300`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} p-2 bg-white hover:bg-yellow-300`}
      >
        <FiChevronRight size={24} />
      </button>
    </div>
  );
};

export default Pagination;