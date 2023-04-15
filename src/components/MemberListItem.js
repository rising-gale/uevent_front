import React from "react";

const MemberListItem = ({member}) => {
  return (
    <div className="text-sm py-2 w-full border-[2px] bg-lilovii border-beige text-black rounded-md">
        {member.user_name}
    </div>
  );
};
export default MemberListItem;