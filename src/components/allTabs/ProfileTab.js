import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import TabNavItem from "../TabNavItem"
import TabContent from "../TabContent";
import '../../styles/TabsStyles.css'
import '../../styles/ScrollbarStyles.css'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CompanyListItem from "../CompanyListItem";

const ProfileTab = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const { user } = useSelector(state => state.auth)

  const array1 = [
    { name: 'Company1' },
    { name: 'Company2' },
    { name: 'Company3' },
    { name: 'Company4' },
    { name: 'Company5' },
    { name: 'Company6' },
    { name: 'Company7' },
    { name: 'Company8' },
    { name: 'Company9' },
    { name: 'Company10' },
    { name: 'Company11' }]

  const array2 = [
    { name: 'Created Company1' },
    { name: 'Created Company2' },
    { name: 'Created Company3' },
    { name: 'Created Company4' },
    { name: 'Created Company5' },
    { name: 'Created Company6' },
    { name: 'Created Company7' },
    { name: 'Created Company8' },
    { name: 'Created Company9' },
    { name: 'Created Company10' },
    { name: 'Created Company11' }]


  const arrayItemsCount = (array) => {
    if (array) {
      return array.length
    } else {
      return '0'
    }
  }

  return (
    <div className="flex flex-col bg-beige bg-opacity-5 text-[2rem] items-center text-center border-[1px] border-beige rounded-[2rem] min-h-[400px] space-y-4 p-6">
      <div className="flex flex-row space-x-4 w-full">

        <div className="flex w-1/3 flex-col text-[2rem] items-center text-center min-h-[400px]">
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
              <p>{arrayItemsCount(user.companies)}</p>
              <p className="text-base">My companies</p>
            </div>
          </div>
        </div>

        <div
          className="w-2/3 min-h-[400px] p-[1rem] text-sm text-beige border-[1px] border-beige rounded-2xl">
          <ul
            className="Horizontalnav"
          // className=""
          >
            <TabNavItem title={`${arrayItemsCount(user.subscriptions)} followed companies`} id="following" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabNavItem title={`${arrayItemsCount(user.companies)} created companies`} id="created" activeTab={activeTab} setActiveTab={setActiveTab} />
          </ul>

          <div>
            <TabContent id="following" activeTab={activeTab}>
              <ul className="w-full pr-5 space-y-3 first-letter overflow-y-scroll scrollbar h-[400px]">
                {array1.map((company, index) => (
                  <CompanyListItem
                    key={index}
                    company={company} />
                ))}
              </ul>

            </TabContent>
            <TabContent id="created" activeTab={activeTab}>
              <ul className="w-full pr-5 space-y-3 first-letter overflow-y-scroll scrollbar h-[400px]">
                <div className="text-sm w-full border-[2px] mb-12 py-5 bg-dark-blue-pastel border-purple-900 text-black rounded-md">
                  CREATE A NEW COMPANY
                </div>
                {
                  array2.map((company, index) => (
                    <CompanyListItem
                      key={index}
                      company={company}
                    />
                  ))
                }
              </ul>
            </TabContent>

          </div>
        </div>
      </div>

      <div className="min-h-[100px] rounded-[1rem] text-xs border-beige border-[1px]">
        Whether you're travelling to the islands or the mountains of Thailand, you're likely to spend at least one night in its capital city on the way. Bangkok might be noisy and polluted but it's also an exciting city with plenty of things to see and do. Why not make it a longer stay?

        Where to stay
        The Khao San Road was a famous traveller spot even before Leonardo di Caprio's character in the film The Beach stayed there. But it's noisy, not very pretty and not very Thai. For something more authentic, Phra Kanong offers an alternative place to stay, with its fantastic street markets where everyday Bangkok people eat, work and live. It's not as convenient for the main tourist sites, but it has a Skytrain station so you can be at the Grand Palace in 20 minutes.

        How to get around
        Bangkok's traffic can be a nightmare. Sure, you can easily take a taxi – if you want to spend hours stuck in traffic jams – but there are two much better ways to get around the city. To explore the temples and historical sites, catch an express boat river taxi or a longtail boat along the Chao Phraya river and the canals. For the modern part of the city, the Skytrain is a fast, cheap way to travel from the river to the shopping malls and nightlife of Sukhumvit, and the famous Chatuchak street market.

        Where to eat
        The simple answer is: everywhere! Thai street food is among the best in the world, and for around $5 you can eat a filling and delicious meal. Some food stands have little plastic seats where you can sit and eat and they cook the same dish over and over, like fried chicken on rice or Pad Thai noodles. Head for Chinatown – Yaowarat Street – and choose whatever looks most interesting from the many excellent Chinese and Thai restaurants and food stands.

        What to do
        After you've seen the main sites like the Giant Buddha at the temple of Wat Pho and the spectacular Grand Palace, and shopped at Chatuchak market, check out the snake farm and watch the live snake show. You can even touch a snake yourself if you want to!
      </div>

    </div>
  );
};
export default ProfileTab;