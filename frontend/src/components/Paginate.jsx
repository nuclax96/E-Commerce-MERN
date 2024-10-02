import React from 'react';
import { Pagination } from 'react-bootstrap';
import { Link, Navigate,useNavigate } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const pageLimit = 5; // Number of pages to show around the current page
  const displayPages = 10; // Number of total pages to display including ellipses
  const navigate= useNavigate();
  const generatePageNumbers = () => {
    const pageNumbers = [];

    if (pages > 1) {
      // Always show the first page
      pageNumbers.push(1);

      // Add ellipsis if there's a gap between the first page and the start page
      if (page > Math.ceil(displayPages / 2)) {
        pageNumbers.push('...');
      }

      // Calculate the range of pages to display
      let startPage = Math.max(2, page - Math.floor(pageLimit / 2));
      let endPage = Math.min(pages - 1, page + Math.floor(pageLimit / 2));

      // Adjust the start and end page if there are fewer pages than displayPages
      if (page < Math.ceil(displayPages / 2)) {
        endPage = Math.min(displayPages - 1, pages - 1);
      }
      if (page > pages - Math.floor(displayPages / 2)) {
        startPage = Math.max(pages - displayPages + 2, 2);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if there's a gap between the end page and the last page
      if (page < pages - Math.ceil(displayPages / 2)) {
        pageNumbers.push('...');
      }

      // Always show the last page
      if (pages > 1) {
        pageNumbers.push(pages);
      }
    }

    return pageNumbers;
  };

  const onClickHandler = (number,isAdmin)=>{
      if(!isAdmin)
      {
        if(keyword)
        {
          navigate(`/search/${keyword}/page/${number}`)
        }else
        {
          navigate(`/page/${number}`)
        }
      }else
      {
        navigate(`/admin/productlist/${number}`)
      }
  }

  return (
    pages > 1 && (
      <div className="d-flex justify-content-center align-items-center my-3">
        <Pagination>
          {page > 1 && (
            <Pagination.Prev
              as={Link}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${page - 1}`
                    : `/page/${page - 1}`
                  : `/admin/productlist/${page - 1}`
              }
            />
          )}
          {generatePageNumbers().map((number, index) =>
            number === '...' ? (
              <Pagination.Ellipsis key={`${index}_ellipsis`} />
            ) : (
              <Pagination.Item
                onClick={()=>{
                  onClickHandler(number,isAdmin)
                }}
                as={Link}
                key={number}
                active={number === page}
              >
                 
                  {number}
                
              </Pagination.Item>
            )
          )}
          {page < pages && (
            <Pagination.Next
              as={Link}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${page + 1}`
                    : `/page/${page + 1}`
                  : `/admin/productlist/${page + 1}`
              }
            />
          )}
        </Pagination>
      </div>
    )
  );
};


export default Paginate;
