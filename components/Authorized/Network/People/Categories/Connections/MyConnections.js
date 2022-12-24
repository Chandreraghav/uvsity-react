import React, { useCallback, useEffect, useState } from "react";
import Connections from "./_Connections";
import Spacer from "../../../../../shared/Spacer";
import MiniFooter from "../../../../../shared/MiniFooter";
import { CONNECTIONS, HEADER_OPTIONS } from "../../../../../../constants/userdata";
import SearchService from "../../../../../../pages/api/people/network/Search/SearchService";
import LoadMore from "../../../../../shared/LoadMore";
import Sidebar from "../../Filter/Sidebar";
import { WORKFLOW_CODES } from "../../../../../../constants/workflow-codes";
import { useRouter } from "next/router";
function MyConnections(props) {
  const [student, setStudent] = useState(CONNECTIONS[0].title === props.filter);
  const [professors, setProfessors] = useState(CONNECTIONS[1].title === props.filter);
  const [alumni, setAlumni] = useState(CONNECTIONS[2].title === props.filter);
  const [additionalTitle, setAdditionalTitle] = useState(null)
  const [inMyNetworkFilterCriteria, setInMyNetworkFilter] = useState(true);
  const [onlyFriendsRequired, setOnlyFriendsRequired] = useState(true);
  const [isDataChangedFromFilter, dataChangedFromFilter] = useState(false);

  const [isBreadCrumbsDeleted, setBreadCrumbsDeleted] = useState(false);

  const [loadMore, setLoadMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [data, setData] = useState([]);
  const [breadCrumbFilter, setBreadCrumbFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [count, setCount] = useState(0)
  const [subCount, setSubCount] = useState(0)
  const [connectionsCategory, setConnectionsCategory] = useState(CONNECTIONS)

  const router = useRouter();
  const getConnectionsData = async (data) => {
    const payload = data ? {
      isOnlyFriendsRequired: onlyFriendsRequired,
      inMyNetworkFilterCriteria: data.categoryData.inMyNetworkFilterCriteria,
      professors: data.categoryData.professors,
      students: data.categoryData.students,
      alumni: data.categoryData.alumni
    } : {
      isOnlyFriendsRequired: onlyFriendsRequired,
      inMyNetworkFilterCriteria,
      professors,
      students: student,
      alumni
    }
    return (
      await SearchService.searchPeople(
        payload,
        loadMore
      )
    ).data;
  }

  const setConnectionData =
    (data) => {
      getConnectionsData(data).then((res) => {
        if (!loadMore) {
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
        if (loadMore === false) {
          setLoadError(true)
        } else {
          setLoadMore(false)
        }

        setError(true);
        setLoadingMore(false)
      });
    }
  useEffect(() => {
    setLoading(true);
    const connectionCategory = CONNECTIONS.at(4)
    connectionCategory.selected = true;
    connectionCategory.deleteable = false;
    const tempBreadCrumbs = [connectionCategory]
    if (router.query?.filter === CONNECTIONS.at(0).title) {
      const _students = CONNECTIONS.at(0)
      _students.selected = true
      _students.deleteable = false
      tempBreadCrumbs.push(_students)
    }
    else if (router.query?.filter === CONNECTIONS.at(1).title) {
      const _professors = CONNECTIONS.at(1)
      _professors.selected = true
      _professors.deleteable = false
      tempBreadCrumbs.push(_professors)
    }
    else if (router.query?.filter === CONNECTIONS.at(2).title) {
      const _alumni = CONNECTIONS.at(2)
      _alumni.selected = true
      _alumni.deleteable = false
      tempBreadCrumbs.push(_alumni)
    }
    setBreadCrumbFilter(tempBreadCrumbs)
    setConnectionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.filter])

  useEffect(() => {
    if (isBreadCrumbsDeleted) {
      setConnectionData();
      return
    }
    if (isDataChangedFromFilter) {
      return;
    }

    if (props.workflow === WORKFLOW_CODES.PEOPLE.MY_CONNECTIONS) {
      const count =
        parseInt(props.userdata?.data?.studentConnectionCount) +
        parseInt(props.userdata?.data?.alumniConnectionCount) +
        parseInt(props.userdata?.data?.professorConnectionCount)
      setCount(count)
      if (student) {
        setAdditionalTitle(CONNECTIONS[0].title)
        setSubCount(props.userdata?.data?.studentConnectionCount)
      }
      else if (professors) {
        setAdditionalTitle(CONNECTIONS[1].title)
        setSubCount(props.userdata?.data?.professorConnectionCount)
      }
      else if (alumni) {
        setAdditionalTitle(CONNECTIONS[2].title)
        setSubCount(props.userdata?.data?.alumniConnectionCount)
      }
      else {
        setAdditionalTitle(null)

      }
    }
    else {
      setAdditionalTitle(null)
    }
  }, [student, alumni, professors, props.workflow, props.userdata?.data?.studentConnectionCount, props.userdata?.data?.professorConnectionCount, props.userdata?.data?.alumniConnectionCount, isDataChangedFromFilter, isBreadCrumbsDeleted])

  useEffect(() => {
    if (loadMore === true) {
      setConnectionData();
      dataChangedFromFilter(false)
      setBreadCrumbsDeleted(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMore])

  const handleComponentDataEvent = (data) => {
    if (data.categoryData) {
      dataChangedFromFilter(true)
      setStudent(data.categoryData.students)
      setProfessors(data.categoryData.professors)
      setAlumni(data.categoryData.alumni)
      setInMyNetworkFilter(data.categoryData.inMyNetworkFilterCriteria)
      setError(false)
      setLoading(true);
      setData([])
      let tempBreadCrumbFilter = breadCrumbFilter.slice()
      let connectionCategory = null;
      for (const [key, value] of Object.entries(data.categoryData)) {
        if (key === CONNECTIONS.at(0).title.toLowerCase()) {
          connectionCategory = CONNECTIONS.at(0)
        }
        else if (key === CONNECTIONS.at(1).title.toLowerCase()) {
          connectionCategory = CONNECTIONS.at(1)
        }
        else if (key === CONNECTIONS.at(2).title.toLowerCase()) {
          connectionCategory = CONNECTIONS.at(2)
        }
        if (key === CONNECTIONS.at(0).title.toLowerCase() || key === CONNECTIONS.at(1).title.toLowerCase() || key === CONNECTIONS.at(2).title.toLowerCase()) {
          const idx = tempBreadCrumbFilter.findIndex((crumb) => crumb.id == connectionCategory.id)
          if (idx == -1) {
            connectionCategory.selected = value;
            tempBreadCrumbFilter.push(connectionCategory)
          }
          else {
            tempBreadCrumbFilter[idx].selected = value
          }
        }
      }
      tempBreadCrumbFilter = tempBreadCrumbFilter.filter((crumb) => crumb.selected === true)
      setBreadCrumbFilter(tempBreadCrumbFilter)
      setConnectionData(data);
    }
  }
  const handleLoadMore = (obj) => {
    setLoadMore(true)
    setLoadingMore(true)
  }

  const handleDeleteBreadCrumb = (obj) => {
    if (obj) {
      setBreadCrumbsDeleted(true)
      setLoading(true);
      const connectionCategories = connectionsCategory.slice()
      const targetSidebarSelectionIdx = connectionCategories.findIndex((category) => category.id === obj.id)
      if (targetSidebarSelectionIdx !== -1) {
        connectionCategories[targetSidebarSelectionIdx].selected = false
        setConnectionsCategory(connectionCategories)
      }
      let tempBreadCrumbFilter = breadCrumbFilter.slice()
      const targetBreadCrumbDeleteIdx = tempBreadCrumbFilter.findIndex((crumb) => crumb.id === obj.id)
      if (targetBreadCrumbDeleteIdx !== -1) {
        tempBreadCrumbFilter[targetBreadCrumbDeleteIdx].selected = false
        tempBreadCrumbFilter = tempBreadCrumbFilter.filter((crumb) => crumb.selected === true)
        setBreadCrumbFilter(tempBreadCrumbFilter)
      }
      if (obj.title === CONNECTIONS.at(0).title) {
        setStudent(false)
      }
      else if (obj.title === CONNECTIONS.at(1).title) {
        setProfessors(false)
      }
      else if (obj.title === CONNECTIONS.at(2).title) {
        setAlumni(false)
      }
      
    }
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

            <Connections handleDeleteBreadCrumb={handleDeleteBreadCrumb} filters={breadCrumbFilter} error={loadError} loading={loading} workflow={props.workflow} userdata={props.userdata?.data} _data={data}
              properties={{
                title: HEADER_OPTIONS[1].title,
                subtitle: additionalTitle, icon: HEADER_OPTIONS[1].icon,
                count, subCount
              }} />

            {data.length > 0 && !error && (<LoadMore loadingMore={loadingMore} event={handleLoadMore} />)}
            <Spacer count={2} />
          </>

        </div>
        <div className="lg:mt-0 xl:mt-0 md:mt-0 -mt-10  col-span-12 md:col-span-3 lg:col-span-3 py-2 xl:col-span-2">
          {/* Sidebar filter */}
          <Sidebar connections={connectionsCategory} selectedCategory={router.query?.filter || null} onDataEvent={handleComponentDataEvent} workflow={props.workflow} userdata={props.userdata?.data} />
          <Spacer count={2} />
          <MiniFooter showOnSmallScreens />
          <Spacer count={2} />
        </div>
      </div>
    </>
  );
}

export default MyConnections;

