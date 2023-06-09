import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TabNavItem from "../TabNavItem"
import TabContent from "../TabContent";
import '../../styles/TabsStyles.css'
import '../../styles/ScrollbarStyles.css'
import { createCompany, createPromo, deleteCompany, getPromo, updateCompanyData, uploadCompanyAvatar } from "../../redux/companySlice";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MemberListItem from "../MemberListItem";
import MapContainer from "../MapContainer";
import InviteMemberForm from "../InviteMemberForm";

const defaultLocation = { lat: 50.449709821421386, lng: 30.52762771951049 };

const MyCompanyTab = () => {

  const [activeTabMembers, setActiveTabMembers] = useState("members")
  const [editBoxOpen, setEditBoxOpen] = useState(false)
  const [updateImage, setUpdateImage] = useState(false)
  const [createCompanyBlock, setCreateCompanyBlock] = useState(false)

  const dispatch = useDispatch()

  const { company } = useSelector((state) => state.company)
  const { members } = useSelector((state) => state.company)

  const [socialNet, setSocialNet] = useState({
    instagram: company?.social_net?.instagram,
    facebook: company?.social_net?.facebook,
    viber: company?.social_net?.viber,
    telegram: company?.social_net?.telegram,
    whatsapp: company?.social_net?.whatsapp
  })

  const [state, setState] = useState({
    id: company?._id,
    company_name: company?.company_name,
    email: company?.email
  })

  const arrayItemsCount = (array) => {
    if (array) { return array.length } else { return '0' }
  }

  const { status } = useSelector((state) => state.company)

  const [newImage, setNewImage] = useState(null)
  const [emailColorBg, setEmailColorBg] = useState('gray-400')
  const [companyNameColorBg, setCompanyNameColorBg] = useState('gray-400')
  const [location, setLocation] = useState(() => {
    if (company?.location) {
      return (company.location)
    } else {
      return { lat: 50.449709821421386, lng: 30.52762771951049 }
    }
  });

  const submitHandler = () => {
    try {
      if (state.company_name === '' || state.email === '') {
        console.log("Fill all required fields")
        return
      }
      if (!state.email.includes('@')) {
        setEmailColorBg('red-500')
        console.log("Uncorrect email")
        return
      }
      // console.log(state)
      dispatch(updateCompanyData({ ...state, location, my_social_net: socialNet }))

      if (status && !company) {
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
    data.append('id', company?._id)
    data.append('files', newImage)
    dispatch(uploadCompanyAvatar(data))
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
      case 'company_name': {
        if (value === '') {
          setCompanyNameColorBg('red-500')
        } else {
          setCompanyNameColorBg('gray-400')
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
      case 'instagram': {
        setSocialNet(prevState => ({
          ...prevState,
          [name]: value
        }))
        break;
      }
      case 'facebook': {
        setSocialNet(prevState => ({
          ...prevState,
          [name]: value
        }))
        break;
      }
      case 'viber': {
        setSocialNet(prevState => ({
          ...prevState,
          [name]: value
        }))
        break;
      }
      case 'telegram': {
        setSocialNet(prevState => ({
          ...prevState,
          [name]: value
        }))
        break;
      }
      case 'whatsapp': {
        setSocialNet(prevState => ({
          ...prevState,
          [name]: value
        }))
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
      id: company._id,
      company_name: company.company_name,
      email: company.email,
      my_social_net: company.social_net
    }))
    setEditBoxOpen(false)
  }

  const cancelCreateHandler = () => {
    setSocialNet({
      instagram: company?.social_net.instagram,
      facebook: company?.social_net.facebook,
      viber: company?.social_net.viber,
      telegram: company?.social_net.telegram,
      whatsapp: company?.social_net.whatsapp
    })
    setState(({
      id: company?._id,
      company_name: company?.company_name,
      email: company?.email
    }))
    setCreateCompanyBlock(false)
  }

  const submitCreationHandler = () => {
    try {
      if (state.company_name === '' || state.email === '') {
        console.log("Fill all required fields")
        return
      }
      if (!state.email.includes('@')) {
        setEmailColorBg('red-500')
        console.log("Uncorrect email")
        return
      }
      dispatch(createCompany({ ...state, location, my_social_net: socialNet }))
      if (status && !company) {
        console.log(status)
        return
      }
      setEditBoxOpen(false)
    } catch (error) {
      console.log(error)
    }
  }
  // invite member block---------------------------------------------------------
  const [isFormOpen, changeFormState] = useState(null);

  const formOpen = (e) => {
    changeFormState('inviteMember');
  }

  const formClose = () => {
    changeFormState(null);
  }

  //-----------------------------------------------------------------------------

  const [openDialog, setOpenDialog] = useState(false)
  const navigate = useNavigate()

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClickCancelDelete = () => {
    setOpenDialog(false);
  };

  const handleClickDeleteUser = () => {
    dispatch(deleteCompany(company._id))
    setOpenDialog(false);
    navigate('/profile')
  };

  const isSocialLink = (link) => {
    if (link !== '') {
      return "_blank"
    }
    return '_self'
  }

  const isLinkExist = (link) => {
    if (link !== '') { return link } else { return null }
  }

  const [promoBut, setPromoBut] = useState(true)

  const generatePromo = () => {
    if (company) dispatch(createPromo(company?._id))

  }

  if (!company) {
    return <div>
      {!createCompanyBlock &&
        <div className="h-[400px] mt-10 justify-center items-center m-auto">
          You have not created any company yet...
          <div
            className="text-[24px] mx-auto mt-24 w-1/2 cursor-pointer justify-center items-center mb-8 flex flex-row space-x-3 px-3 py-2 rounded-3xl hover:bg-opacity-70 bg-beige border-dark-purple text-dark-purple"
            onClick={() => { setCreateCompanyBlock(true) }}>
            <img className="w-8" src='editing_icon.png' alt='edit info' />
            Create company
          </div>
        </div>
      }

      {createCompanyBlock &&
        <>
          <div className="bg-dark-purple w-full rounded-3xl">
            <img
              src='http://localhost:3000/back_icon_beige.png'
              alt=''
              onClick={cancelCreateHandler}
              className="justify-center  cursor-pointer absolute items-center w-24 rounded-sm py-2 px-4">
            </img>
            <form
              className="w-1/2 mx-auto pb-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="text-sm text-beige">
                Company name<span className="text-2xl text-red-500"> *</span>
                <input type="text"
                  placeholder="Company name"
                  value={state.company_name}
                  name='company_name'
                  onChange={changeHandler}

                  className={`text-black w-full rounded-lg bg-${companyNameColorBg} border py-1 px-2 text-xs outline-none placeholder:text-gray-700`} />
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

              {/* Adding social nets */}
              <div className="rounded-2xl border-[2px] border-beige bg-lilovii bg-opacity-50 mt-8 mb-6 p-4">
                <div className="text-[18px] uppercase">social nets</div>

                <label className="text-sm text-beige">
                  facebook
                  <input type="text"
                    placeholder="link to your facebook"
                    name='facebook'
                    value={socialNet?.facebook}
                    onChange={changeHandler}
                    className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                </label>
                <label className="text-sm text-beige">
                  instagram
                  <input type="text"
                    placeholder="link to your instagram"
                    name='instagram'
                    value={socialNet?.instagram}
                    onChange={changeHandler}
                    className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                </label>
                <label className="text-sm text-beige">
                  whatsapp
                  <input type="text"
                    placeholder="link to your whatsapp"
                    name='whatsapp'
                    value={socialNet?.whatsapp}
                    onChange={changeHandler}
                    className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                </label>
                <label className="text-sm text-beige">
                  telegram
                  <input type="text"
                    placeholder="link to your telegram"
                    name='telegram'
                    value={socialNet?.telegram}
                    onChange={changeHandler}
                    className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                </label>
                <label className="text-sm text-beige">
                  viber
                  <input type="text"
                    placeholder="link to your viber"
                    name='viber'
                    value={socialNet?.viber}
                    onChange={changeHandler}
                    className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                </label>
              </div>
            </form>
          </div>
          {/* MAP */}
          <div className='py-1 my-2 flex flex-col w-full items-center'>
            <label className='pb-2 text-beige text-xl'>Choose a location of your company:</label>
            <MapContainer center={location} creationMode={false} searchBar={true} setLocation={setLocation} />
            {location.lat === defaultLocation.lat && <div className='text-red-600 text-sm pt-1 w-full text-center px-3'>Choose location with search bar.</div>}
          </div>
          {/*BUTTONS*/}
          <div className="flex gap-8 items-center justify-center mt-4">
            <button
              onClick={submitCreationHandler}
              className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
              Save changes
            </button>
            <button
              onClick={cancelCreateHandler}
              className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4">
              Cancel
            </button>
          </div>
        </>
      }
    </div>
  }

  return (
    <div className="flex flex-col bg-opacity-30 bg-pomp-and-power border-opacity-30 text-[2rem] items-center text-center border-[1px] border-beige rounded-[2rem] min-h-[400px] space-y-4 p-6">
      {isFormOpen === 'inviteMember' && <InviteMemberForm closeForm={formClose} />}
      <div className="flex flex-row space-x-4 w-full">
        <div className="flex w-1/2 flex-col text-[2rem] items-center text-center min-h-[400px]">
          {!updateImage && <>
            <div className="justify-center w-40 mt-5 ">
              <img alt={company?.avatar} className="items-center rounded-[3rem]"
                src={`http://localhost:3002/${company?.avatar}`}
              />
            </div>
            <div
              className="text-[12px] mt-2 mb-8 flex  cursor-pointer flex-row space-x-3 px-3 py-2 rounded-3xl hover:bg-opacity-70 bg-beige border-dark-purple text-dark-purple"
              onClick={() => { setUpdateImage(true) }}>
              <img className="w-4" src='editing_icon.png' alt='edit info' />
              Change avatar
            </div>
          </>
          }

          {updateImage && <div className="rounded-3xl bg-dark-purple w-3/4 h-fit">
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
                  <img className='w-40' src={`http://localhost:3002/${company?.avatar}`} alt={company?.avatar} />
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

          {/* Company name */}
          <div className="text-[25px]">{company?.company_name}</div>

          {/* Location */}
          <p className="text-xl" >{company?.location?.description}</p>

          <div className="flex flex-row  mt-5 w-2/3 space-x-8 p-3 justify-center items-center rounded-3xl bg-plum bg-opacity-60">
            <a target={isSocialLink(company.social_net?.instagram)} href={isLinkExist(company.social_net?.instagram)}>
              <img className='w-1/7 min-w-[30px]' alt='instagram' src='http://localhost:3000/instagram.png'></img>
            </a>
            <a target={isSocialLink(company.social_net?.facebook)} href={isLinkExist(company.social_net?.facebook)}>
              <img className='w-1/7 min-w-[30px]' alt='facebook' src='http://localhost:3000/facebook.png'></img>
            </a>
            <a target={isSocialLink(company.social_net?.telegram)} href={isLinkExist(company.social_net?.telegram)}>
              <img className='w-1/7 min-w-[30px]' alt='telegram' src='http://localhost:3000/telegram.png'></img>
            </a>
            <a target={isSocialLink(company.social_net?.whatsapp)} href={isLinkExist(company.social_net?.whatsapp)}>
              <img className='w-1/7 min-w-[30px]' alt='whatsapp' src='http://localhost:3000/whatsapp.png'></img>
            </a>
            <a target={isSocialLink(company.social_net?.viber)} href={isLinkExist(company.social_net?.viber)}>
              <img className='w-1/7 min-w-[30px]' alt='viber' src='http://localhost:3000/viber.png'></img>
            </a>
          </div>
          <div
            className="text-[16px] mt-5 flex flex-row cursor-pointer space-x-3 px-3 py-2 rounded-3xl hover:bg-opacity-70 bg-beige border-dark-purple text-dark-purple"
            onClick={() => { setEditBoxOpen(true) }}>
            <img className="w-6" src='editing_icon.png' alt='edit info' />
            Edit company data
          </div>
          <div
            className="text-[16px] mt-5 flex cursor-pointer flex-row space-x-3 px-3 py-2 rounded-3xl hover:bg-opacity-70 bg-beige border-dark-purple text-dark-purple"
            onClick={generatePromo}>
            Generate Promocode
          </div>
          <div className="text-[18px] text-yellow-500">{status}</div>
        </div>
        <div className="w-1/2">
          <div className=" min-h-[519px] bg-dark-purple bg-opacity-80 p-[1rem] text-sm text-beige border-[2px] border-beige rounded-2xl">
            {editBoxOpen &&
              <>
                <div className="w-full rounded-3xl">
                  <img
                    src='http://localhost:3000/back_icon_beige.png'
                    alt=''
                    onClick={cancelHandler}
                    className="justify-center cursor-pointer absolute items-center w-24 rounded-sm py-2 px-4">
                  </img>
                  <form
                    className="w-1/2 mx-auto pb-3"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <label className="text-sm text-beige">
                      Company name<span className="text-2xl text-red-500"> *</span>
                      <input type="text"
                        placeholder="Company name"
                        value={state.company_name}
                        name='company_name'
                        onChange={changeHandler}
                        className={`text-black w-full rounded-lg bg-${companyNameColorBg} border py-1 px-2 text-xs outline-none placeholder:text-gray-700`} />
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

                    {/* Adding social nets */}
                    <div className="rounded-2xl border-[2px] border-beige bg-lilovii bg-opacity-50 mt-8 p-4">
                      <div className="text-[18px] uppercase">social nets</div>

                      <label className="text-sm text-beige">
                        facebook
                        <input type="text"
                          placeholder="link to your facebook"
                          name='facebook'
                          value={socialNet?.facebook}
                          onChange={changeHandler}
                          className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                      </label>
                      <label className="text-sm text-beige">
                        instagram
                        <input type="text"
                          placeholder="link to your instagram"
                          name='instagram'
                          value={socialNet?.instagram}
                          onChange={changeHandler}
                          className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                      </label>
                      <label className="text-sm text-beige">
                        whatsapp
                        <input type="text"
                          placeholder="link to your whatsapp"
                          name='whatsapp'
                          value={socialNet?.whatsapp}
                          onChange={changeHandler}
                          className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                      </label>
                      <label className="text-sm text-beige">
                        telegram
                        <input type="text"
                          placeholder="link to your telegram"
                          name='telegram'
                          value={socialNet?.telegram}
                          onChange={changeHandler}
                          className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                      </label>
                      <label className="text-sm text-beige">
                        viber
                        <input type="text"
                          placeholder="link to your viber"
                          name='viber'
                          value={socialNet?.viber}
                          onChange={changeHandler}
                          className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                      </label>
                    </div>

                  </form>
                </div>
                {/* MAP */}
                <div className='py-1 my-2 flex flex-col w-full items-center'>
                  <label className='pb-2 text-beige text-xl'>Choose a location of your company:</label>
                  <MapContainer center={location} creationMode={false} searchBar={true} setLocation={setLocation} />
                  {location.lat === defaultLocation.lat && <div className='text-red-600 text-sm pt-1 w-full text-center px-3'>Choose location with search bar.</div>}
                </div>
                {/*BUTTONS*/}
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
              </>

            }

            {!editBoxOpen && <>
              <ul className="Horizontalnav">
                <TabNavItem title={`${arrayItemsCount(members)} members`} id="members" activeTab={activeTabMembers} setActiveTab={setActiveTabMembers} />
              </ul>

              <div>
                <TabContent id="members" activeTab={activeTabMembers}>
                  {(members?.length < 1 || !members) &&
                    <div className="text-beige flex justify-center items-center flex-col text-md h-full w-full">
                      <div className="flex">No members in this company yet...</div>
                      <div onClick={formOpen} name='inviteMember' className="flex mt-32 bg-dark-blue-pastel cursor-pointer align-middle border-dashed border-[1px] border-beige p-6 hover:bg-opacity-70 rounded-xl">
                        <button className="w-12">
                          <img alt='' src='add_member_beige.png' /></button>Invite new member</div>
                    </div>
                  }
                  {members?.length > 0 &&
                    <>

                      <ul className="w-full pr-5 space-y-3 first-letter overflow-y-scroll scrollbar h-[400px]">
                        <div className="text-beige flex justify-center items-center text-md h-fit w-full">
                          <div onClick={formOpen} name='inviteMember' className="flex bg-dark-blue-pastel  cursor-pointer align-middle border-dashed border-[1px] border-beige p-6 hover:bg-opacity-70 rounded-xl">
                            <button className="w-12">
                              <img alt='' src='add_member_beige.png' /></button>Invite new member</div>
                        </div>
                        {
                          members?.map((member, index) => (
                            <MemberListItem
                              key={index}
                              member={member} />
                          ))}
                      </ul>
                    </>

                  }
                </TabContent>
              </div>
            </>}
          </div>
          <div className="rounded-3xl cursor-pointer hover:bg-red-900 px-2 py-1 mt-4 h-fit text-[18px] bg-red-800 text-beige"
            onClick={handleClickOpen} >Delete company</div>
          <Dialog
            open={openDialog}
            onClose={handleClickCancelDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Deleting user"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Do you really want to delete this company? You can`t turn its data back after
                confirmation deleting.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickCancelDelete} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClickDeleteUser} color="primary" autoFocus>
                Delete company
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div >
  );
};
export default MyCompanyTab;