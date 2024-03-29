// Component displays the People who visited logged in user's profile.
import React, { useState, useEffect,useCallback } from 'react'
import { CONNECTIONS, TITLES } from '../../../../../../constants/userdata';
import SearchService from '../../../../../../pages/api/people/network/Search/SearchService';
import LoadMore from '../../../../../shared/LoadMore';
import MiniFooter from '../../../../../shared/MiniFooter';
import Spacer from '../../../../../shared/Spacer';
import Sidebar from '../../Filter/Sidebar';
import Connections from '../Connections/_Connections';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { asyncSubscriptions } from '../../../../../../async/subscriptions';
import Overlay from '../../../../../shared/Overlay';
import { LOADING_MESSAGE_DEFAULT } from '../../../../../../constants/constants';
import { useDataLayerContextValue } from '../../../../../../context/DataLayer';
function ProfileVisits(props) {
  const [ctxUserdata, dispatch] = useDataLayerContextValue();
  const [userdata, setUserData] = useState(null);
  const [loadMore, setLoadMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [data, setData] = useState([]);
  const [breadCrumbFilter, setBreadCrumbFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingFilterRequest, setProcessingFilterRequest] = useState(false);
  const [student, setStudent] = useState(false);
  const [professors, setProfessors] = useState(false);
  const [alumni, setAlumni] = useState(false);
  const [inMyNetworkFilterCriteria, setInMyNetworkFilter] = useState(false);
  const [awaitingResponseFilterCriteria, setAwaitingResponse] = useState(false);
  const [onlyFriendsRequired, setOnlyFriendsRequired] = useState(false);
  const [educationInstitution, setEducationInstitution] = useState(null)
  const [campus, setCampus] = useState(null)
  const [specialization, setSpecialization] = useState(null)
  const [country, setCountry] = useState(
    null
  );
  const [city, setCity] = useState(null)
  const [resetFilterField, setFilterFieldReset] = useState(null)
  const [isDataChangedFromFilter, dataChangedFromFilter] = useState(false);
  const [isBreadCrumbsDeleted, setBreadCrumbsDeleted] = useState(false);

  const [error, setError] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [connectionsCategory, setConnectionsCategory] = useState(CONNECTIONS)

  const setConnectionData = useCallback((filterData, customPaylod) => {
    const getConnectionsData = async (filterData, customPaylod) => {
      let payload = null;
      if (customPaylod) {
        payload = filterData;
      }
      else {
        payload = filterData ? {
          baseSearchActionType: asyncSubscriptions.INTERESTING_CONNECTIONS.alias,
          isOnlyFriendsRequired: onlyFriendsRequired,
          inMyNetworkFilterCriteria: filterData.categoryData.inMyNetworkFilterCriteria,
          professors: filterData.categoryData.professors,
          students: filterData.categoryData.students,
          alumni: filterData.categoryData.alumni,
          awaitingResponseFilterCriteria: filterData.categoryData.awaitingResponseFilterCriteria,
          educationalInstitutionFullName: educationInstitution,
          specialization,
          educationalInstitutionCampus: campus,
          countryFullName: country,
          cityFullName: city
        } : {
          baseSearchActionType: props.filter,
          isOnlyFriendsRequired: onlyFriendsRequired,
          inMyNetworkFilterCriteria,
          professors,
          students: student,
          alumni,
          awaitingResponseFilterCriteria,
          educationalInstitutionFullName: educationInstitution,
          specialization,
          educationalInstitutionCampus: campus,
          countryFullName: country,
          cityFullName: city
        }
      }

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

    getConnectionsData(filterData, customPaylod).then((res) => {
      if (!loadMore) {
        setLoading(false);
        setData(res);
        setProcessingFilterRequest(false)
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
      setProcessingFilterRequest(false)
      if (loadMore === false) {
        setLoadError(true)
      } else {
        setLoadMore(false)
      }
      setError(true);
      setData([])
      setLoadingMore(false)
    });
  }, [alumni, awaitingResponseFilterCriteria, campus, city, country, data, educationInstitution, error, inMyNetworkFilterCriteria, loadError, loadMore, onlyFriendsRequired, professors, props.filter, specialization, student])
  useEffect(() => {
    setLoading(true);
    setConnectionData();
  }, [props.filter, setConnectionData])

  useEffect(() => {
    if (loadMore === true)
      setConnectionData();
    dataChangedFromFilter(false)
    setBreadCrumbsDeleted(false)
  }, [loadMore, setConnectionData])

  const handleLoadMore = (obj) => {
    setLoadMore(true)
    setLoadingMore(true)
  }
  const handleDataChange = (obj) => {
    if (obj === true)
      setConnectionData()
  }

  const handleResetFilter = () => {
    // on reset filter request
    setStudent(false)
    setProfessors(false)
    setAlumni(false)
    setInMyNetworkFilter(false)
    setAwaitingResponse(false)
    setOnlyFriendsRequired(false)
    setEducationInstitution(null)
    setCampus(null)
    setSpecialization(null)
    setCountry(null)
    setCity(null)
    setFilterFieldReset(null)

    setLoading(true);
    const payload = {
      baseSearchActionType: props.filter,
      isOnlyFriendsRequired: false,
      inMyNetworkFilterCriteria: false,
      professors: false,
      students: false,
      alumni: false,
      awaitingResponseFilterCriteria: false,
      educationalInstitutionFullName: null,
      specialization: null,
      educationalInstitutionCampus: null,
      countryFullName: null,
      cityFullName: null
    }
    setData([])
    setConnectionData(payload, true)
  }

  const populateFilterOptionsBreadCrumb = (data) => {
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
      else if (key === 'awaitingResponseFilterCriteria') {
        connectionCategory = CONNECTIONS.at(3)
      }
      else if (key === 'inMyNetworkFilterCriteria') {
        connectionCategory = CONNECTIONS.at(4)
      }
      if (connectionCategory) {
        const idx = tempBreadCrumbFilter.findIndex((crumb) => crumb.id == connectionCategory.id)
        if (idx == -1) {
          connectionCategory.selected = value;
          connectionCategory.deleteable = true
          tempBreadCrumbFilter.push(connectionCategory)
        }
        else {
          tempBreadCrumbFilter[idx].deleteable = true
          tempBreadCrumbFilter[idx].selected = value
        }
      }

    }

    if (data.filterData) {
      let filteredChipObject = {}
      for (const [key, value] of Object.entries(data.filterData)) {
        filteredChipObject = {}
        filteredChipObject.title = value
        filteredChipObject.selected = value !== null && value !== "" ? true : false;
        filteredChipObject.deleteable = true
        if (key === 'educationalInstitutionFullName') {
          filteredChipObject.id = 6
          filteredChipObject.key = 'Institution'
        }
        else if (key === 'specialization') {
          filteredChipObject.id = 7
          filteredChipObject.key = 'Specialization'

        }
        else if (key === 'educationalInstitutionCampus') {
          filteredChipObject.id = 8
          filteredChipObject.key = 'Campus'

        }
        else if (key === 'countryFullName') {
          filteredChipObject.id = 9
          filteredChipObject.key = 'Country'

        }
        else if (key === 'cityFullName') {
          filteredChipObject.id = 10
          filteredChipObject.key = 'City'
        }
        if (filteredChipObject.key) {
          const idx = tempBreadCrumbFilter.findIndex((crumb) => crumb.id == filteredChipObject.id)
          if (idx == -1) {
            tempBreadCrumbFilter.push(filteredChipObject)
          }
          else {
            tempBreadCrumbFilter[idx].title = value
          }
        }
      }
    }
    tempBreadCrumbFilter = tempBreadCrumbFilter.filter((crumb) => crumb.selected === true)
    setBreadCrumbFilter(tempBreadCrumbFilter)
  }
  const handleComponentDataEvent = (data) => {
    if (data) {
      if (data.resetRequest) {
        handleResetFilter()
        setBreadCrumbFilter([])
        return
      }
      setProcessingFilterRequest(true)
      setFilterFieldReset(null)
      if (data.filterData && data.categoryData) {
        const customPayload = {
          baseSearchActionType: asyncSubscriptions.INTERESTING_CONNECTIONS.alias,
          isOnlyFriendsRequired: onlyFriendsRequired,
          inMyNetworkFilterCriteria: data.categoryData.inMyNetworkFilterCriteria,
          professors: data.categoryData.professors,
          students: data.categoryData.students,
          alumni: data.categoryData.alumni,
          awaitingResponseFilterCriteria: data.categoryData.awaitingResponseFilterCriteria,
          educationalInstitutionFullName: data.filterData.educationalInstitutionFullName,
          specialization: data.filterData.specialization,
          educationalInstitutionCampus: data.filterData.educationalInstitutionCampus,
          countryFullName: data.filterData.countryFullName,
          cityFullName: data.filterData.cityFullName
        }
        dataChangedFromFilter(true)
        setEducationInstitution(data.filterData.educationalInstitutionFullName)
        setCampus(data.filterData.educationalInstitutionCampus)
        setSpecialization(data.filterData.specialization)
        setCountry(data.filterData.countryFullName)
        setCity(data.filterData.cityFullName)
        setStudent(data.categoryData.students)
        setProfessors(data.categoryData.professors)
        setAlumni(data.categoryData.alumni)
        setAwaitingResponse(data.categoryData.awaitingResponseFilterCriteria)
        setInMyNetworkFilter(data.categoryData.inMyNetworkFilterCriteria)
        setLoading(true);
        setError(false)
        setData([])
        populateFilterOptionsBreadCrumb(data)
        setConnectionData(customPayload, true);
        return;
      }
      if (data.categoryData) {
        dataChangedFromFilter(true)
        setStudent(data.categoryData.students)
        setProfessors(data.categoryData.professors)
        setAlumni(data.categoryData.alumni)
        setAwaitingResponse(data.categoryData.awaitingResponseFilterCriteria)
        setInMyNetworkFilter(data.categoryData.inMyNetworkFilterCriteria)
        setLoading(true);
        setError(false)
        setData([])
        populateFilterOptionsBreadCrumb(data)
        setConnectionData(data);
      }
      return;
    }
  }
  const handleDeleteBreadCrumb = (obj) => {
    if (obj) {
      setData([])
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

      else if (obj.title === CONNECTIONS.at(3).title) {
        setAwaitingResponse(false)
      }
      else if (obj.title === CONNECTIONS.at(4).title) {
        setInMyNetworkFilter(false)
      }
      else if (obj.key === 'City') {

        setCity(null)
      }
      else if (obj.key === 'Institution') {
        setEducationInstitution(null)
      }

      else if (obj.key === 'Campus') {
        setCampus(null)
      }
      else if (obj.key === 'Specialization') {
        setSpecialization(null)
      }

      else if (obj.key === 'Country') {
        setCountry(null)
      }
      setFilterFieldReset(obj.key)
      setBreadCrumbsDeleted(true)

    }
  }

  useEffect(() => {
    if (isBreadCrumbsDeleted) {
      setConnectionData();
      return
    }
    if (isDataChangedFromFilter) {
      return;
    }
  }, [isDataChangedFromFilter, isBreadCrumbsDeleted, student, alumni, professors, awaitingResponseFilterCriteria, inMyNetworkFilterCriteria, city, country, specialization, campus, educationInstitution, setConnectionData])

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
        <Overlay message={LOADING_MESSAGE_DEFAULT} open={processingFilterRequest} />
        <div className="z-40 col-span-12 md:pt-2 md:col-span-8 lg:col-span-8 xl:col-span-6">
          <Connections handleDeleteBreadCrumb={handleDeleteBreadCrumb} filters={breadCrumbFilter} error={error} loading={loading} workflow={props.workflow} userdata={userdata} dataChange={handleDataChange} _data={data} properties={{ title: TITLES.PEOPLE_WHO_VIEWED_YOU, icon: PeopleAltIcon }} />
          {!loadError && !error && (<LoadMore loadingMore={loadingMore} event={handleLoadMore} />)}
          <Spacer count={2} />
        </div>
        <div className="lg:mt-0 xl:mt-0 md:mt-0 -mt-10  col-span-12 md:col-span-3 lg:col-span-3 py-2 xl:col-span-2">
          {/* Sidebar filter */}
          <Sidebar connections={connectionsCategory} resetField={resetFilterField} onDataEvent={handleComponentDataEvent} workflow={props.workflow} userdata={userdata} />
          <Spacer count={2} />
          <MiniFooter showOnSmallScreens />
          <Spacer count={2} />
        </div>
      </div>
    </>
  );
}

export default ProfileVisits