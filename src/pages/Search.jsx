import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Main from "../components/section/Main";

import VideoSearch from "../components/video/VideoSearch";
import { fetchFromAPI } from "../utils/api";

const Search = () => {
  const { searchId } = useParams();
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setVideos([]);
    fetchVideos(searchId);
    setloading(true);
  }, [searchId]);

  const fetchVideos = (query, pageToken = "") => {
    fetchFromAPI(`search?part=snippet&q=${query}&pageToken=${pageToken}`)
      .then((data) => {
        setNextPageToken(data.nextPageToken);
        setVideos((prevVideos) => [...prevVideos, ...data.items]);
        setloading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setloading(false);
      });
  };

  const handleLoadMore = () => {
    if (nextPageToken) {
      fetchVideos(searchId, nextPageToken);
    }
  };

  const searchPageClass = loading ? "isLoading" : "isLoaded";

  return (
    <Main title="유투브 검색" description="유튜브 검색 결과 페이지입니다.">
      <section id="searchPage" className={searchPageClass}>
        <h2>
          🥹<em>{searchId}</em> 검색 결과입니다.
        </h2>
        <div className="video__inner search">
          <VideoSearch videos={videos} />
        </div>
        <div className="video__more">
          {nextPageToken && <button onClick={handleLoadMore}>더 보기</button>}
        </div>
      </section>
    </Main>
  );
};

export default Search;
