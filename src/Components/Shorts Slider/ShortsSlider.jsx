import React, { useEffect, useRef, useState } from "react";
import { Col, Image } from "antd";
import styles from './ShortsSlider.module.css'
import Slider from "react-slick";
import { useSwipeable } from "react-swipeable";
import ShortsContainer from "../Shorts Container/ShortsContainer";
import data from '../../VideosData.json'
import NextIcon from '../../Assets/Icons/Right Arrow.png'
import PreviousIcon from '../../Assets/Icons/Left Arrow.png'

  
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block",  }}
      onClick={onClick}
    ><Image preview={false} style={{width: "2vw"}} src={PreviousIcon}/>
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block"}}
      onClick={onClick}
    ><Image preview={false} style={{width: "2vw"}} src={NextIcon}/></div>
  );
}



function ShortsSlider() {
  
  // min and max are ints both inclusive
  function getRandomInteger(min, max) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand)
  }

  
  function getRandomVideo(videoList) {
  const numvideos = videoList.length;
  const randomVideoNum = getRandomInteger(0, numvideos - 1);
  return videoList[randomVideoNum]
}


const initVideos = (data) => {
  const videoList = [getRandomVideo(data)];

  let nextVideo = null;

  do {
    nextVideo = getRandomVideo(data);
  } while (nextVideo.id === videoList[0].id);
  
  return [...videoList, nextVideo];
}

const [shortsData, setShortsData] = useState(initVideos(data));
const [currentVideoId, setCurrentVideoId] = useState(null);
const [playingVideoId, setPlayingVideoId] = useState(null);
let sliderRef = useRef(null);


  
const handlers = useSwipeable({
  onSwipedUp: () => sliderRef.slickNext(),
  onSwipedDown: () => sliderRef.slickPrev(),
  // ...config,
});


useEffect(() => {
  if (shortsData.length) {
    setCurrentVideoId(shortsData[shortsData.length - 1].id)
    setPlayingVideoId(shortsData[shortsData.length - 2].id)
  }
}, [shortsData])

useEffect(()=> {
  if(shortsData.length === 0){
    setShortsData([...shortsData, getRandomVideo(data)])
  }
}, [shortsData])

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    vertical: true,
    responsive : [
      {
        breakpoint: 768,
        settings: {
          nextArrow: null,
          prevArrow: null,
          arrows: false,
          swipe:true,
        }
      },
    ],
    swipe:false,
    beforeChange: function(last, current,) {
      if (last > current ){
        shortsData.pop(shortsData.length)
        setShortsData([...shortsData])
      }
      else if (current === 0 && last !== 0){
        
      }
      
      else if (current !== 0 ) {
        let newVideo = null;

        do {
          newVideo = getRandomVideo(data);
        } while (newVideo.id === currentVideoId)
        setShortsData([...shortsData, newVideo])
      }
      // console.log('last = ',  last, 'current = ', current)
      // console.log(shortsData)
    },

    
    afterChange: function(currentSlide, slide) {
      // console.log('current' , currentVideoId)

    }
  
  };
  return (
    <Col 
    {...handlers} style={{overflow: "hidden"}} className="slider-container">
      <Slider ref={slider => (sliderRef = slider)}  {...settings}>
        { shortsData.map((e)=>(

            <ShortsContainer playingVideoId={playingVideoId} description={e.description} shortsData={shortsData} setShortsData={setShortsData} key={e.id} id={e.id} liked={e.liked} disliked={e.disliked} title={e.title} url={e.videoUrl} thumbnail={e.thumbnailUrl}/>
        ))
        }
      </Slider>
    </Col>
  );
}

export default ShortsSlider;
