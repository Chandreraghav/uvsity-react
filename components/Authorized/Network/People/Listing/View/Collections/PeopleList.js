import React, { useState, useMemo, useEffect } from 'react'
import { useDataLayerContextValue } from '../../../../../../../context/DataLayer';
import { useRouter } from 'next/router';
import { HEADER_OPTIONS, NETWORK } from '../../../../../../../constants/userdata';
import { AUTHORIZED_ROUTES } from '../../../../../../../constants';
import { asyncSubscriptions } from '../../../../../../../async/subscriptions';
import { parseBoolean } from '../../../../../../../utils';
import { useGetPeopleForOwner } from '../../../../../../../hooks/operations/query/people/search/useGetPeopleForOwner';
import Connections from '../../../Flows/Connections/_Connections';

function PeopleList(props) {
    const [ctxUserdata, dispatch] = useDataLayerContextValue();
    const PEOPLE_FILTER_OBJ = NETWORK.PEOPLE.SEARCH.PAYLOAD
    const [filter, setFilter] = useState(PEOPLE_FILTER_OBJ)
    const [loadMore, setLoadMore] = useState(false)
    const router = useRouter();
    const payload = useMemo(() => {
        const isOwner = () => {
            if (parseBoolean(router.query?.owner) === true) {
                return true
            }
            const targetUID = router.query?.uid
            if (targetUID) {
                return Number(targetUID) === Number(ctxUserdata?.userdata?.userDetailsId);
            }
            return false;
        }
        if (props?.utrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.PROFILE_VISITS) {
            return {
                baseSearchActionType: asyncSubscriptions.PROFILE_VISITS.alias
            }
        }
        if (props?.utrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.ADD_TO_NETWORK) {
            return {
                baseSearchActionType: asyncSubscriptions.INTERESTING_CONNECTIONS.alias
            }
        }
        // for connection utrn
        if (isOwner()) {
            return {
                isOnlyFriendsRequired: true,
                inMyNetworkFilterCriteria: true
            }
        }
        return {
            isOnlyFriendsRequired: true,
            searchUserId: router.query?.uid
        }
 }, [ctxUserdata?.userdata?.userDetailsId, props?.utrn, router.query?.owner, router.query?.uid])

    const people_data = useGetPeopleForOwner(payload, loadMore)
   
    useEffect(() => {
        console.log(people_data.data)
    }, [people_data])
    return (
        <>
            <div
                className=" min-h-screen  
  grid items-stretch grid-cols-12  
  gap-2 px-2 mx-auto xl:container md:gap-4 
  xl:grid-cols-8 2xl:px-5 "
            >
                <div className="z-40 col-span-12 md:pt-2 md:col-span-8 lg:col-span-8 xl:col-span-6">

                    <>


                        <Connections 
                        //handleDeleteBreadCrumb={handleDeleteBreadCrumb}
                            // filters={breadCrumbFilter} error={error}
                            // loading={loading}
                            // workflow={props.workflow}
                            userdata={ctxUserdata?.userdata}
                            _data={people_data.data}
                            properties={{
                                title: router.query?.title ?? HEADER_OPTIONS[1].title,
                                 icon: HEADER_OPTIONS[1].icon,
                                count:10, subCount:29
                            }} />

                        {/* 
                        

          {!loadError && !error && (<LoadMore loadingMore={loadingMore} event={handleLoadMore} />)}
          <Spacer count={2} /> */}
                    </>

                </div>
                <div className="lg:mt-0 xl:mt-0 md:mt-0 -mt-10  col-span-12 md:col-span-3 lg:col-span-3 py-2 xl:col-span-2">
                    {/* Sidebar filter */}
                    {/* <Sidebar connections={connectionsCategory} selectedCategory={router.query?.filter || null} onDataEvent={handleComponentDataEvent} workflow={props.workflow} userdata={userdata} />
        <Spacer count={2} />
        <MiniFooter showOnSmallScreens />
        <Spacer count={2} /> */}
                </div>
            </div>
        </>
    )
}

export default PeopleList