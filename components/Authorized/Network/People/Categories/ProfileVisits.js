import React, { useState, useEffect } from 'react'
import { TITLES } from '../../../../../constants/userdata';
import SearchService from '../../../../../pages/api/people/network/Search/SearchService';
import LoadMore from '../../../../shared/LoadMore';
import MiniFooter from '../../../../shared/MiniFooter';
import Spacer from '../../../../shared/Spacer';
import Sidebar from '../Filter/Sidebar';
import Connections from './Connections/_Connections';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { asyncSubscriptions } from '../../../../../async/subscriptions';
import Overlay from '../../../../shared/Overlay';
import { LOADING_MESSAGE_DEFAULT } from '../../../../../constants/constants';
function ProfileVisits(props) {
  const [loadMore, setLoadMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [data, setData] = useState([]);
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
  const [isDataChangedFromFilter, dataChangedFromFilter] = useState(false);
  const [error, setError] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const getConnectionsData = async (filterData,customPaylod) => {
    let payload=null;
    if(customPaylod){
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
        educationalInstitutionFullName:educationInstitution,
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
        educationalInstitutionFullName:educationInstitution,
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

  const setConnectionData = (data,customPaylod) => {
    getConnectionsData(data,customPaylod).then((res) => {
      if (!loadMore) {
        setLoading(false);
        setData(res);
        setProcessingFilterRequest(false)
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
      setProcessingFilterRequest(false)
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

  const handleComponentDataEvent = (data) => {
    setProcessingFilterRequest(true)
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
      setConnectionData(customPayload,true);
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
      setConnectionData(data);
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
        <Overlay message={LOADING_MESSAGE_DEFAULT} open={processingFilterRequest} />
        <div className="z-40 col-span-12 md:pt-2 md:col-span-8 lg:col-span-8 xl:col-span-6">


          <Connections filters={null} error={loadError} loading={loading} workflow={props.workflow} userdata={props?.userdata?.data} dataChange={handleDataChange} _data={data} properties={{ title: TITLES.PEOPLE_WHO_VIEWED_YOU, icon: PeopleAltIcon }} />

          {data.length > 0 && !error && (<LoadMore loadingMore={loadingMore} event={handleLoadMore} />)}
          <Spacer count={2} />

        </div>
        <div className="lg:mt-0 xl:mt-0 md:mt-0 -mt-10  col-span-12 md:col-span-3 lg:col-span-3 py-2 xl:col-span-2">
          {/* Sidebar filter */}
          <Sidebar onDataEvent={handleComponentDataEvent} workflow={props.workflow} userdata={props.userdata?.data} />

          <Spacer count={2} />
          <MiniFooter showOnSmallScreens />
          <Spacer count={2} />
        </div>
      </div>
    </>
  );
}

export default ProfileVisits