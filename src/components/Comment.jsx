import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, editComment } from '../redux/eventsSlice';

const Comment = ({ data }) => {
    // console.log(data);

    const dispatch = useDispatch();

    const userID = useSelector(state => state.auth.userId);

    const [isEditing, setEditing] = useState(false);
    const [comment, setComment] = useState('');

    const editCommentClick = () => {
        if(isEditing)
        {
            dispatch(editComment({event_id: data.event, comment_id: data._id, comment}))
            setEditing(false);
        } else {
            setEditing(true);
        }
    }

    const handleInput = (e) => {
        setComment(e.target.value);
    }

    const deleteCommentClick = () => {
        dispatch(deleteComment({event_id: data.event, comment_id: data._id}));
    }

    return (
        <div className='m-3 p-4 mb-4 border flex flex-col rounded-lg'>
        <div className='p-2 flex w-full h-full'>
            {isEditing ? 
                            <input
                            value={data.comment}
                            onChange={handleInput}
                            name='comment'
                            placeholder="Type comment ..."
                            className="text-black disabled:bg-gray-300 disabled:border-gray-500 bg-light-beige font-semibold text-lg p-2 w-4/5 outline-none border-2 border-purple-500 focus:border-emerald-600 rounded-lg"
                        />
                    :
                    data.comment}
            
        </div>
        <div className='border border-blue-300 my-3'></div>
        <div className='flex flex-row justify-between m-2 '>
            <div className='w-1/3 text-xs flex flex-col justify-end'>
                <div>
                    {new Date(data.createdAt).toLocaleString()}
                </div>
                <div>
                    {new Date(data.updatedAt).toLocaleString() !== new Date(data.createdAt).toLocaleString() && '(updated at: ' + new Date(data.updatedAt).toLocaleString() + ')'}
                </div> 
            </div>
            <div className='flex items-center'>
                <img src={'http://localhost:3002/' + data.author.avatar} alt="logo" className="mx-2 h-10 w-10 object-cover rounded-full" />
                <div>
                    {data.author.username}
                </div>
            </div>
        </div>
        <div className='border border-blue-300 my-2 mb-3'></div>
        <div className='flex w-1/4 justify-between'>
            {userID === data.author._id && <button onClick={deleteCommentClick} className="w-1/2 ml-2 border border-purple-900 rounded-full p-1.5 bg-pink-800 hover:bg-pink-700 transition duration-500 hover:ease-in">Delete</button> }
            {userID === data.author._id && <button onClick={editCommentClick} className="w-1/2 ml-2 border border-purple-900 rounded-full p-1.5 bg-violet-700 hover:bg-violet-500 hover:border-purple-600 transition duration-500 hover:ease-in">{isEditing ? 'Confirm' : 'Edit'}</button> }
        </div>
    </div>
    );
}

export default Comment;
