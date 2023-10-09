// Component to display people who are connections of logged in user and/or people who are connections of a user who is connected to the logged in user.
import React, { useEffect, useState, useCallback } from "react";
import Connections from "./_Connections";
import Spacer from "../../../../../shared/Spacer";
import MiniFooter from "../../../../../shared/MiniFooter";
import { CONNECTIONS, HEADER_OPTIONS } from "../../../../../../constants/userdata";
import SearchService from "../../../../../../pages/api/people/network/Search/SearchService";
import LoadMore from "../../../../../shared/LoadMore";
import Sidebar from "../../Filter/Sidebar";
import { WORKFLOW_CODES } from "../../../../../../constants/workflow-codes";
import { useRouter } from "next/router";
import { useDataLayerContextValue } from "../../../../../../context/DataLayer";
import { getLocalStorageObject } from "../../../../../../localStorage/local-storage";
import { getWorkflowError } from "../../../../../../error-handler/handler";
import { NO_RECORDS_TO_LOAD } from "../../../../../../constants/error-messages";
function ConnectionsList(props) {
  const [ctxUserdata, dispatch] = useDataLayerContextValue();
  const [userdata, setUserData] = useState(null);
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
  const setConnectionData =
    useCallback((data) => {
      const getConnectionsData = async (data) => {
        const payload = data ? {
          isOnlyFriendsRequired: onlyFriendsRequired,
          inMyNetworkFilterCriteria: data.categoryData.inMyNetworkFilterCriteria,
          professors: data.categoryData.professors,
          students: data.categoryData.students,
          alumni: data.categoryData.alumni,
          searchUserId: null
        } : {
          isOnlyFriendsRequired: onlyFriendsRequired,
          inMyNetworkFilterCriteria: !props.targetUID ? true : false,
          professors,
          students: student,
          alumni,
          searchUserId: null
        }

        if (props.targetUID)
          payload.searchUserId = props.targetUID
        return (
          await SearchService.searchPeople(
            payload,
            loadMore
          )
        ).data;
      }
      if (loadError) {
        setLoadError(false)
      }
      if(error){
        setError(false)
      }
      getConnectionsData(data).then((res) => {
        if (!loadMore) {
          setData(res);
          setLoading(false);
        }

        else {
          if (data) {
            const _data = data.slice();
            const merged = [..._data, ...res];
            setData(merged);
            setLoadingMore(false)
            setLoadMore(false)
            window.scrollTo(0, document.body.scrollHeight);
          }
          else {
            setLoadMore(false)
            setLoadingMore(false)
            setLoadError(true)
          }

        }
      }).catch((err) => {
        setLoading(false);
        if (loadMore) {
          let error = getLocalStorageObject("uvsity-internal-error-response")
          if (error) {
            error = JSON.parse(error);
            const wfError = getWorkflowError(error)
            if (wfError === NO_RECORDS_TO_LOAD) {
              setLoadingMore(false)
              setLoadError(true)
              return
            }
            setError(true);
            setData([])
            setLoadingMore(false)
          }
        }
        else {
          setError(true);
          setData([])
          setLoadingMore(false)
        }
      });
    }, [alumni, loadError, loadMore, onlyFriendsRequired, professors, props.targetUID, student])
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
        parseInt(userdata?.studentConnectionCount) +
        parseInt(userdata?.alumniConnectionCount) +
        parseInt(userdata?.professorConnectionCount)
      setCount(count)
      if (student) {
        setAdditionalTitle(CONNECTIONS[0].title)
        setSubCount(userdata?.studentConnectionCount)
      }
      else if (professors) {
        setAdditionalTitle(CONNECTIONS[1].title)
        setSubCount(userdata?.professorConnectionCount)
      }
      else if (alumni) {
        setAdditionalTitle(CONNECTIONS[2].title)
        setSubCount(userdata?.alumniConnectionCount)
      }
      else {
        setAdditionalTitle(null)

      }
    }
    else {
      setAdditionalTitle(null)
    }
  }, [student, alumni, professors, props.workflow, userdata?.studentConnectionCount, userdata?.professorConnectionCount, userdata?.alumniConnectionCount, isDataChangedFromFilter, isBreadCrumbsDeleted, setConnectionData])

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
      setLoadMore(false)
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
      setData([])
      setBreadCrumbsDeleted(true)
      setLoading(true);
      let tempBreadCrumbFilter = breadCrumbFilter.slice()
      const targetBreadCrumbDeleteIdx = tempBreadCrumbFilter.findIndex((crumb) => crumb.id === obj.id)
      if (targetBreadCrumbDeleteIdx !== -1) {
        tempBreadCrumbFilter[targetBreadCrumbDeleteIdx].selected = false
        tempBreadCrumbFilter = tempBreadCrumbFilter.filter((crumb) => crumb.selected === true)
        setBreadCrumbFilter(tempBreadCrumbFilter)
      }
      const connectionCategories = connectionsCategory.slice()
      const targetSidebarSelectionIdx = connectionCategories.findIndex((category) => category.id === obj.id)
      if (targetSidebarSelectionIdx !== -1) {
        connectionCategories[targetSidebarSelectionIdx].selected = false
        setConnectionsCategory(connectionCategories)
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

  useEffect(() => {
    setUserData(ctxUserdata?.userdata)
  }, [ctxUserdata?.userdata])

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

            <Connections handleDeleteBreadCrumb={handleDeleteBreadCrumb} filters={breadCrumbFilter} error={error} loading={loading} workflow={props.workflow} userdata={userdata} _data={data}
              properties={{
                title: props.title ?? HEADER_OPTIONS[1].title,
                subtitle: additionalTitle, icon: HEADER_OPTIONS[1].icon,
                count, subCount
              }} />

            {!loadError && !error && (<LoadMore loadingMore={loadingMore} event={handleLoadMore} />)}
            <Spacer count={2} />
          </>

        </div>
        <div className="lg:mt-0 xl:mt-0 md:mt-0 -mt-10  col-span-12 md:col-span-3 lg:col-span-3 py-2 xl:col-span-2">
          {/* Sidebar filter */}
          <Sidebar connections={connectionsCategory} selectedCategory={router.query?.filter || null} onDataEvent={handleComponentDataEvent} workflow={props.workflow} userdata={userdata} />
          <Spacer count={2} />
          <MiniFooter showOnSmallScreens />
          <Spacer count={2} />
        </div>
      </div>
    </>
  );
}

export default ConnectionsList;

