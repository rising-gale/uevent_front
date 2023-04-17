import React from "react";
import { useDispatch } from "react-redux";

const InviteMemberForm = ({ closeForm }) => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const submitInvite = () => {
        
    }

    return (
        <div className=" text-white justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-700 bg-opacity-50">
            <div className="relative my-3 mx-auto w-2/5">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-dark-blue-pastel outline-none focus:outline-none h-screen">
                    {/*header*/}
                    <div className="flex items-start justify-between p-3 border-b border-solid border-beige rounded-t">
                        <h3 className="text-3xl pl-4 font-semibold text-light-grey-pastel font-serif">
                            Invite member
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={closeForm}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-5 flex flex-col overflow-y-auto h-5/6">
                        <label className="mb-0 text-sm text-beige">
                            Email <span className="text-red-500 text-2xl"> *</span>
                            <input type="email"
                                placeholder="email"
                                name='email'
                                value={email}

                                onChange={changeHandler}
                                className={`text-black w-full rounded-lg bg-${emailColorBg} border py-1 px-2 text-xs outline-none placeholder:text-gray-700`} />
                        </label>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center p-3 border-t border-solid border-beige rounded-b">
                        <div className='flex w-full justify-end'>
                            <button
                                className="text-pink-700 hover:text-pink-600 background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-250"
                                type="button"
                                onClick={submitInvite}
                            >Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default InviteMemberForm;