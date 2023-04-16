import React from "react";
import Moment from "react-moment"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import { deleteUser } from "../redux/userSlice";
import ProfilePageTabs from "../components/TabsProfilePage";

import TabNavItem from "../components/TabNavItem"
import TabContent from "../components/TabContent";
import '../styles/TabsStyles.css'
import '../styles/ScrollbarStyles.css'


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MemberListItem from "../components/MemberListItem";
import MapContainer from "../components/MapContainer";
import { logout } from "../redux/authSlice";
import { getCompanyById } from "../redux/companySlice";
import { useEffect } from "react";

export const CompanyPage = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const { user } = useSelector(state => state.auth)
    const { company } = useSelector((state) => state.company)
    const { members } = useSelector((state) => state.company)

    const [activeTabMembers, setActiveTabMembers] = useState("members")
    
    useEffect(() => {
        dispatch(getCompanyById(params.id))
    }, [dispatch])

    const arrayItemsCount = (array) => {
        if (array) {
          return array.length
        } else {
          return '0'
        }
      }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickCancelDelete = () => {
        setOpen(false);
    };

    const handleClickDeleteUser = () => {
        dispatch(deleteUser(user._id))
        setOpen(false);
        dispatch(logout())
        navigate('/')
    };

    const isSocialLink = (link) => {
        if (link !== '') {
          return "_blank"
        }
        return '_self'
      }
      
      const isLinkExist = (link) => {
        if (link !== ''){
          return link
        } else {
          return null
        } 
      }

    if (!company) {
        return <div className="box-border flex justify-center items-center min-h-[100vh] bg-dark-purple">
            <div className="registerCard">
                <img className="h-[100px] mt-4" src='../uevent_logo.png' alt='logo' />
                <h3 className="uppercase tracking-[2px] text-light-beige mt-4 text-xl">Loading...</h3>
                <p className="text-center text-beige p-2 mb-8">Wait for a minute for loading... If it's loading too long, please, refresh this page.</p>

                <div className="flex flex-col gap-2 pb-12 items-center justify-center">
                    {/* Тут будет спинер с загрузкой.... */}
                    {/* <button onClick={onClickConfirm}>Verify email</button> */}
                </div>

            </div>

        </div>
    }

    return <div className='flex flex-col w-full h-screen bg-dark-purple'>
        {/* <ProfilePageTabs /> */}

        <div className="flex flex-col bg-opacity-30 bg-pomp-and-power border-opacity-30 text-[2rem] items-center text-center border-[1px] border-beige rounded-[2rem] min-h-[400px] space-y-4 p-6">
            <div className="flex flex-row space-x-4 w-full">

                <div className="flex w-1/2 flex-col text-[2rem] items-center text-center min-h-[400px]">
                    <div className="justify-center w-40 mt-5 ">
                        <img alt={company?.avatar} className="items-center rounded-[3rem]"
                            src={`http://localhost:3002/${company.avatar}`}
                        />
                    </div>
                    {/* {
                        updateImage && <div className="rounded-3xl bg-dark-purple w-3/4 h-fit">
                            <div className="p-4 pb-2 items-start justify-start">
                                <button
                                    onClick={onClickCancelImage}
                                    className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4">
                                    Cancel
                                </button>
                            </div>

                            <div className="flex flex-col p-4 justify-center items-center">
                                <label
                                    className="text-gray-300 w-full py-2 px-6 bg-gray-600 text-xs flex items-center justify-center border-2 border-dotted cursor-pointer">
                                    Add image
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => { setNewImage(e.target.files[0]) }}
                                    />
                                </label>
                                <div className="flex object-cover py-2">
                                    {!newImage &&
                                        <img className='w-40' src={`http://localhost:3002/${company?.avatar}`} alt={company?.avatar} />
                                    }
                                    {newImage &&
                                        <img className='w-40' src={URL.createObjectURL(newImage)} alt={newImage.name} />
                                    }
                                </div>
                                <button
                                    onClick={onClickBut}
                                    className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
                                    Save
                                </button>
                            </div>

                        </div>
                    } */}


                    {/* Company name */}
                    <div className="text-[25px]">{company?.company_name}</div>

                    {/* Location */}
                    <p className="text-xl" >{company?.location?.description}</p>

                    <div className="flex flex-row  mt-5 w-2/3 space-x-8 p-3 justify-center items-center rounded-3xl bg-plum bg-opacity-60">
                        <a target={isSocialLink(company.social_net?.instagram)} href={company.social_net?.instagram}>
                            <img className='w-1/7 min-w-[30px]' alt='instagram' src='http://localhost:3000/instagram.png'></img>
                        </a>
                        <a target={isSocialLink(company.social_net?.facebook)} href={company.social_net?.facebook}>
                            <img className='w-1/7 min-w-[30px]' alt='facebook' src='http://localhost:3000/facebook.png'></img>
                        </a>
                        <a target={isSocialLink(company.social_net?.telegram)} href={company.social_net?.telegram}>
                            <img className='w-1/7 min-w-[30px]' alt='telegram' src='http://localhost:3000/telegram.png'></img>
                        </a>
                        <a target={isSocialLink(company.social_net?.whatsapp)} href={company.social_net?.whatsapp}>
                            <img className='w-1/7 min-w-[30px]' alt='whatsapp' src='http://localhost:3000/whatsapp.png'></img>
                        </a>
                        <a target={isSocialLink(company.social_net?.viber)} href={company.social_net?.viber}>
                            <img className='w-1/7 min-w-[30px]' alt='viber' src='http://localhost:3000/viber.png'></img>
                        </a>

                    </div>

                    {/* <div
                        className="text-[16px] mt-5 flex flex-row space-x-3 px-3 py-2 rounded-3xl hover:bg-opacity-70 bg-beige border-dark-purple text-dark-purple"
                        onClick={() => { setEditBoxOpen(true) }}>
                        <img className="w-6" src='editing_icon.png' alt='edit info' />
                        Edit profile
                    </div> */}
                </div>


                <div className="w-1/2">
                    <div className="min-h-[519px] bg-dark-purple bg-opacity-80 p-[1rem] text-sm text-beige border-[2px] border-beige rounded-2xl">
                        {
                            // editBoxOpen &&
                            // <div className="bg-dark-purple w-full rounded-3xl">
                            //     <img
                            //         src='http://localhost:3000/back_icon_beige.png'
                            //         onClick={cancelHandler}
                            //         className="justify-center absolute items-center w-24 rounded-sm py-2 px-4">
                            //     </img>
                            //     <form
                            //         className="w-1/2 mx-auto pb-6"
                            //         onSubmit={(e) => e.preventDefault()}
                            //     >
                            //         <label className="text-sm text-beige">
                            //             Company name<span className="text-2xl text-red-500"> *</span>
                            //             <input type="text"
                            //                 placeholder="Company name"
                            //                 value={state.company_name}
                            //                 name='company_name'
                            //                 onChange={changeHandler}

                            //                 className={`text-black w-full rounded-lg bg-${companyNameColorBg} border py-1 px-2 text-xs outline-none placeholder:text-gray-700`} />
                            //         </label>

                            //         <label className="mb-0 text-sm text-beige">
                            //             Email <span className="text-red-500 text-2xl"> *</span>
                            //             <input type="email"
                            //                 placeholder="email"
                            //                 name='email'
                            //                 value={state.email}

                            //                 onChange={changeHandler}
                            //                 className={`text-black w-full rounded-lg bg-${emailColorBg} border py-1 px-2 text-xs outline-none placeholder:text-gray-700`} />
                            //         </label>

                            //         <label className="text-sm text-beige">
                            //             Location
                            //             <input type="text"
                            //                 placeholder="Fullname"
                            //                 name='location'
                            //                 value={state.location}
                            //                 onChange={changeHandler}
                            //                 className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                            //         </label>

                            //         {/* Adding social nets */}
                            //         <div className="rounded-2xl border-[2px] border-beige bg-lilovii bg-opacity-50 mt-8 mb-6 p-4">
                            //             <div className="text-[18px] uppercase">social nets</div>

                            //             <label className="text-sm text-beige">
                            //                 facebook
                            //                 <input type="text"
                            //                     placeholder="link to your facebook"
                            //                     name='facebook'
                            //                     value={socialNet?.facebook}
                            //                     onChange={changeHandler}
                            //                     className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                            //             </label>
                            //             <label className="text-sm text-beige">
                            //                 instagram
                            //                 <input type="text"
                            //                     placeholder="link to your instagram"
                            //                     name='instagram'
                            //                     value={socialNet?.instagram}
                            //                     onChange={changeHandler}
                            //                     className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                            //             </label>
                            //             <label className="text-sm text-beige">
                            //                 whatsapp
                            //                 <input type="text"
                            //                     placeholder="link to your whatsapp"
                            //                     name='whatsapp'
                            //                     value={socialNet?.whatsapp}
                            //                     onChange={changeHandler}
                            //                     className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                            //             </label>
                            //             <label className="text-sm text-beige">
                            //                 telegram
                            //                 <input type="text"
                            //                     placeholder="link to your telegram"
                            //                     name='telegram'
                            //                     value={socialNet?.telegram}
                            //                     onChange={changeHandler}
                            //                     className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                            //             </label>
                            //             <label className="text-sm text-beige">
                            //                 viber
                            //                 <input type="text"
                            //                     placeholder="link to your viber"
                            //                     name='viber'
                            //                     value={socialNet?.viber}
                            //                     onChange={changeHandler}
                            //                     className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                            //             </label>
                            //         </div>

                            //         <div className="flex gap-8 items-center justify-center mt-4">
                            //             <button
                            //                 onClick={submitHandler}
                            //                 className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
                            //                 Save changes
                            //             </button>
                            //             <button
                            //                 onClick={cancelHandler}
                            //                 className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4">
                            //                 Cancel
                            //             </button>
                            //         </div>
                            //     </form>
                            // </div>
                        }

                        {/* {!editBoxOpen && <> */}
                        <ul className="Horizontalnav">
                            <TabNavItem title={`${arrayItemsCount(members)} members`} id="members" activeTab={activeTabMembers} setActiveTab={setActiveTabMembers} />
                            {/* <TabNavItem title={`${arrayItemsCount(user.subscriptions_events)} followed events`} id="followed_events" activeTab={activeTabCompanies} setActiveTab={setActiveTabCompanies} /> */}
                        </ul>

                        <div>
                            <TabContent id="members" activeTab={activeTabMembers}>

                                {members?.length < 1 &&
                                    <div className="text-beige m-auto text-md h-full w-full">
                                        No members in this company yet...
                                    </div>
                                }
                                {members?.length > 0 &&
                                    <ul className="w-full pr-5 space-y-3 first-letter overflow-y-scroll scrollbar h-[400px]">
                                        {members?.map((member, index) => (
                                            <MemberListItem
                                                key={index}
                                                member={member} />))}
                                    </ul>
                                }
                            </TabContent>
                        </div>
                        {/* </>} */}
                    </div>
                    {/* <div className="rounded-3xl px-2 py-1 mt-4 h-fit text-[18px] bg-red-800 text-beige"
                        onClick={handleClickOpen} >delete account</div>
                    <Dialog
                        open={openDialog}
                        onClose={handleClickCancelDelete}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Deleting user"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Do you really want to delete this user? You can`t turn his/her data back after
                                confirmation deleting.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClickCancelDelete} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleClickDeleteUser} color="primary" autoFocus>
                                Delete user
                            </Button>
                        </DialogActions>
                    </Dialog> */}
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

        </div >
    </div>
}