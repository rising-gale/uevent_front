import React from 'react';

const Sidebar = ({formats, themes, handleChange}) => {
    return (
        <div className='w-1/5 h-full py-2 px-0.5 border-r-2 border-purple-900'>
            <div className='text-center text-xl font-semibold my-5'>Filters for events</div>
            <div className='text-center text-lg font-semibold'>By formats:</div>
            <div className='text-center text-xs font-semibold'>(you can choose up to 3 items)</div>
            <div className='flex flex-row flex-wrap py-1 my-1'>
                {
                    formats && formats.map(format => {

                        if (format.content !== 'none')
                            return (
                                <div className='flex p-1 m-1.5 border border-beige rounded-md' key={format._id}>
                                    <input type='checkbox' name='format' id={format._id} onChange={handleChange} />
                                    <div>{format.content}</div>
                                </div>
                            )
                        else return <></>
                    })
                }
            </div>
            <div className='text-center text-lg font-semibold'>By themes:</div>
            <div className='text-center text-xs font-semibold'>(you can choose up to 3 items)</div>
            <div className='flex flex-row flex-wrap py-1 my-1'>
                {
                    themes && themes.map(theme => {
                        if (theme.content !== 'none')
                            return (
                                <div className='flex p-1 m-1.5 border border-beige rounded-md' key={theme._id}>
                                    <input type='checkbox' name='theme' id={theme._id} onChange={handleChange} />
                                    <div>{theme.content}</div>
                                </div>
                            )
                        else return <></>
                    })
                }
            </div>
        </div>
    );
}

export default Sidebar;
