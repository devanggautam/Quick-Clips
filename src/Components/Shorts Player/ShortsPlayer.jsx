import React, { useEffect, useRef } from 'react'
import { ControlBar, Player, BigPlayButton, LoadingSpinner } from 'video-react'




const ShortsPlayer = ({title, url, thumbnail, playingVideoId, id}) => {


  const player=  useRef(null);


  useEffect(()=>{
    // console.log('currentvideoid', playingVideoId)
    if(id === playingVideoId){
      player?.current.load();
      // console.log(player, 'video play')
}
  else if (id !== playingVideoId) {
    // console.log(id, player,  'video paused')
    player.current.currentTime = 0; 
    player.current.pause(); 
  }
  }, [playingVideoId, id])



  return (
    <>
    <Player
    ref={player}
    height={"100%"}
    width={"100%"}
    autoPlay={true}
    fluid={false}
    // playsInline
    // poster={thumbnail}s
    src={url}
  >
    <ControlBar disableCompletely></ControlBar>
    <BigPlayButton  position="center" />
    <LoadingSpinner />
  </Player>
  </>
  )
}

export default ShortsPlayer