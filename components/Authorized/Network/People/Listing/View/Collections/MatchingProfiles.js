import React, { useMemo } from 'react'
import InterestBasedMatchingProfile from '../../../../../Profile/InterestBasedMatchingProfile'
import { getRandomArrayElement } from '../../../../../../../utils/utility';
import { Typography } from '@mui/material';
import InterestsIcon from "@mui/icons-material/Interests";

function MatchingProfiles(props) {
    const handleDiscoverProfilesThroughCommonInterests = (event) => {
        props.discoverProfilesThroughCommonInterests()
    }
    const getRandomElement = (array) => getRandomArrayElement(array)
    const getRandomSubarray = (arr) => {
        const shuffled = arr.slice(0).sort(() => 0.5 - Math.random());
        let subArraySize = Math.floor(Math.random() * (arr.length + 1)); // Random subarray size

        // Ensure subArraySize is greater than zero
        subArraySize = Math.max(1, subArraySize);

        return shuffled.slice(0, subArraySize);
    }
    const names = ['John Doe', 'Jane Smith', 'Alex Johnson', 'Emily Davis', 'Chris Miller', 'Megan Wilson', 'Kevin Brown', 'Raghuram N', 'Bismillah Khan', 'Maqsud Alam', 'Stacy Lewis', 'Olivia Taylor', 'Ryan Moore', 'Sophia Anderson', 'Shalav Jaiswal', 'Sumit Kumar', 'Swaroop Chakraborty', 'Sandipan De', 'Sujoy Acharya'];
    const designations = ['Developer', 'Software Engineer', 'UX Designer', 'Designer', 'Manager', 'Engineer', 'Analyst', 'Architect', 'Consultant', 'Co-founder', 'Visiting Lecturer', 'Faculty', 'Student'];
    const locations = ['San Fransisco', 'New York', 'Delhi', 'Houston', 'Atlanta', 'Calcutta', 'Bangalore', 'Santa Clara', 'San Jose'];
    const institutions = ['Tech University', 'Creative Institute', 'Business School', 'Science College', 'Toastmaster International'];
    const interests = ['Coding', 'Reading', 'Hiking', 'Traveling', 'Photography', 'Music', 'Cooking'];
    const profilePictures = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs5SVvNA1JjXyDB8X2i9VjBOl96w4YTB22KRCePDlC35G5wWaiuZlEYHAatQVSqOmrTC4&usqp=CAU',
        'https://expertphotography.b-cdn.net/wp-content/uploads/2018/10/cool-profile-picture-natural-light.jpg',
        'https://images.squarespace-cdn.com/content/v1/5bfc8dbab40b9d7dd9054f41/1543424201416-S6Q5OPV25MXETU154ZLQ/Randy+Krum+Profile+Photo+square.jpg',
        'https://www.microsoft.com/en-us/research/uploads/prod/2018/01/profile_square.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROQ7cmaekYwFosvBQl9U3rCmLWQxO9happ38MhmMdMjphSg3s5uGqjLSqjH8oaUABYEZU&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHxLo3EBk4C__iFHhPsb9no_Ai-h8-w47NyY2QBv5ZGhx4OFi5YlxL2Lt1SLnNROh2bpI&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRczJpreX3-4M9fds6Q-fl6nNqkK5hx0c2YTfJV95G6vDeNIBx6SwGdQUdrxedwR_Fwtas&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUqxJ3fGS76KD8DTMbPbUDyp-uMGaL5VxX2iiIl3SdSpgkAVSGJ_WbVySwqFyemza_Enw&usqp=CAU',
        'https://s3.amazonaws.com/uvsitydevimages/2496?updatedOn1652437337798']
    const generateRandomPerson = () => ({
        name: getRandomElement(names),
        designation: getRandomElement(designations),
        institution: getRandomElement(institutions),
        city: getRandomElement(locations),
        interests: getRandomSubarray(props.interests),
        profilePicture: getRandomElement(profilePictures)
    });


    const people = useMemo(() => {
        return Array.from({ length: 30 }, generateRandomPerson)
    }, [props])

    return (
        <div className='flex flex-col space-y-2'>
            {people.length > 0 && (
                <Typography className='p-4 flex lg:justify-center lg:items-center ' variant="h5" component="blockquote" gutterBottom>
                    <InterestsIcon /> {`Based on your interests, we've found some interesting people whom you might want to connect.`}
                </Typography>)}

            <div style={{ display: 'flex', gap: '5', overflowX: 'auto', padding: '10px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>

                {people.map((p, idx) => (
                    <div className='' key={idx}>
                        <InterestBasedMatchingProfile
                            name={p.name}
                            img={p.profilePicture}
                            location={p.city}
                            designation={p.designation}
                            interests={p.interests} />
                    </div>
                ))}
            </div>
            {people.length > 0 && (
                <Typography onClick={handleDiscoverProfilesThroughCommonInterests} className='p-4 flex justify-center items-center' variant="h6" component="button" gutterBottom>
                    🧐  Discover again ?
                </Typography>)}
        </div>

    )
}

export default MatchingProfiles