import React from "react";

const UserPage = ({ user, openUserInfo, closeForm }) => {
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

  return (<>{openUserInfo &&
    <div className="text-white w-1/3 justify-center items-center flex overflow-x-hidden align-middle m-20 overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-600">
      <div className="relative my-2 mx-auto w-2/3">
        <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
          <h3 className="text-xl pl-4 items-center font-semibold text-light-grey-pastel font-serif">
            User Info
          </h3>
          <button
            className="p-1 ml-auto bg-transparent border-0 text-black opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={closeForm}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col w-full text-[2rem] items-center text-center min-h-[400px]">
          <div className="justify-center w-40 mt-5 ">
            <img alt={user.avatar} className="items-center rounded-[3rem]"
              src={`http://localhost:3002/${user.avatar}`}
            />
          </div>

          {/* Full name */}
          <div className="text-[25px]">{user.full_name}</div>

          {/* Nickname */}
          <p className="text-xl" >{user.username}</p>

          <div className="flex flex-row  mt-5 w-full space-x-4 p-3 justify-center items-center rounded-3xl bg-plum bg-opacity-60">
            <a target={isSocialLink(user.social_net?.instagram)} href={isLinkExist(user.social_net?.instagram)}>
              <img className='w-1/7 min-w-[30px]' alt='instagram' src='http://localhost:3000/instagram.png'></img>
            </a>
            <a target={isSocialLink(user.social_net?.facebook)} href={isLinkExist(user.social_net?.facebook)}>
              <img className='w-1/7 min-w-[30px]' alt='facebook' src='http://localhost:3000/facebook.png'></img>
            </a>
            <a target={isSocialLink(user.social_net?.telegram)} href={isLinkExist(user.social_net?.telegram)}>
              <img className='w-1/7 min-w-[30px]' alt='telegram' src='http://localhost:3000/telegram.png'></img>
            </a>
            <a target={isSocialLink(user.social_net?.whatsapp)} href={isLinkExist(user.social_net?.whatsapp)}>
              <img className='w-1/7 min-w-[30px]' alt='whatsapp' src='http://localhost:3000/whatsapp.png'></img>
            </a>
            <a target={isSocialLink(user.social_net?.viber)} href={isLinkExist(user.social_net?.viber)}>
              <img className='w-1/7 min-w-[30px]' alt='viber' src='http://localhost:3000/viber.png'></img>
            </a>
          </div>
        </div>
      </div>
    </div >
  }</>
  );
};
export default UserPage;