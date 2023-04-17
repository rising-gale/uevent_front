import React from "react";
import { useSelector } from 'react-redux'
import ProfilePageTabs from "../components/TabsProfilePage";

export const Profile = () => {
    const { user } = useSelector(state => state.auth)

    if (!user) {
        return <div className="box-border flex justify-center items-center min-h-[100vh] bg-dark-purple">
            <div className="registerCard">
                <img className="h-[100px] mt-4" src='../uevent_logo.png' alt='logo' />
                <h3 className="uppercase tracking-[2px] text-light-beige mt-4 text-xl">Loading...</h3>
                <p className="text-center text-beige p-2 mb-8">Wait for a minute for loading... If it's loading too long, please, refresh this page.</p>
                <div className="flex flex-col gap-2 pb-12 items-center justify-center">
                </div>
            </div>
        </div>
    }

    return <div className='flex flex-col w-full h-screen bg-dark-purple'>
        <ProfilePageTabs />
    </div>
}