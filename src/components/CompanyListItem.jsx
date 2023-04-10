import React from "react";

const CompanyListItem = ({company}) => {
  return (
    <div className="text-sm py-2 w-full border-[2px] bg-lilovii border-beige text-black rounded-md">
        {company.name}
    </div>
  );
};
export default CompanyListItem;