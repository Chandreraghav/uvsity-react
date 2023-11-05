import React, { useCallback, useMemo, useState } from 'react'
import Spacer from '../../../shared/Spacer'
import SessionCard from '../../../SessionCards/SessionCard'
import { CUSTOM_ERRORS, IMAGE_PATHS, SESSION, WORKFLOW_CODES } from '../../../../constants'
import Sidebar from '../Filter/Sidebar'
import NoDataFound from '../../Shared/NoDataFound'
import { Divider, Typography } from '@mui/material'

function OnlineSessions(props) {
    const [onlineSessions, setOnlineSessions] = useState(props.data || [])
    const handleDataEvent = (data) => {
        setOnlineSessions(data)
    }

    const qfilters = useMemo(() => {
        const quickFilters = SESSION.QUICK_FILTERS.ONLINE_SESSIONS;
        for (const key in props.filteredData) {
            if (key === 'courseByCategoryNameMap') {
                props.filteredData[key]["All"] = props.data
                quickFilters[0].data = props.filteredData[key]
            }
            else if (key === 'courseByPriceMap') {
                quickFilters[1].data = props.filteredData[key]
            }

        }

        return quickFilters
    }, [onlineSessions, props.filteredData])

    const qfilterDataCallback = useCallback((_filter) => {
        return Object.keys(_filter.data).sort()

    }, [])

    const handleQuickFilterClick = (filter, filterItem) => {
        handleDataEvent(filter.data[filterItem])
    }

    const resetDataEvent = (obj) => {
        setOnlineSessions(props.data)
    }
    return (
        <div
            className=" min-h-screen  
grid items-stretch grid-cols-12  
gap-2 px-2 mx-auto xl:container md:gap-4 
xl:grid-cols-8 2xl:px-5 "
        >
            <div className="lg:mt-0 xl:mt-0 md:mt-0 -mt-10  col-span-12 md:col-span-3 lg:col-span-3 py-2 xl:col-span-2">

                <Spacer count={1} />
                {/* Quick filter */}
                <div className=" leading-snug  text-gray-700 dark:text-gray-500  p-3 flex gap-4 overflow-hidden max-h-32  ">
                    {qfilters.map((filter) =>
                    (
                        <div key={filter.id}>
                            <div className="mb-1 flex flex-col">
                                <Typography gutterBottom variant={'subtitle'}
                                    className="select-none leading-4 first-letter:underline">
                                    {filter.icon}
                                    {filter.title}
                                </Typography>

                                <Divider orientation='horizontal' variant="fullWidth" sx={{ m: 0.5 }} />
                            </div>
                            {qfilterDataCallback(filter).map((filterItem, idx) =>
                                <div onClick={() => handleQuickFilterClick(filter, filterItem)} className='text-sm max-w-20 text-ellipsis ml-1 cursor-pointer duration-100 mb-1 transition-all ease-in-out hover:text-blue-800' key={idx}>
                                    {filterItem}
                                </div>
                            )}
                        </div>
                    )

                    )}
                </div>
                <Spacer count={1} />
                <Divider className="border-b-indigo-500" variant="fullWidth" sx={{ m: 0.5 }} />
                <Spacer count={1} />

                {/* Sidebar filter */}
                <Sidebar onResetEvent={resetDataEvent} onDataEvent={handleDataEvent} />
                <Spacer count={2} />
            </div>

            <div className="z-40  col-span-12 md:pt-2 md:col-span-8 lg:col-span-8 xl:col-span-6">
                {onlineSessions &&
                    (<div className="grid p-4 grid-cols-1 mb-16 md:mb-12 lg:mb-4 md:grid-cols-2 lg:grid-cols-2 gap-4">

                        {onlineSessions.map((_data, idx) => (
                            <SessionCard
                                key={`${_data.courseId}${idx}`}
                                data={_data}
                                authorized={true}
                                origin={props.type}
                                workflow={WORKFLOW_CODES.USER.SESSION.VIEW}
                            />))}
                    </div>)
                }
                {onlineSessions && onlineSessions.length == 0 && (
                    <NoDataFound src={IMAGE_PATHS.NO_DATA.SESSION} message={CUSTOM_ERRORS.NOTHING_TO_SHOW} />

                )}
            </div>



        </div>
    )
}

export default OnlineSessions