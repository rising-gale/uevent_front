import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

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

import { updateUserData, uploadUserAvatar } from "../../redux/userSlice"
import EventInFavourite from "../EventInFavourite";

const ProfileTab = () => {
  const [activeTabCompanies, setActiveTabCompanies] = useState("following_companies")
  const [editBoxOpen, setEditBoxOpen] = useState(false)
  const [updateImage, setUpdateImage] = useState(false)

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  // const array1 = [
  //   { name: 'Company1' },
  //   { name: 'Company2' },
  //   { name: 'Company3' },
  //   { name: 'Company4' },
  //   { name: 'Company5' },
  //   { name: 'Company6' },
  //   { name: 'Company7' },
  //   { name: 'Company8' },
  //   { name: 'Company9' },
  //   { name: 'Company10' },
  //   { name: 'Company11' }]

  // const array2 = [
  //   { name: 'Created Company1' },
  //   { name: 'Created Company2' },
  //   { name: 'Created Company3' },
  //   { name: 'Created Company4' },
  //   { name: 'Created Company5' },
  //   { name: 'Created Company6' },
  //   { name: 'Created Company7' },
  //   { name: 'Created Company8' },
  //   { name: 'Created Company9' },
  //   { name: 'Created Company10' },
  //   { name: 'Created Company11' }]


  const arrayItemsCount = (array) => {
    if (array) {
      return array.length
    } else {
      return '0'
    }
  }

  const [state, setState] = useState({
    username: user.username,
    full_name: user.full_name,
    password: '',
    oldPassword: '',

    email: user.email,
    companies: user.companies,
    my_social_net: user.social_net
  })

  //Part for EditBlock
  //---------------------------------------------------------------------
  const { status } = useSelector((state) => state.user)

  const [confirmPassword, setConfirmPassword] = useState('')
  const [newImage, setNewImage] = useState(null)
  const [emailColorBg, setEmailColorBg] = useState('gray-400')
  const [loginColorBg, setLoginColorBg] = useState('gray-400')
  const [passwordColorBg, setPasswordColorBg] = useState('gray-400')

  const submitHandler = () => {
    try {
      if (state.username === '' || state.email === '' || state.oldPassword === '') {
        console.log("Fill all required fields")
        return
      }

      if (!state.email.includes('@')) {
        setEmailColorBg('red-500')
        console.log("Uncorrect email")
        return
      }

      if (state.password !== '') {
        if (confirmPassword === '') {
          console.log("Please, repeat new password for confirmation")
          return
        }
        if (state.password !== confirmPassword) {
          console.log("New password and its confirmation are different. Please, try again.")
          setState(prevState => ({
            ...prevState,
            password: ''
          }))
          setConfirmPassword('')
          return
        }
      }

      dispatch(updateUserData(state))

      if (status && !user) {
        console.log(status)
        return
      }
      setEditBoxOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  const onClickBut = () => {
    let data = new FormData()
    data.append('files', newImage)
    console.log(data)
    dispatch(uploadUserAvatar(data))
    setNewImage(null)
    setUpdateImage(false)
  }

  const onClickCancelImage = () => {
    setNewImage(null)
    setUpdateImage(false)
  }

  const changeHandler = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'username': {
        if (value === '') {
          setLoginColorBg('red-500')
        } else {
          setLoginColorBg('gray-400')
        }
        setState(prevState => ({
          ...prevState,
          [name]: value,
          errMessage: ''
        }));
        break;
      }
      case 'email': {
        if (value === '' || !value.includes('@')) {
          setEmailColorBg('red-500')
        } else {
          setEmailColorBg('gray-400')
        }
        setState(prevState => ({
          ...prevState,
          [name]: value,
          errMessage: ''
        }));
        break;
      }
      case 'oldPassword': {
        if (value === '') {
          setPasswordColorBg('red-500')
        } else {
          setPasswordColorBg('gray-400')
        }
        setState(prevState => ({
          ...prevState,
          'oldPassword': value,
          errMessage: ''
        }));
        break;
      }
      case 'instagram': {
        
        break;
      }
      case 'facebook': {
        
        break;
      }
      case 'viber': {
        
        break;
      }
      case 'telegram': {
        
        break;
      }
      case 'whatsapp': {
        
        break;
      }
      default: {
        setState(prevState => ({
          ...prevState,
          [name]: value,
          errMessage: ''
        }));
      }
    }
  }

  const cancelHandler = () => {
    setState(({
      id: user._id,
      username: user.username,
      full_name: user.full_name,
      password: '',
      oldPassword: '',

      email: user.email,
      companies: user.companies,
      my_social_net: user.social_net
    }))
    setEditBoxOpen(false)
  }

  //----------------------------------------------------------------------------------------------

  return (
    <div className="flex flex-col bg-opacity-30 bg-pomp-and-power border-opacity-30 text-[2rem] items-center text-center border-[1px] border-beige rounded-[2rem] min-h-[400px] space-y-4 p-6">
      <div className="flex flex-row space-x-4 w-full">

        <div className="flex w-1/2 flex-col text-[2rem] items-center text-center min-h-[400px]">

          {!updateImage && <>
            <div className="justify-center w-40 mt-5 ">
              <img alt={user.avatar} className="items-center rounded-[3rem]"
                src={`http://localhost:3002/${user.avatar}`}
              />
            </div>
            <div
              className="text-[12px] mt-2 mb-8 flex flex-row space-x-3 px-3 py-2 rounded-3xl hover:bg-opacity-70 bg-beige border-dark-purple text-dark-purple"
              onClick={() => { setUpdateImage(true) }}>
              <img className="w-4" src='editing_icon.png' alt='edit info' />
              Change avatar
            </div>
          </>

          }
          {
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
                    <img className='w-40' src={`http://localhost:3002/${user.avatar}`} alt={user.avatar} />
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
          }


          {/* Full name */}
          <div className="text-[25px]">{user.full_name}</div>

          {/* Nickname */}
          <p className="text-xl" >{user.username}</p>

          <div className="flex flex-row  mt-5 w-2/3 space-x-8 p-3 justify-center items-center rounded-3xl bg-plum bg-opacity-60">
            <a
              // href='https://www.instagram.com/?hl=ru' 
              target="_blank"
              href={user.social_net?.instagram}
            >
              <img className='w-1/7 min-w-[30px]' alt='instagram' src='http://localhost:3000/instagram.png'></img>
            </a>
            <a
              // href='https://www.facebook.com/' 
              target="_blank"
              href={user.social_net?.facebook}
            >
              <img className='w-1/7 min-w-[30px]' alt='facebook' src='http://localhost:3000/facebook.png'></img>
            </a>
            <a
              // href='https://web.telegram.org/z/' 
              target="_blank"
              href={user.social_net?.telegram}
            >
              <img className='w-1/7 min-w-[30px]' alt='telegram' src='http://localhost:3000/telegram.png'></img>
            </a>
            <a
              // href='https://www.whatsapp.com/' 
              target="_blank"
              href={user.social_net?.whatsapp}
            >
              <img className='w-1/7 min-w-[30px]' alt='whatsapp' src='http://localhost:3000/whatsapp.png'></img>
            </a>
            <a
              // href='https://www.viber.com/ua/' 
              target="_blank"
              href={user.social_net?.viber}
            >
              <img className='w-1/7 min-w-[30px]' alt='viber' src='http://localhost:3000/viber.png'></img>
            </a>

          </div>

          <div
            className="text-[16px] mt-5 flex flex-row space-x-3 px-3 py-2 rounded-3xl hover:bg-opacity-70 bg-beige border-dark-purple text-dark-purple"
            onClick={() => { setEditBoxOpen(true) }}>
            <img className="w-6" src='editing_icon.png' alt='edit info' />
            Edit profile
          </div>
        </div>



        <div className="w-1/2 min-h-[519px] bg-dark-purple bg-opacity-80 p-[1rem] text-sm text-beige border-[2px] border-beige rounded-2xl">
          {
            editBoxOpen &&
            <div className="bg-dark-purple w-full rounded-3xl">
              <img
                src='http://localhost:3000/back_icon_beige.png'
                onClick={cancelHandler}
                className="justify-center absolute items-center w-24 rounded-sm py-2 px-4">
              </img>
              <form
                className="w-1/2 mx-auto pb-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <label className="text-sm text-beige">
                  Username (login) <span className="text-2xl text-red-500"> *</span>
                  <input type="text"
                    placeholder="Username"
                    value={state.username}
                    name='username'
                    onChange={changeHandler}

                    className={`text-black w-full rounded-lg bg-${loginColorBg} border py-1 px-2 text-xs outline-none placeholder:text-gray-700`} />
                </label>

                <label className="mb-0 text-sm text-beige">
                  Email <span className="text-red-500 text-2xl"> *</span>
                  <input type="email"
                    placeholder="email"
                    name='email'
                    value={state.email}

                    onChange={changeHandler}
                    className={`text-black w-full rounded-lg bg-${emailColorBg} border py-1 px-2 text-xs outline-none placeholder:text-gray-700`} />
                </label>

                <label className="text-sm text-beige">
                  Full name
                  <input type="text"
                    placeholder="Fullname"
                    name='full_name'
                    value={state.full_name}
                    onChange={changeHandler}
                    className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                </label>

                <div className="rounded-2xl border-[2px] border-beige bg-lilovii bg-opacity-50 mt-8 mb-6 p-4">
                  <div className="text-[18px] uppercase">social nets</div>

                  <label className="text-sm text-beige">
                    facebook
                    <input type="text"
                      placeholder="link to your facebook"
                      name='facebook'
                      value={state.my_social_net?.facebook}
                      onChange={changeHandler}
                      className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                  </label>
                  <label className="text-sm text-beige">
                    instagram
                    <input type="text"
                      placeholder="link to your instagram"
                      name='instagram'
                      value={state.my_social_net?.instagram}
                      onChange={changeHandler}
                      className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                  </label>
                  <label className="text-sm text-beige">
                    whatsapp
                    <input type="text"
                      placeholder="link to your whatsapp"
                      name='whatsapp'
                      value={state.my_social_net?.whatsapp}
                      onChange={changeHandler}
                      className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                  </label>
                  <label className="text-sm text-beige">
                    telegram
                    <input type="text"
                      placeholder="link to your telegram"
                      name='telegram'
                      value={state.my_social_net?.telegram}
                      onChange={changeHandler}
                      className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                  </label>
                  <label className="text-sm text-beige">
                    viber
                    <input type="text"
                      placeholder="link to your viber"
                      name='viber'
                      value={state.my_social_net?.viber}
                      onChange={changeHandler}
                      className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                  </label>
                </div>

                <div className="rounded-2xl border-[2px] border-beige bg-lilovii bg-opacity-50 mt-8 mb-6 p-4">
                  <div className="text-[18px] uppercase">Change password</div>

                  <label className="text-xs text-gray-400">
                    New password
                    <input
                      type="password"
                      value={state.password}
                      name='password'
                      onChange={changeHandler}
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
                </div>


                <label className="text-sm text-beige mt-6">
                  Current password <span className="text-2xl text-red-700"> *</span>
                  <input
                    type="password"
                    value={state.oldPassword}
                    name='oldPassword'
                    onChange={changeHandler}
                    placeholder="current password"
                    className={` text-black w-full rounded-lg bg-${passwordColorBg} border py-1 px-2 text-xs outline-none placeholder:text-gray-700`}
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
          }

          {!editBoxOpen && <>
            <ul className="Horizontalnav">
              <TabNavItem title={`${arrayItemsCount(user.subscriptions_companies)} followed companies`} id="following_companies" activeTab={activeTabCompanies} setActiveTab={setActiveTabCompanies} />
              <TabNavItem title={`${arrayItemsCount(user.subscriptions_events)} followed events`} id="followed_events" activeTab={activeTabCompanies} setActiveTab={setActiveTabCompanies} />
            </ul>

            <div>
              <TabContent id="following_companies" activeTab={activeTabCompanies}>

                {
                  user.subscriptions_companies.length < 1 &&
                  <div className="text-beige m-auto text-md h-full w-full">
                    You don't follow any company yet...
                  </div>
                }
                {user.subscriptions_companies.length > 0 &&
                  <ul className="w-full pr-5 space-y-3 first-letter overflow-y-scroll scrollbar h-[400px]">
                    {
                      user?.subscriptions_companies.map((company, index) => (
                        <CompanyListItem
                          key={index}
                          company={company} />
                      ))}
                  </ul>
                }

              </TabContent>
              <TabContent id="followed_events" activeTab={activeTabCompanies}>
                <ul className="w-full pr-5 space-y-3 first-letter overflow-y-scroll scrollbar h-[400px]">
                  <div className="text-sm w-full border-[2px] mb-12 py-5 bg-dark-blue-pastel border-purple-900 text-black rounded-md">
                    CREATE A NEW COMPANY
                  </div>
                  {
                    user?.subscriptions_events.map((event, index) => (
                      <CompanyListItem
                        key={index}
                        company={event}
                      />
                    ))
                  }
                </ul>
              </TabContent>

            </div>
          </>}
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
  );
};
export default ProfileTab;