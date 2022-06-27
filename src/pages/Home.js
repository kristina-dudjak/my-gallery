import Search from "../components/Search";
import "../App";
import Mosaic from "../components/Mosaic";
import Api from "../Api";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ImageModal from "../components/ImageModal";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";

function Home() {
  const { query } = useParams();
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();
  const [modalPost, setModalPost] = useState(null);
  var pageNumber = useRef(1);

  useEffect(() => {
    if (query) pageNumber.current = 1;
    loadMore();
  }, [query]);

  function showModal(post) {
    setModalPost(post);
  }

  function hideModal() {
    setModalPost(null);
  }

  function onSearch(query) {
    navigate(`/photos/${query}`);
  }

  function loadMore() {
    if (query) {
      Api.getImagesByQuery(query, pageNumber.current).then((e) => {
        const newQueryPosts =
          posts && pageNumber.current !== 1 ? posts.concat(e) : e;
        setPosts(newQueryPosts);
        pageNumber.current++;
      });
    } else {
      Api.getImages(pageNumber.current).then((e) => {
        const newPosts =
          posts && pageNumber.current !== 1 ? posts.concat(e) : e;
        setPosts(newPosts);
        pageNumber.current++;
      });
    }
  }

  return (
    <Container>
      {modalPost && <ImageModal post={modalPost} onClose={hideModal} />}
      <Row>
        <Col>
          <Search onSearch={onSearch} />
        </Col>
      </Row>
      {posts && (
        <Row>
          <InfiniteScroll
            initialLoad={false}
            loadMore={loadMore}
            hasMore={true}
            loader={<div>Loading ...</div>}
          >
            {<Mosaic posts={posts} onImageClick={showModal} />}
          </InfiniteScroll>
        </Row>
      )}
    </Container>
  );
}

export default Home;
