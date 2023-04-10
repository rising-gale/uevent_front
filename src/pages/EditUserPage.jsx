import React from "react"
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { updateUserData, getUserData } from "../redux/userSlice"
import axios from 'axios'

// import "@material/react-chips/dist/chips.css"
import { toast } from "react-toastify"
import { useEffect } from "react"

export const EditUserPage = ({user}) => {
    // const { user } = useSelector((state) => state.user)
    const { status } = useSelector((state) => state.user)
    const { updatedUser } = useSelector((state) => state.user)

    const [username, setUsername] = useState(user.username)
    const [fullname, setFullname] = useState(user.full_name)
    const [oldImage, setOldImage] = useState(user.avatar)
    const [newImage, setNewImage] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState(user.email)
    // const [role, setRole] = useState('')
    const [emailColorBg, setEmailColorBg] = useState('gray-400')
    const [loginColorBg, setLoginColorBg] = useState('gray-400')
    const [passwordColorBg, setPasswordColorBg] = useState('gray-400')

    // const params = useParams()

    // const fillOldUserData = (user) => {
    //     setUsername(user.username)
    //     setFullname(user.full_name)
    //     setOldImage(user.avatar)
    //     setEmail(user.email)

    //     console.log(user.avatar)
    // }

    // const [user1, setUser] = useState(async () => {
    //     const { data } = await axios.get('http://localhost:3002/api/auth/me')
    //     console.log(data)
    //     setUser(data)
    //     fillOldUserData(data)
    // })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // useEffect(() => {
    //     dispatch(getUserData())
    // }, [dispatch])

    const submitHandler = () => {
        try {
            if (username === '' || email === '' || password === '') {
                // console.log(me.role)
                // if (password === '' && user._id === user1._id) {
                    console.log("Fill all required fields")
                    return
                // }
            }

            if (!email.includes('@')) {
                setEmailColorBg('red-500')
                toast("Uncorrect email")
                console.log("Uncorrect email")
                return
            }

            let data = new FormData()
            data.append('id', user._id)
            data.append('username', username)
            data.append('full_name', fullname)
            // data.append('avatar', newImage)
            data.append('password', password)
            data.append('email', email)
            if (newPassword !== '') {
                data.append('newPassword', newPassword)
                if (confirmPassword === '') {
                    toast("Please, repeat new password for confirmation")
                    return
                }
                data.append('confirmPassword', confirmPassword)
            } else {
                data.append('newPassword', '')
                data.append('confirmPassword', '')
            }

            // for(var pair of data.entries()){
            //     console.log("", pair[0]+', '+pair[1])
            // }

            dispatch(updateUserData(data))
            if (status && !updatedUser) {
                // toast(status)
                console.log(status)
                return
            }
            // navigate('/profile')

        } catch (error) {
            console.log(error)
        }
    }

    const cancelHandler = () => {
        // navigate('/profile')
    }

    return (
        <div className="bg-dark-purple">
            <form
                className="w-1/3 mx-auto py-10"
                onSubmit={(e) => e.preventDefault()}
            >
                <label
                    className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
                    Add image
                    <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                            setNewImage(e.target.files[0])
                            // console.log(e.target.files[0])
                            setOldImage('')
                        }} />
                </label>
                <div className="flex object-cover py-2">
                    {oldImage &&
                        <img src={`http://localhost:3002/${oldImage}`} alt={oldImage.name} />
                        
                    }
                    {newImage &&
                        <img src={URL.createObjectURL(newImage)} alt={newImage.name} />
                    }
                </div>

                <label className="text-md text-white opacity-70">
                    Username (login) <span className="text-2xl text-red-500"> *</span>
                    <input type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => {
                            setUsername(e.target.value)
                            if (e.target.value === '') {
                                setLoginColorBg('red-500')
                            } else {
                                setLoginColorBg('gray-400')
                            }
                        }
                        }
                        className={`mt-1 text-black w-full rounded-lg bg-${loginColorBg} border py-1 px-2 text-xs outline-none placeholder:text-gray-700`} />
                </label>

                <label className="text-md text-white opacity-70">
                    Email <span className="text-red-500 text-2xl"> *</span>
                    <input type="email"
                        placeholder="email"
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value)
                            if (e.target.value === '') {
                                setEmailColorBg('red-500')
                            } else {
                                setEmailColorBg('gray-400')
                            }
                        }
                        }
                        className={`mt-1 text-black w-full rounded-lg bg-${emailColorBg} border py-1 px-2 text-xs outline-none placeholder:text-gray-700`} />
                </label>

                <label className="text-md text-white opacity-70">
                    Full name
                    <input type="text"
                        placeholder="Fullname"
                        value={fullname}
                        onChange={e => setFullname(e.target.value)}
                        className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                </label>


                <div>Change password</div>
                <label className="text-md text-white">
                    Current password <span className="text-2xl text-red-700"> *</span>
                    <input
                        type="password"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value)
                            if (e.target.value === '') {
                                setPasswordColorBg('red-500')
                            } else {
                                setPasswordColorBg('gray-400')
                            }
                        }}
                        placeholder="current password"
                        className={`mt-1 text-black w-full rounded-lg bg-${passwordColorBg} border py-1 px-2 text-xs outline-none placeholder:text-gray-700`}
                    />
                </label>
                <label className="text-xs text-gray-400">
                    New password
                    <input
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="new password"
                        className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
                    />
                </label>
                <label className="text-xs text-gray-400">
                    Confirm new password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="repeat new password"
                        className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
                    />
                </label>

                <div className="flex gap-8 items-center justify-center mt-4">
                    <button
                        onClick={submitHandler}
                        className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
                        Save changes
                    </button>
                    <button
                        onClick={cancelHandler}
                        className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4">
                        Cancel
                    </button>
                </div>
            </form>
        </div>

    )
}