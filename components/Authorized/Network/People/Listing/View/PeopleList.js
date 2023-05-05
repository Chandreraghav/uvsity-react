import React,{useState} from 'react'
import { useQuery } from "react-query";
import { KEYS } from '../../../../../../async/queries/keys/unique-keys';
import { standardStaleTime } from '../../../../../../async/subscriptions';
import SearchService from '../../../../../../pages/api/people/network/Search/SearchService';
import { useDataLayerContextValue } from '../../../../../../context/DataLayer';
import { useRouter } from 'next/router';

function PeopleList(props) {
    const [ctxUserdata, dispatch] = useDataLayerContextValue();
    
    const PEOPLE_FILTER_OBJ ={
        student: false,
        professors:false,
        alumni:false,
        inMyNetworkFilterCriteria:false,
        awaitingResponseFilterCriteria:false,
        awaitingResponseFilterCriteria:false,
        educationInstitution:null,
        campus:null,
        specialization:null,
        country:null,
        city:null,
        searchUserId:null
    }
    const [filter, setFilter]=useState(PEOPLE_FILTER_OBJ)
    
    const router = useRouter();

    const isOwner = ()=>{
        const targetUID = router.query?.uid
        if(targetUID){
            
        }
    }
    //   const getPeopleData = async (utrnType) => {
    //     return (await SearchService.searchPeople(
    //         payload,
    //         loadMore
    //     )
    //     ).data
    // }

    // const PEOPLE_DATA = useQuery([KEYS.NETWORK.PEOPLE.DATA], getPeopleData(props?.utrn), {
    //     staleTime: standardStaleTime,
    // });

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
                        {props?.utrn}
                        {/* <Connections handleDeleteBreadCrumb={handleDeleteBreadCrumb} filters={breadCrumbFilter} error={error} loading={loading} workflow={props.workflow} userdata={userdata} _data={data}
            properties={{
              title: props.title??HEADER_OPTIONS[1].title,
              subtitle: additionalTitle, icon: HEADER_OPTIONS[1].icon,
              count, subCount
            }} />

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