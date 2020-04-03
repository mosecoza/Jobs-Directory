import React from 'react'

const Header = ({ title, searchForm, backButton }) => {
  return (
    <div
      style={{ paddingLeft: 24, opacity: 0.8 }}
      className={`d-flex justify-content-between flex-wrap shadow-lg flex-md-nowrap align-items-center pt-3 pb-2  bg-primary border-bottom ${backButton? 'mb-0': 'mb-4'}`}
    >
     <div className="mr-2">{backButton ? backButton : <h6 className="mb-0 text-white">{title ? title : null}</h6>}</div>
      <h6 className="mb-0 text-bold text-capitalize text-white">{backButton ? title : null}</h6>
      <div className="btn-toolbar  mb-2 mb-md-0">
        <div className="mr-2">{searchForm ? searchForm : null}</div>
      </div>
    </div>
  );
};

export default Header;