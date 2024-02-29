/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useState } from "react";

const CustomCard = ({ id, title, content, price, imageSrc, link, authorName, authorRole, startDateTime, reviews, attending, isNew, onCardClick, isSelected }) => {const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const iconImageSrc = 'https://s3.amazonaws.com/uvsitydevimages/1308?updatedOn1581811240538';

  

  return (
    <div id="videoSection"
    style={{
      position: 'relative',
      border: '1px solid #ccc',
      padding: '10px',
      margin: '10px',
      width: '300px',
      cursor: 'pointer',
      background: isSelected ? '#0f8dbf' : (isHovered ? '#0f8dbf' : '#e0e0e0'),  
      overflow: 'hidden',
      transition: 'background 0.3s',
    }}
    onClick={() => onCardClick(id)}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <div title="Click here to view more details" onClick={() => window.open(link)}>
      <img alt="" height="142" width="266" src={imageSrc} />
      <h3 style={{ marginBottom: '10px', color: 'white', fontSize: '18px',color:'#4747',color: isHovered ? 'white' : '#474747'  }}><strong>{title}</strong></h3>
      <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', marginRight: '10px' }}>
        <img src={iconImageSrc} alt="Icon" style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
    <p style={{ textAlign: 'right', margin: '0px', marginRight: '40%', position: 'relative', top: '-40px', fontSize: '13px', color: 'white', color: isHovered ? 'white' : '#0f8dbf',zIndex: '1'}}>{content}</p>
    <p style={{ textAlign: 'right', margin: '0px', marginRight: '15%', position: 'relative', top: '-40px', fontSize: '12px', color: 'white', zIndex: '1',color: isHovered ? 'white' : '#666' }}>{ authorRole}</p>
    <label style={{ position: 'relative', top: '-30px', color: 'white', zIndex: '1',marginLeft:'40px',color: isHovered ? 'white' : '#0f8dbf' }}>Starts on {startDateTime}</label>
    <div style={{ display: 'flex', alignItems: 'center', zIndex: '1' }}>
      <div style={{ display: 'inline-block', marginBottom: '10px', marginRight: '8px', marginLeft: '38px', fontSize: '13px', color: 'white',color: isHovered ? 'white' : '#0f8dbf', }}>
        Reviews
      </div>
      <span>
      <i data-icon="★" className={`star-icon half${reviews}`} title={`${reviews}/5`}>☆☆☆☆☆</i>

      </span>
      <div style={{ display: 'inline-block', marginRight: '10px', fontSize: '13px', color: 'white',color: isHovered ? 'white' : '#0f8dbf' }}>
        {reviews}/5
      </div>
    </div>
    <div className="courseatte" style={{ float: 'none', display: 'inline-block', marginLeft: '0px', marginTop: '0px', marginBottom:'0px', color: 'white', zIndex: '1',color: isHovered ? 'white' : '#0f8dbf' }}>
      <span className="counter">{attending}</span>&nbsp;Attending
    </div>
    <label style={{ textAlign: 'center', margin: '0 -19px 0 0', position: 'absolute', right: '20px', bottom: '40px', width: 'auto', padding: '0px 4px', background: 'url("https://dev.uvsity.com/assets/images/new_label.png"', zIndex: '1',lineHeight:'20px' }}>
      {isNew && 'New'}
    </label>
  
    <div className="price-button" style={{ position: 'absolute', bottom: '2px', right: '1px', zIndex: '1' }}>
      <button style={{ padding: '3px 20px', fontSize: '12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '2px' }}>
        ${price}
      </button>
    </div>
  </div>
  );
};

const VideoSection = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId === selectedCard ? null : cardId);
  };

  const cardData = [
    { 
      id: 1,
      title: 'Record and Replay - Session and Enrollments-2 ' , 
      content: 'by Shalav Jaiswal', 
     
      price: 0, 
      startDateTime: '01/23/2023 02:00', 
      reviews: 0, 
      attending: 0, 
      imageSrc: 'https://s3.amazonaws.com/uvsitydevcourseimages/1308/1585970014124', 
      link: 'https://example.com', 
      authorName: 'Shalav Jaiswal',
      authorRole: 'Co-founder, Uvsity Corporation',
      isNew: true,
    },
    { 
      id: 2,
      title: 'Test Course', 
      content: 'by Shalav Jaiswal', 
      price: 0, 
     
      startDateTime: '02/15/2023 12:30', 
      reviews: 0, 
      attending: 0, 
      imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzqMsbBKTbPfkuvjLjCmYOH3Y1wJAZb0TSiVTWHcSF8N8qy87RWddw_tV4Cw9piXOg92E&usqp=CAU', 
      link: 'https://example.com', 
      authorName: 'Another Author',
      authorRole: 'Co-founder, Uvsity Corporation',
      isNew: true,
    },
  ];

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    backgroundImage: 'url("https://dev.uvsity.com/assets/images/bgImg.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '90px',
    position: 'relative',
  };

  const headingStyle = {
    textAlign: 'center',
    top: '10px',
    position: 'absolute',
    width: '100%',
    fontSize: '26px',
    color: '#0f8dbf',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}><strong>Live Sessions</strong></h2>
      {cardData.map((card) => (
        <CustomCard
          key={card.id}
          id={card.id}
          title={card.title}
          content={card.content}
          price={card.price}
          imageSrc={card.imageSrc}
          link={card.link}
          authorName={card.authorName}
          authorRole={card.authorRole}
          startDateTime={card.startDateTime}
          reviews={card.reviews}
          attending={card.attending}
          isNew={card.isNew}
          onCardClick={handleCardClick}
          isSelected={selectedCard === card.id}
        />
      ))}
    </div>
  );
};

export default VideoSection;

