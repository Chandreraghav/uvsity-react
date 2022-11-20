import React, { useEffect, useState } from "react";
import Connections from "./_Connections";
import Spacer from "../../../../../shared/Spacer";
import MiniFooter from "../../../../../shared/MiniFooter";
import { CONNECTIONS, HEADER_OPTIONS } from "../../../../../../constants/userdata";
import SearchService from "../../../../../../pages/api/people/network/Search/SearchService";
import LoadMore from "../../../../../shared/LoadMore";
import Sidebar from "../../Filter/Sidebar";
function MyConnections(props) {
  const [student, setStudent] = useState(false);
  const [professors, setProfessors] = useState(false);
  const [alumni, setAlumni] = useState(false);
  const [additionalTitle, setAdditionalTitle] = useState(null)
  const [inMyNetworkFilterCriteria, setInMyNetworkFilter] = useState(true);
  const [onlyFriendsRequired, setOnlyFriendsRequired] = useState(true);
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
          isOnlyFriendsRequired: onlyFriendsRequired,
          inMyNetworkFilterCriteria,
          professors,
          student,
          alumni
        },
        loadMore
      )
    ).data;
  const setConnectionData = () => {
    getConnectionsData().then((res) => {
      if (!loadMore){
        setData(res);
        setLoading(false);
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
      }
      setLoadMore(false)
      setError(true);
      setLoadingMore(false)
    });
  }
  useEffect(() => {
    setStudent(CONNECTIONS[0].title === props.filter)
    setProfessors(CONNECTIONS[1].title === props.filter)
    setAlumni(CONNECTIONS[2].title === props.filter)
    setLoading(true);
    setConnectionData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.filter])

  useEffect(() => {
    if (student) {
      setAdditionalTitle(CONNECTIONS[0].title)
    }
    else if (professors) {
      setAdditionalTitle(CONNECTIONS[1].title)
    }
    else if (alumni) {
      setAdditionalTitle(CONNECTIONS[2].title)
    }
    else {
      setAdditionalTitle(null)
    }
  }, [student, alumni, professors])

  useEffect(() => {
    if (loadMore === true)
      setConnectionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMore])

  const handleLoadMore = (obj) => {
    setLoadMore(true)
    setLoadingMore(true)
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

              <Connections error={loadError} loading={loading} workflow={props.workflow} _data={data} properties={{ title: HEADER_OPTIONS[1].title, subtitle: additionalTitle, icon: HEADER_OPTIONS[1].icon }} />

              {data.length > 0 && !error && (<LoadMore loadingMore={loadingMore} event={handleLoadMore} />)}
              <Spacer count={2} />
            </>

        </div>
        <div className="lg:mt-0 xl:mt-0 md:mt-0 -mt-10  col-span-12 md:col-span-3 lg:col-span-3 py-2 xl:col-span-2">
          {/* Sidebar filter */}
          <Sidebar />
          <Spacer count={2} />
          <MiniFooter showOnSmallScreens />
          <Spacer count={2} />
        </div>
      </div>
    </>
  );
}

export default MyConnections;

