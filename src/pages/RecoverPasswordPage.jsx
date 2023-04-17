import React, { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { passwordForgot } from "../redux/authSlice"

import '../styles/registerPage.css'
import { toast } from "react-toastify"


export const RecoverPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [errorText, setErrorText] = useState('')
    const [errorVisible, setErrorVisible] = useState(false)

    const { status } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setErrorText(status)
        if (status === 'Re-send the password, please check your email') {
            navigate('/')
        }
    }, [status, navigate])

    const handleSubmit = () => {
        try {
            dispatch(passwordForgot({ email }))
            console.log(status)
            if (status === "Re-send the password, please check your email") {
                console.log(status)
            } 
                toast(status)
                setErrorText(status)
                if (errorText !== '') {
                    setErrorVisible(true)
                } else {
                    setErrorVisible(false)
                }
            

        } catch (error) {
            console.log(error)
        }
    }

    const closeError = () => {
        setErrorVisible(false)
    }

    return (<form
        onSubmit={e => e.preventDefault()}
        className="box-border flex justify-center items-center min-h-[100vh] bg-dark-purple">
        <div className="registerCard">
            <img className="h-[100px] mt-4" src='../uevent_logo.png' alt='logo' />
            <h3 className="uppercase tracking-[2px] text-light-beige mt-4 text-xl">Recover password</h3>
            <div className="relative w-[250px]">
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

                <button type='submit' onClick={handleSubmit} >Send email</button>
                <Link
                    to='/'
                    className="flex justify-center items-center text-xs m-5 text-beige hover:text-gray-200 hover:transition-[1s]"
                >I remember my password</Link>
            </div>

        </div>
    </form>)
}