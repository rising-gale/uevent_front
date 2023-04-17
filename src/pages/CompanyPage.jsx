import React from "react";
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import { deleteUser } from "../redux/userSlice";

import TabNavItem from "../components/TabNavItem"
import TabContent from "../components/TabContent";
import '../styles/TabsStyles.css'
import '../styles/ScrollbarStyles.css'


import MemberListItem from "../components/MemberListItem";
import { getUserData, logout } from "../redux/authSlice";
import { getCompanyById, getMembers } from "../redux/companySlice";
import { useEffect } from "react";
import LoadingPage from "./LoadingPage";
import EventCreationForm from "../components/EventCreationForm";
import CompanyEventsContainer from "../components/CompanyEventsContainer";

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
        dispatch(getUserData())
        dispatch(getCompanyById(params.company_id))
        dispatch(getMembers(params.company_id))
    }, [dispatch, params.company_id])

    const arrayItemsCount = (array) => {
        if (array) {
            return array.length
        } else {
            return '0'
        }
    }

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClickCancelDelete = () => {
    //     setOpen(false);
    // };

    // const handleClickDeleteUser = () => {
    //     dispatch(deleteUser(user._id))
    //     setOpen(false);
    //     dispatch(logout())
    //     navigate('/')
    // };

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

    const isOwnerOrMember = () => {
        const idx = user.companies.findIndex(item => item._id === company._id)
        if (user._id === company.admin || idx >= 0) {
            return true
        } else {
            return false

        }
    }

    const returnToEvent = () => {
        navigate(`/events/${params.event_id}`)
    }

    const [isFormOpen, changeFormState] = useState(null);

    const formClose = () => {
        changeFormState(null);
    }

    if (!company) {
        return (
            <div className="bg-dark-purple p-8 opacity-75 h-screen">
                <button
                    className="items-center justify-center leading-none px-4 py-2 text-neutral-300 border border-beige rounded-full hover:text-beige background-transparent font-bold uppercase text-sm outline-none focus:outline-none ease-linear transition-all duration-250"
                    type="button"
                    onClick={returnToEvent}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                    </svg>
                    Back
                </button>
                <LoadingPage />
            </div>)
    }

    return (
        <div className='flex flex-col w-full h-full bg-dark-purple'>
            {isFormOpen && <EventCreationForm closeForm={formClose} />}
            <div className=" h-full w-full flex flex-col bg-opacity-30 bg-pomp-and-power border-opacity-30 text-[2rem] text-center border-[1px] border-beige rounded-[2rem] min-h-[400px] space-y-4 p-6">
                {params.event_id && <button
                    className="flex w-fit items-center justify-start leading-none px-4 py-2 text-neutral-300 border border-beige rounded-full hover:text-beige background-transparent font-bold uppercase text-sm outline-none focus:outline-none ease-linear transition-all duration-250"
                    type="button"
                    onClick={returnToEvent}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                    </svg>
                    Back
                </button>
                }
                <div className="flex flex-row justify-center space-x-4 w-full">

                    <div className="flex w-1/2 flex-col text-[2rem] items-center text-center min-h-[400px]">
                        <div className="justify-center w-40 mt-5 ">
                            <img alt={company?.avatar} className="items-center rounded-[3rem]"
                                src={`http://localhost:3002/${company.avatar}`}
                            />
                        </div>


                        {/* Company name */}
                        <div className="text-[25px] mt-5 text-beige uppercase"><b>{company.company_name}</b></div>

                        {/* Company email */}
                        <div className="text-[20px] mt-8 text-beige text-opacity-80">{company.email}</div>

                        {/* Location */}
                        <p className="text-xl mt-2 text-beige" ><b>{company.location?.description}</b></p>

                        <div className="flex flex-row  mt-5 w-2/3 space-x-8 p-3 justify-center items-center rounded-3xl bg-plum bg-opacity-60">
                            <a target={isSocialLink(company.social_net?.instagram)} href={isLinkExist(company.social_net?.instagram)}>
                                <img className=' w-full max-w-[40px] min-w-[30px]' alt='instagram' src='http://localhost:3000/instagram.png'></img>
                            </a>
                            <a target={isSocialLink(company.social_net?.facebook)} href={isLinkExist(company.social_net?.facebook)}>
                                <img className='w-full max-w-[40px] min-w-[30px]' alt='facebook' src='http://localhost:3000/facebook.png'></img>
                            </a>
                            <a target={isSocialLink(company.social_net?.telegram)} href={isLinkExist(company.social_net?.telegram)}>
                                <img className='w-full max-w-[40px] min-w-[30px]' alt='telegram' src='http://localhost:3000/telegram.png'></img>
                            </a>
                            <a target={isSocialLink(company.social_net?.whatsapp)} href={isLinkExist(company.social_net?.whatsapp)}>
                                <img className='w-full max-w-[40px] min-w-[30px]' alt='whatsapp' src='http://localhost:3000/whatsapp.png'></img>
                            </a>
                            <a target={isSocialLink(company.social_net?.viber)} href={isLinkExist(company.social_net?.viber)}>
                                <img className='w-full max-w-[40px] min-w-[30px]' alt='viber' src='http://localhost:3000/viber.png'></img>
                            </a>
                        </div>

                        {isOwnerOrMember() && <div
                            className="text-[16px] mt-5 flex flex-row space-x-3 px-3 py-2 rounded-3xl hover:bg-opacity-70 bg-beige border-dark-purple text-dark-purple"
                            onClick={() => { changeFormState(true) }}
                        >
                            <img className="w-6" src="http://localhost:3000/plus_dark.png" alt='фищиф' />
                            Create event
                        </div>}
                        {!isOwnerOrMember() && <div
                            className="text-[16px] mt-5 flex flex-row space-x-3 px-3 py-2 rounded-3xl hover:bg-opacity-70 bg-beige border-dark-purple text-dark-purple"
                            onClick={() => { }}
                        >
                            <img className="w-6" src="http://localhost:3000/plus_dark.png" alt='' />
                            Subscribe
                        </div>}
                    </div>

                    {isOwnerOrMember() && <div className="w-1/2">
                        <div className="min-h-[519px] bg-dark-purple bg-opacity-80 p-[1rem] text-sm text-beige border-[2px] border-beige rounded-2xl">

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
                        </div>

                    </div>
                    }

                </div>
                <CompanyEventsContainer company_id={params.company_id} />
                {/* <div className="min-h-[100px] rounded-[1rem] text-xs border-beige border-[1px]">
                Whether you're travelling to the islands or the mountains of Thailand, you're likely to spend at least one night in its capital city on the way. Bangkok might be noisy and polluted but it's also an exciting city with plenty of things to see and do. Why not make it a longer stay?

                Where to stay
                The Khao San Road was a famous traveller spot even before Leonardo di Caprio's character in the film The Beach stayed there. But it's noisy, not very pretty and not very Thai. For something more authentic, Phra Kanong offers an alternative place to stay, with its fantastic street markets where everyday Bangkok people eat, work and live. It's not as convenient for the main tourist sites, but it has a Skytrain station so you can be at the Grand Palace in 20 minutes.

                How to get around
                Bangkok's traffic can be a nightmare. Sure, you can easily take a taxi – if you want to spend hours stuck in traffic jams – but there are two much better ways to get around the city. To explore the temples and historical sites, catch an express boat river taxi or a longtail boat along the Chao Phraya river and the canals. For the modern part of the city, the Skytrain is a fast, cheap way to travel from the river to the shopping malls and nightlife of Sukhumvit, and the famous Chatuchak street market.

                Where to eat
                The simple answer is: everywhere! Thai street food is among the best in the world, and for around $5 you can eat a filling and delicious meal. Some food stands have little plastic seats where you can sit and eat and they cook the same dish over and over, like fried chicken on rice or Pad Thai noodles. Head for Chinatown – Yaowarat Street – and choose whatever looks most interesting from the many excellent Chinese and Thai restaurants and food stands.

                What to do
                After you've seen the main sites like the Giant Buddha at the temple of Wat Pho and the spectacular Grand Palace, and shopped at Chatuchak market, check out the snake farm and watch the live snake show. You can even touch a snake yourself if you want to!
            </div> */}

            </div >
        </div>
    )
}