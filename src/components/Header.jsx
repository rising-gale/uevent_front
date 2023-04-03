import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';

const Header = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutClick = () => {
      dispatch(logout())
      navigate('/')
    }
    
    return (
        <div className='px-8 py-3 border-b-2 border-slate-700 flex w-full bg-dark-purple justify-between '>
            <div className='w-1/6 flex flex-row justify-between'>
                <div className='h-14 w-28'>
                    <img src="http://localhost:3000/uevent_logo.png" alt='logo' className='rounded-full' />
                </div>
            </div>
            <div className='w-1/4 flex flex-row justify-between items-center'>
                <Link to='/' className='flex justify-center items-center text-lg m-5 text-beige hover:text-light-beige hover:transition-[1s]'>Main page</Link>
                <Link to='/profile' className='flex justify-center items-center text-lg m-5 text-beige hover:text-light-beige hover:transition-[1s]'>Profile</Link>
                <Link to='/events/my' className='flex justify-center items-center text-lg m-5 text-beige hover:text-light-beige hover:transition-[1s]'>My events</Link>
            </div>
            <div className='w-1/4 flex flex-row '>
                <div className='text-beige w-1/2 flex items-center border-2 border-purple-900 rounded-xl p-1 pl-2 hover:cursor-pointer  transition duration-500 hover:ease-in hover:underline text-semibold underline-offset-2 font-serif'>
                    <div className='w-1/3 h-full flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </div>
                    <div className='w-2/3 h-full flex flex-col text-beige'>
                        <div className='w-full h-full flex items-center justify-center'>
                            My tickets cart
                        </div>
                        {/* <div className='w-full h-1/2 flex items-center justify-center'>
                            (10)
                        </div> */}
                    </div>
                </div>
                {/* <div className='w-1/6 flex items-center justify-end'>
                    <img src={props.avatar ? 'http://localhost:5000/images/' + props.avatar : "logo.png"} alt="logo" className="h-14 w-14 object-cover rounded-full" />
                    <img src="logo.png" alt="logo" className="h-14 w-14 object-cover rounded-full" />
                </div> */}
                <div className='w-1/2 flex flex-col items-end justify-center'>
                    {/* <div className='w-full text-center p-1'>Login to be nice</div> */}
                    <button 
                        className="flex items-center justify-around border border-purple-900 rounded-full w-2/3 p-3 bg-violet-700 hover:bg-violet-500 hover:border-purple-600 transition duration-500 hover:ease-in font-semibold text-lg "
                        onClick={logoutClick}
                    >
                        <div>Logout</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                    </button>
                    
                </div>
            </div>
        </div>
    );
}

export default Header;
