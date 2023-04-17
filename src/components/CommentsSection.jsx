import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getEventComments } from '../redux/eventsSlice';

const CommentsSection = ({ event_id }) => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const eventComments = useSelector(state => state.events.viewingEventComments);

    const [commentsToDisplay, displayMore] = useState(3);
    const [comment, setComment] = useState('');

    useEffect(() => {
        dispatch(getEventComments(event_id));
    }, [dispatch, event_id]);

    const extendComments = () => {
        displayMore(commentsToDisplay + 3);
    }

    const hideComments = () => {
        if (commentsToDisplay > 3)
            displayMore(commentsToDisplay - 3);
    }

    const displayComments = () => {
        let content = [];
        // console.log(commentsToDisplay > eventComments?.length)
        if (commentsToDisplay > eventComments.length) {
            for (let i = 0; i < eventComments.length; i++) {
                content.push(
                    <Comment data={eventComments[i]} />
                )
            }
        } else {
            for (let i = 0; i < commentsToDisplay; i++) {
                content.push(
                    <Comment data={eventComments[i]} />
                )
            }
        }
        return content;
    }
    // console.log(eventComments)

    const createCommentClick = () => {
        console.log(comment);
        dispatch(createComment({id: event_id, comment }));
        setComment('');
    }

    const handleInput = (e) => {
        setComment(e.target.value);
    }
    
    return (
        <>
            <div className='w-full text-center text-2xl font-semibold pb-2 mb-2'>
                Comments:
            </div>
            <div className='w-1/2 text-center text-2xl font-semibold pb-2 self-center flex items-center'>
                {
                    user && 
                    <>
                                    <input
                    value={comment}
                    onChange={handleInput}
                    disabled={!user._id}
                    name='comment'
                    placeholder="Type comment ..."
                    className="text-black disabled:bg-gray-300 disabled:border-gray-500 bg-light-beige font-semibold text-lg p-2 w-4/5 outline-none border-2 border-purple-500 focus:border-emerald-600 rounded-lg"
                />
                <button
                    className="w-1/5 h-11/12 text-lg flex items-center justify-around border border-purple-900 rounded-full mx-5 p-1 bg-violet-700 hover:bg-violet-500 hover:border-purple-600 transition duration-500 hover:ease-in font-semibold"
                    onClick={createCommentClick}
                    name='create'
                >
                    Create
                </button>
                    </>
                }
            </div>
            <div className='w-3/4 self-center flex flex-col'>

                {eventComments && displayComments()}

                <div className='w-full flex justify-center items-center'>
                    <button
                        className="flex items-center justify-center border border-purple-900 disabled:bg-gray-400 disabled:border-gray-500 rounded-full w-1/6 mx-3 mb-5 py-2 px-4 bg-violet-700 hover:bg-violet-500 hover:border-purple-600 transition duration-500 hover:ease-in font-semibold"
                        onClick={hideComments}
                        disabled={commentsToDisplay <= 3}
                        name='hide'
                    >
                        Hide
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
                        </svg>
                    </button>
                    <button
                        disabled={commentsToDisplay >= eventComments.length}
                        className="flex items-center justify-center border border-purple-900 disabled:bg-gray-400 disabled:border-gray-500 rounded-full w-1/6 mx-3 mb-5 py-2 px-4 bg-violet-700 hover:bg-violet-500 hover:border-purple-600 transition duration-500 hover:ease-in font-semibold"
                        onClick={extendComments}
                        name='extend'
                    >
                        Extend
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
                        </svg>
                    </button>
                </div>

            </div>
        </>

    );
}

export default CommentsSection;
