import React, { useEffect } from 'react';
import CardOfEvent from './CardOfEvent';
import { useDispatch, useSelector } from 'react-redux';
import { decrementPage, getAllCompanyEvents, incrementPage } from '../redux/eventsSlice';

const CompanyEventsContainer = ({ company_id }) => {

    const dispatch = useDispatch();
    const events = useSelector(state => state.events.viewingCompanyEvents);
    const curPage = useSelector(state => state.events.viewingCompanyEventsPage);
    const pages = useSelector(state => state.events.viewingCompanyEventsPages);

    useEffect(() => {
        dispatch(getAllCompanyEvents({ company_id: company_id, page: curPage }))
    }, [dispatch, company_id, curPage])

    const handleNextClick = () => {
        if(curPage < pages)
            dispatch(incrementPage('company'));
    }

    const handlePreviousPage = () => {
        if(curPage > 1)
            dispatch(decrementPage('company'));
    }

    if (events?.length > 0)
        return (
            <div className='w-full h-full flex flex-col'>
                <div className='font-semibold mb-2 text-beige'>Events of this company:</div>
                <div className='flex items-center justify-center'>
                    {events?.map(event => {
                        return(
                            <CardOfEvent data={event} />
                        )
                    })}
                </div>
                <div className='flex flex-row w-full items-center justify-center m-1 mt-4'>
            <div className='m-3 p-1 hover:cursor-pointer leading-none text-light-beige hover:text-beige' onClick={handlePreviousPage}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </div>
            <div className='m-3 text-2xl font-semibold select-none text-light-beige'>{curPage} / {pages}</div>
            <div className='m-3 p-1 hover:cursor-pointer leading-none text-light-beige hover:text-beige' onClick={handleNextClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>
        </div>
            </div>
        );
}

export default CompanyEventsContainer;
