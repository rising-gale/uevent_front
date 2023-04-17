import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { verifyPassword } from "../redux/authSlice";

export const ResetPasswordPage = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()

    const { status } = useSelector((state) => state.auth)

    const [newPassword, setNewPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [errorText, setErrorText] = useState('')
    const [errorVisible, setErrorVisible] = useState(false)

    useEffect(() => {
        setErrorText(status)
        if (status === 'Your password was changed') {
            navigate('/')
        } 
    }, [status, navigate])

    const handleSubmit = () => {
        try {
            if (newPassword === repeatPassword) {
                dispatch(verifyPassword({
                    new_password: newPassword,
                    confirm_password: repeatPassword,
                    token: params.token
                }))
                setErrorText(status)
            } else {
                setErrorText("Passwords do not match")
            }

            if (status === 'Your password was changed') {
                
                navigate('/')
            } else {
                if (errorText !== '') {
                    setErrorVisible(true)
                } else {
                    setErrorVisible(false)
                }
            }
            

            
        } catch (error) {
            console.log(error)
        }
    }

    const closeError = () => {
        setErrorVisible(false)
    }

    return <form
        onSubmit={e => e.preventDefault()}
        className="box-border flex justify-center items-center min-h-[100vh] bg-dark-purple">
        <div className="registerCard">
            <img className="h-[100px] mt-4" src='../uevent_logo.png' alt='logo' />
            <h3 className="uppercase tracking-[2px] text-light-beige mt-2 text-xl">Reset password</h3>
            <div className="relative w-[250px]">
                <input
                    type="password"
                    required="required"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)} />
                <span className="password-span">New password</span>
            </div>
            <div className="relative w-[250px]">
                <input
                    type="password"
                    required="required"
                    value={repeatPassword}
                    onChange={e => setRepeatPassword(e.target.value)} />
                <span className="password-span">Repeat password</span>
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

                    <p className="items-center text-sm mb-2 text-yellow-500"><b>{errorText}</b></p>

                </div>
            }
            <div className="flex flex-col gap-2 pb-12 items-center justify-center">
                <button onClick={handleSubmit} >Confirm</button>
            </div>

        </div>
    </form>
}