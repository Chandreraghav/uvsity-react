import React, { useEffect, useState } from "react";
import Connections from "./_Connections";
import Spacer from "../../../../../shared/Spacer";
import MiniFooter from "../../../../../shared/MiniFooter";
import { CONNECTIONS, HEADER_OPTIONS } from "../../../../../../constants/userdata";
import SearchService from "../../../../../../pages/api/people/network/Search/SearchService";
import LoadMore from "../../../../../shared/LoadMore";
import Sidebar from "../../Filter/Sidebar";
function Main(props) {
  const [student, setStudent] = useState(CONNECTIONS[0].title === props.filter ? true : false);
  const [professors, setProfessors] = useState(CONNECTIONS[1].title === props.filter ? true : false);
  const [alumni, setAlumni] = useState(CONNECTIONS[2].title === props.filter ? true : false);
  const [inMyNetworkFilterCriteria, setInMyNetworkFilter] = useState(true);
  const [onlyFriendsRequired, setOnlyFriendsRequired] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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
      setLoading(false);
      if (!loadMore)
        setData(res);
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
      setLoadMore(false)
      setError(true);
      setLoadingMore(false)
    });
  }
  useEffect(() => {
    setConnectionData();
  }, [props.filter])

  useEffect(() => {
    if (loadMore === true)
      setConnectionData();
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
            {data.length > 0 && (
              <Connections _data={data} properties={HEADER_OPTIONS[1]} />
            )
            }
            {data.length > 0 && !error && (<LoadMore loadingMore={loadingMore} event={handleLoadMore} />)}
            <Spacer count={2} />
          </>
        </div>
        <div className="lg:mt-0 xl:mt-0 md:mt-0 -mt-10  col-span-12 md:col-span-3 lg:col-span-3 py-2 xl:col-span-2">
          {/* Sidebar filter */}
          <Sidebar/>
          <Spacer count={2} />
          <MiniFooter showOnSmallScreens />
          <Spacer count={2} />
        </div>
      </div>
    </>
  );
}

export default Main;

