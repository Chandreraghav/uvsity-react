import React, { useState, useEffect } from 'react'
import { NETWORK, TITLES } from '../../../../../constants/userdata';
import SearchService from '../../../../../pages/api/people/network/Search/SearchService';
import LoadMore from '../../../../shared/LoadMore';
import MiniFooter from '../../../../shared/MiniFooter';
import Spacer from '../../../../shared/Spacer';
import Sidebar from '../Filter/Sidebar';
import Connections from './Connections/_Connections';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
function AddToNetwork(props) {
  const [loadMore, setLoadMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const getConnectionsData = async () =>
    (
      await SearchService.searchPeople(
        {
          baseSearchActionType: props.filter
        },
        loadMore
      )
    ).data;
  const setConnectionData = () => {
    getConnectionsData().then((res) => {
      res=res.filter((r)=>r.invitationAction===NETWORK.CONNECTION_RELATION_STATE_ALT.CONNECT || r.invitationAction===NETWORK.CONNECTION_RELATION_STATE.CONNECT)
      if (!loadMore){
        setLoading(false);
        setData(res);
      }
      else {
        const _data = data.slice();
        const merged = [..._data, ...res];
        setData(merged);
        setLoadingMore(false)
        setLoadMore(false)
        window.scrollTo(0, document.body.scrollHeight);
      }
    }).catch((err) => {
      setLoading(false);
      if(loadMore===false){
        setLoadError(true)
      }else {
        setLoadMore(false)
      }
      setError(true);
      setLoadingMore(false)
    });
  }
  useEffect(() => {
    setLoading(true)
    setConnectionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.filter])

  useEffect(() => {
    if (loadMore === true)
      setConnectionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMore])

  const handleLoadMore = (obj) => {
    setLoadMore(true)
    setLoadingMore(true)
  }
  const handleDataChange = (obj) => {
    if (obj === true)
      setConnectionData()
  }
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
            
              <Connections  error={loadError} loading={loading}  workflow={props.workflow} userdata={props?.userdata?.data} dataChange={handleDataChange} _data={data} properties={{ title: TITLES.PROBABLE_INTERESTING_CONNECTIONS, icon: PeopleAltIcon }} />
            
            {data.length > 0 && !error && (<LoadMore loadingMore={loadingMore} event={handleLoadMore} />)}
            <Spacer count={2} />
          </>
         
        </div>
        <div className="lg:mt-0 xl:mt-0 md:mt-0 -mt-10  col-span-12 md:col-span-3 lg:col-span-3 py-2 xl:col-span-2">
          {/* Sidebar filter */}
          <Sidebar workflow={props.workflow} userdata={props.userdata?.data}/>
         
          <Spacer count={2} />
          <MiniFooter showOnSmallScreens />
          <Spacer count={2} />
        </div>
      </div>
    </>
  );
}

export default AddToNetwork