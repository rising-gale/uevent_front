import React from "react";
import Moment from "react-moment"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import Header from '../components/Header';
import { deleteUser } from "../redux/userSlice";
import Tabs from "../components/Tabs";


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { logout } from "../redux/authSlice";

export const Profile = () => {
    // const [activeTab, setActiveTab] = useState('profile')
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const { user } = useSelector(state => state.auth)

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

    if (!user) {
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
        <Header />
        <Tabs/>

        {/* <div className="flex flex-col max-w-[1200px] mx-auto bg-dark-purple">
            <div className="flex flex-row space-x-12">
                <div className='flex rounded-sm max-h-[100px] max-w-[100px]'>
                    {
                        // пока что не понятно, в каком формате будет записан аватар в базе. Пока делаю заглушку
                        <img
                            src={user.avatar}
                            alt='user avatar'
                            className="object-cover w-full rounded-md"
                        />
                    }

                </div>
                <div className="flex flex-col">
                    <div className="text-2xl text-beige">{user.username}</div>
                    <div className="text-md text-beige">{user.full_name}</div>
                    <div className="text-xs text-beige">
                        <Moment date={user.createdAt} format='D MMM YYYY' /></div>
                </div>
                <div className="flex basis-1/5 justify-between">
                    <Link to={`/users/${params.id_user}/edit`} className='text-md rounded-sm'>Edit info</Link>
                    <div>
                        <button className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4" onClick={handleClickOpen}>
                            Delete user
                        </button>
                        <Dialog
                            open={open}
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
                        </Dialog>
                    </div>

                </div>
            </div>
            <div className="flex flex-col">
                <div className="text-xl text-white">{user.username} posts</div>
                <div className="flex flex-col gap-5">
                    {
                        // myPosts?.map((post, index) => (
                        //     <PostItem key={index} post={post} categories={categories} />
                        // ))
                    }

                </div>
            </div>
        </div> */}
    </div>
}