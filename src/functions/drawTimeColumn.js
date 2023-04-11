
export default function drawTimeColumn(isWeek) {
    const outputColumn = () => {
        let content = [];
        for (let i = 0; i < 24; i++) {
            content.push(
                <div className='h-1/24 flex flex-col border-b border-slate-700 p-1'>
                    <div>{i}:00</div>
                </div>
            )
        }
        return content;
    }
    return(
        <div className='w-1/7 flex flex-col border-y border-slate-700 select-none text-light-beige'>
        {isWeek && <div className='text-lg h-1/24 text-center border-b border-slate-700 p-1'></div>}
        {outputColumn()}
    </div>
    )
}