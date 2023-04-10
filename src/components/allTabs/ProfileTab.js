import React, { useState } from "react";
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
// import { EditUserPage } from "../../pages/EditUserPage";

import { updateUserData } from "../../redux/userSlice"

const ProfileTab = () => {
  const [activeTabCompanies, setActiveTabCompanies] = useState("following")
  const [editBoxOpen, setEditBoxOpen] = useState(false)


  const { user } = useSelector(state => state.user)

  const array1 = [
    { name: 'Company1' },
    { name: 'Company2' },
    { name: 'Company3' },
    { name: 'Company4' },
    { name: 'Company5' },
    { name: 'Company6' },
    { name: 'Company7' },
    { name: 'Company8' },
    { name: 'Company9' },
    { name: 'Company10' },
    { name: 'Company11' }]

  const array2 = [
    { name: 'Created Company1' },
    { name: 'Created Company2' },
    { name: 'Created Company3' },
    { name: 'Created Company4' },
    { name: 'Created Company5' },
    { name: 'Created Company6' },
    { name: 'Created Company7' },
    { name: 'Created Company8' },
    { name: 'Created Company9' },
    { name: 'Created Company10' },
    { name: 'Created Company11' }]


  const arrayItemsCount = (array) => {
    if (array) {
      return array.length
    } else {
      return '0'
    }
  }



  //Part for EditBlock
  //---------------------------------------------------------------------
  const { status } = useSelector((state) => state.user)
  //const { updatedUser } = useSelector((state) => state.user)

  const [username, setUsername] = useState(user.username)
  const [fullname, setFullname] = useState(user.full_name)
  const [oldImage, setOldImage] = useState(user.avatar)
  const [newImage, setNewImage] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState(user.email)
  const [emailColorBg, setEmailColorBg] = useState('gray-400')
  const [loginColorBg, setLoginColorBg] = useState('gray-400')
  const [passwordColorBg, setPasswordColorBg] = useState('gray-400')

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

  const submitHandler = () => {
    try {
      if (username === '' || email === '' || password === '') {
        // if (password === '' && user._id === user1._id) {
        console.log("Fill all required fields")
        return
        // }
      }

      if (!email.includes('@')) {
        setEmailColorBg('red-500')
        //toast("Uncorrect email")
        console.log("Uncorrect email")
        return
      }

      let data = new FormData()
      data.append('id', user._id)
      data.append('username', username)
      data.append('full_name', fullname)
      data.append('avatar', newImage)
      data.append('password', password)
      data.append('email', email)
      if (newPassword !== '') {
        data.append('newPassword', newPassword)
        if (confirmPassword === '') {
          //toast("Please, repeat new password for confirmation")
          console.log("Please, repeat new password for confirmation")
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
      if (status && !user) {
        // toast(status)
        console.log(status)
        return
      }
      // navigate('/profile')
      setEditBoxOpen(false)

    } catch (error) {
      console.log(error)
    }
  }

  const cancelHandler = () => {
    setEditBoxOpen(false)
  }
  //----------------------------------------------------------------------------------------------

  return (
    <div className="flex flex-col bg-opacity-30 bg-pomp-and-power border-opacity-30 text-[2rem] items-center text-center border-[1px] border-beige rounded-[2rem] min-h-[400px] space-y-4 p-6">
      <div className="flex flex-row space-x-4 w-full">
        {
          !editBoxOpen && <>
            <div className="flex w-1/2 flex-col text-[2rem] items-center text-center min-h-[400px]">

              <div className="justify-center w-40 mt-5 ">
                <img alt='user avatar' className="items-center rounded-[3rem]"
                  src={`http://localhost:3002/${user.avatar}`}
                />
              </div>

              <div
                className="text-[16px] mt-5 flex flex-row space-x-3 px-3 py-2 rounded-3xl hover:bg-opacity-70 bg-beige border-dark-purple text-dark-purple"
                //to={`/profile/edit`}
                onClick={() => { setEditBoxOpen(true) }}>
                <img className="w-6" src='editing_icon.png' alt='edit info' />
                Edit profile
              </div>

              {/* Full name */}
              <div className="" value={fullname}
                onChange={e => {
                  setUsername(user.full_name)
                }
                }>{user.full_name}</div>

              {/* Nickname */}
              <div className="text-xl">{user.username}</div>


            </div>

            <div className="w-1/2 min-h-[519px] bg-dark-purple bg-opacity-80 p-[1rem] text-sm text-beige border-[2px] border-beige rounded-2xl">
              <ul className="Horizontalnav">
                <TabNavItem title={`${arrayItemsCount(user.subscriptions_companies)} followed companies`} id="following" activeTab={activeTabCompanies} setActiveTab={setActiveTabCompanies} />
                <TabNavItem title={`${arrayItemsCount(user.companies)} created companies`} id="created" activeTab={activeTabCompanies} setActiveTab={setActiveTabCompanies} />
              </ul>

              <div>
                <TabContent id="following" activeTab={activeTabCompanies}>
                  <ul className="w-full pr-5 space-y-3 first-letter overflow-y-scroll scrollbar h-[400px]">
                    {array1.map((company, index) => (
                      <CompanyListItem
                        key={index}
                        company={company} />
                    ))}
                  </ul>

                </TabContent>
                <TabContent id="created" activeTab={activeTabCompanies}>
                  <ul className="w-full pr-5 space-y-3 first-letter overflow-y-scroll scrollbar h-[400px]">
                    <div className="text-sm w-full border-[2px] mb-12 py-5 bg-dark-blue-pastel border-purple-900 text-black rounded-md">
                      CREATE A NEW COMPANY
                    </div>
                    {
                      array2.map((company, index) => (
                        <CompanyListItem
                          key={index}
                          company={company}
                        />
                      ))
                    }
                  </ul>
                </TabContent>

              </div>
            </div>
          </>
        }

        {
          editBoxOpen &&
          // <EditUserPage user={user} func={(submit) => {
          //   if (submit) {
          //     setEditBoxOpen(false)
          //   } else {
          //     setEditBoxOpen(true)
          //   }
          // }} />
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
        }
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