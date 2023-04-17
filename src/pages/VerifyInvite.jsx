import React, { useState } from "react";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUserData } from "../redux/authSlice";
import { getMembers } from "../redux/companySlice";

export const VerifyInvite = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const [text, setText] = useState('This page is the verification page for your account on Chronos. \nClick the button for activating account and verifying email, where this link was sent')

    const [verifyed, setVerifyed] = useState(false)
    const onClickConfirm = async () => {
        const { data } = await axios.get(`http://localhost:3002/api/companies/${params.id}/add-new-member`, { withCredentials: true })
        console.log(data)
        // toast(data.message)
        if (data.message === "You are member now!" || data.message === "You are already a member of this company.") {
            console.log(1)
            setVerifyed(true)
            dispatch(getMembers())
        }
    }

    return <>
        {verifyed && <div className="box-border flex justify-center items-center min-h-[100vh] bg-dark-purple">
            <div className="registerCard">
                <h3 className="uppercase tracking-[2px] text-light-beige mt-4 text-xl">Now you are a member!</h3>
                <p className="text-center text-beige p-2 mb-8">You can close this window for now.</p>
            </div>
        </div>
        }
        {!verifyed && <div className="box-border flex justify-center items-center min-h-[100vh] bg-dark-purple">
            <div className="registerCard">
                <img className="h-[100px] mt-4" src='../uevent_logo.png' alt='logo' />
                <h3 className="uppercase tracking-[2px] text-light-beige mt-4 text-xl">Email verification</h3>
                <p className="text-center text-beige p-2 mb-8">This page is the verification page for your account on service <br /><b>"LET'S GO TOGETHER"</b>. <br />
                    Click the button for activating account and verifying email, where this link was sent</p>

                <div className="flex flex-col gap-2 pb-12 items-center justify-center">
                    <button onClick={onClickConfirm}>Verify email</button>
                </div>

            </div>

        </div>}
    </>
}