import React from "react";
import Main from "../components/section/Main";
import Today from "../components/contents/Today";
import Developer from "../components/contents/Developer";
import Webd from "../components/contents/Webd";
import Website from "../components/contents/Website";
import Gsap from "../components/contents/Gsap";
import Portfolio from "../components/contents/Portfolio";
import Youtube from "../components/contents/Youtube";

const Home = () => {
  return (
    <Main title="react Youtube" description="리액트 공부용 페이지입니다.">
      <Today />
      <Developer />
      <Webd />
      <Website />
      <Gsap />
      <Portfolio />
      <Youtube />
    </Main>
  );
};

export default Home;
