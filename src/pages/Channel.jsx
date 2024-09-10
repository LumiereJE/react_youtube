import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/api";

import Main from "../components/section/Main";
import VideoSearch from "../components/video/VideoSearch";

import { CiBadgeDollar, CiMedal, CiRead } from "react-icons/ci";

const Channel = () => {
  const { channelId } = useParams();
  const [channelDetail, setChannelDetail] = useState(); // 채널 세부정보를 저장
  const [channelVideo, setChannelVideo] = useState([]); // 채널 비디오 목록을 저장
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await fetchFromAPI(
          `channels?part=snippet&id=${channelId}`
        );
        setChannelDetail(data.items[0]); // 채널id에 따라 불러온 0번째 정보를 저장

        const videosData = await fetchFromAPI(
          `search?channelId=${channelId}&part=snippet%2Cid&order=date`
        );
        setChannelVideo(videosData?.items); // items의 속성은 배열임.
        setNextPageToken(videosData?.nextPageToken);
      } catch (error) {
        console.error("Error fetching data : ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [channelId]);

  const loadMoreVideos = async () => {
    if (nextPageToken) {
      const videosData = await fetchFromAPI(
        `search?channelId=${channelId}&part=snippet%2Cid&order=date&pageToken=${nextPageToken}`
      );
      setChannelVideo((prevVideos) => [...prevVideos, ...videosData.items]);
      setNextPageToken(videosData?.nextPageToken);
    }
  };

  const channelPageClass = loading ? "isLoading" : "isLoaded";

  return (
    <Main title="유튜브 채널" description="유튜브 채널페이지입니다.">
      <section id="channel" className={channelPageClass}>
        {channelDetail && (
          <div className="channel__inner">
            <div
              className="channel__header"
              style={{
                backgroundImage: `url(${channelDetail.brandingSettings.image.bannerExternalUrl})`,
              }}
            >
              <div className="circle">
                <img
                  src={channelDetail.snippet.thumbnails.high.url}
                  alt={channelDetail.snippet.title}
                />
              </div>
            </div>
            <div className="channel__info">
              <h3 className="title">{channelDetail.snippet.title}</h3>
              <p className="desc">{channelDetail.snippet.description}</p>
              <div className="info">
                <span className="info_span">
                  <CiBadgeDollar />
                  {channelDetail.statistics.subscriberCount}
                </span>
                <span className="info_span">
                  <CiMedal />
                  {channelDetail.statistics.videoCount}
                </span>
                <span className="info_span">
                  <CiRead />
                  {channelDetail.statistics.viewCount}
                </span>
              </div>
            </div>
            <div className="channel__video video__inner search">
              <VideoSearch videos={channelVideo} />
            </div>
            <div className="channel__more">
              {nextPageToken && (
                <button onClick={loadMoreVideos}>더 보기</button>
              )}
            </div>
          </div>
        )}
      </section>
    </Main>
  );
};

export default Channel;
