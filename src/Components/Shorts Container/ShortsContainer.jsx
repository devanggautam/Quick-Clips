import React, {useState } from "react";
import { Row, Col, Typography } from 'antd'
import styles from './ShortsContainer.module.css'
import ShortsPlayer from '../Shorts Player/ShortsPlayer'
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

function ShortsContainer({title, url, thumbnail, description, shortsData, setShortsData, id, playingVideoId}) {

  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  

  const handleLike = ()=>{
    setLiked(!liked)
    setDisliked(false)
  }
  
  const handleDisliked = ()=>{
    setDisliked(!disliked)
    setLiked(false)
  }

  
  return (
        <Row  justify={'center'} align={'middle'} >
        <Col className={styles.shortsPlayerContainer} sm={10} md={6} xs={24}>
            <ShortsPlayer playingVideoId={playingVideoId} id={id}  title={title} url={url} thumbnail={thumbnail}/>
            <Col className={styles.userActionsContainer}>
              {liked ? 
            <LikeFilled onClick={handleLike} className={styles.likeIcon}/>:
            <LikeOutlined onClick={handleLike} className={styles.likeIcon}/>
              }
              {disliked ? 
            <DislikeFilled onClick={handleDisliked} className={styles.dislikeIcon}/>:
            <DislikeOutlined onClick={handleDisliked} className={styles.dislikeIcon} />
              }
            
            </Col>
            <Col className={styles.shortDetailsContainer} >
            <Title style={{color: "white"}} level={5}>{title}</Title>
            <Paragraph style={{color: "white"}}>{description?.slice(0, 130) + "..."}</Paragraph>
            
            </Col>
        </Col>
      
    </Row>
  );
}

export default ShortsContainer
