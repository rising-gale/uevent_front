import React from "react";

const MemberListItem = ({ member }) => {
  const isSocialLink = (link) => {
    if (link !== '') {
      return "_blank"
    }
    return '_self'
  }

  const isLinkExist = (link) => {
    if (link !== '') {
      return link
    } else {
      return null
    }
  }
  return (<>

    <div className="flex flex-row text-sm px-3 py-2 w-full border-[2px] bg-lilovii border-beige text-black rounded-md">
      <img src={`http://localhost:3002/${member.avatar}`} alt='avatar' className="w-1/5 rounded-xl" />
      <div className="flex flex-col w-4/5 align-middle items-center justify-center space-y-3">
        <p className="text-[18px] text-dark-purple"><b>{member.full_name}</b></p>
        <p className="text-[14px] text-dark-purple"><b>{member.username}</b></p>
        <div className="flex flex-row  mt-5 w-fit space-x-1 p-3 justify-center items-center rounded-3xl bg-plum bg-opacity-60">
          <a target={isSocialLink(member.social_net?.instagram)} href={isLinkExist(member.social_net?.instagram)}>
            <img className='w-[30px]' alt='instagram' src='http://localhost:3000/instagram.png'></img>
          </a>
          <a target={isSocialLink(member.social_net?.facebook)} href={isLinkExist(member.social_net?.facebook)}>
            <img className='w-[30px] ' alt='facebook' src='http://localhost:3000/facebook.png'></img>
          </a>
          <a target={isSocialLink(member.social_net?.telegram)} href={isLinkExist(member.social_net?.telegram)}>
            <img className='w-[30px]' alt='telegram' src='http://localhost:3000/telegram.png'></img>
          </a>
          <a target={isSocialLink(member.social_net?.whatsapp)} href={isLinkExist(member.social_net?.whatsapp)}>
            <img className='w-[30px]' alt='whatsapp' src='http://localhost:3000/whatsapp.png'></img>
          </a>
          <a target={isSocialLink(member.social_net?.viber)} href={isLinkExist(member.social_net?.viber)}>
            <img className='w-[30px]' alt='viber' src='http://localhost:3000/viber.png'></img>
          </a>
        </div>
      </div>

    </div>
  </>
  );
};
export default MemberListItem;