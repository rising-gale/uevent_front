import React from "react";
import { useSelector } from "react-redux";

const ProfileTab = () => {
  const arrayItemsCount = (array) => {
    if (array) {
      return array.length
    } else {
      return '0'
    }
  }
  const { user } = useSelector(state => state.auth)
  return (
    <div className="flex flex-col bg-beige bg-opacity-5 text-[2rem] items-center text-center border-[1px] border-beige rounded-[2rem] min-h-[400px]">
      <div className="justify-center w-40 mt-5">
        <img alt='user avatar' className="items-center rounded-[3rem]"
          //src={`http://localhost:3002/${user.avatar}`}
          src={user.avatar} />
      </div>

      {/* Full name */}
      <div className="">{user.full_name}</div>

      {/* Nickname */}
      <div className="text-xl">{user.username}</div>
      
      {/* Колво подписок на компании. 
      Кнопка открывающая модальное окно со списком компаний, 
      на которые подписался юзер */}
      <div className="flex flex-row space-x-20">
        <div className="flex flex-col items-center bg-dark-blue-pastel hover:bg-opacity-60 bg-opacity-20 border-beige border-[1px] rounded-[1rem] p-2">
          <p>{arrayItemsCount(user.subscriptions)}</p>
          <p className="text-base">My followings</p>
        </div>

        <div className="flex flex-col items-center bg-dark-blue-pastel hover:bg-opacity-60 bg-opacity-20 border-beige border-[1px] rounded-[1rem] p-2">
          <p>{arrayItemsCount(user.subscriptions)}</p>
          <p className="text-base">My companies</p>
        </div>
      </div>

    </div>
  );
};
export default ProfileTab;