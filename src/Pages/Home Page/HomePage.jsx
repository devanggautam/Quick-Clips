import React from 'react';
import { Image, Layout, Menu, theme } from 'antd';
import Title from 'antd/es/typography/Title';
import styles from './HomePage.module.css'
import ShortsSlider from '../../Components/Shorts Slider/ShortsSlider';
const { Header, Content, Footer } = Layout;

    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      beforeChange: function(currentSlide, nextSlide) {
        // console.log("before change", currentSlide, nextSlide);
      },
      afterChange: function(currentSlide) {
        // console.log("after change", currentSlide);
      }
    };

const items = [];
const HomePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className={styles.quickClipsLogo} >
            <Image width={"40px"} src='https://cdn.icon-icons.com/icons2/2044/PNG/512/youtube_video_logo_icon_124364.png'/>
            <Title level={4}>Quick Clips</Title>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        margin: "0 10px"
        }}
      >
        <ShortsSlider/>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Quick Clips ©{new Date().getFullYear()} Created by Devang Gautam
      </Footer>
    </Layout>
  );
};
export default HomePage;