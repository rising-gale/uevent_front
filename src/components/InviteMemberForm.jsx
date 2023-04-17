import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { inviteMember } from "../redux/companySlice";
import { useState, useEffect } from "react";

import '../styles/registerPage.css'

const InviteMemberForm = ({ closeForm }) => {
    const [email, setEmail] = useState('')
    const [errorText, setErrorText] = useState('')
    const [errorVisible, setErrorVisible] = useState(false)

    const { company } = useSelector((state) => state.company)
    const { status } = useSelector((state) => state.company)
    const dispatch = useDispatch()

    useEffect(() => {
        setErrorText(status)
        if (status === "An Email was sent") {
            closeForm()
        }
    }, [status])


    const submitInvite = () => {
        if (!email.includes('@')) {
            console.log("Uncorrect email")
            return
        }
        dispatch(inviteMember({ email, id: company._id }))
        console.log(status)
        if (status === "An Email was sent") {
            closeForm()
        }
    }

    const closeError = () => {
        setErrorVisible(false)
    }



    return (
        <div className=" text-white justify-center text-[16px] items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-700 bg-opacity-50">
            <div className="relative my-3 mx-auto w-1/3">
                {/*content*/}
                <div className="registerCard">
                    <h3 className="uppercase tracking-[2px] text-light-beige mt-4 text-xl">Invite member</h3>
                    <div className="relative w-[280px]">
                        <input
                            type="text"
                            required="required"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                        <span className="loginSpan">Email</span>
                    </div>
                    {
                        errorVisible &&
                        <div className="flex flex-col rounded-lg bg-purple-400 p-2 pt-1 bg-opacity-20 border-0">
                            <div className="flex justify-end">
                                <Link
                                    className="flex text-center justify-center w-fit h-fit rounded-sm pr-1 pl-1 text-xs text-beige"
                                    onClick={closeError}
                                >x</Link>
                            </div>

                            <p className="items-center text-sm mb-2 text-beige"><b>{errorText}</b></p>

                        </div>
                    }

                    <div className="flex flex-col gap-2 items-center justify-center">

                        <button type='submit' onClick={submitInvite} >Send email</button>
                        <div className="text-[18px] text-beige mt-3 hover:text-white" onClick={closeForm} >Cancel</div>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default InviteMemberForm;