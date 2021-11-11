import React, { useEffect } from "react";
import { Col, Container, Row, Spinner, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import getAllVideo from "../redux/VideoRedux/videos.operations";
import putVoteVideo from "../redux/VideoRedux/vote.operations";
import {
  BsHandThumbsDownFill,
  BsHandThumbsDown,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
} from "react-icons/bs";
import "../css/video.css";
import { TItemVideo } from "../api/video";

const Videos = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state: any) => state.video);
  const { user } = useSelector((state: any) => state.auth);

  const onLikeOrUnlike =
    (videoId?: string, isVote: boolean = false) =>
    async () => {
      try {
        await dispatch(putVoteVideo({ videoId, isVote }));
      } catch (err: any) {
        console.log("err", { ...err });
      }
    };

  useEffect(() => {
    dispatch(getAllVideo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center pt-4">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }
  return (
    <Container className="d-flex pt-4">
      {data?.length > 0 ? (
        <Col xs={12}>
          {data?.map((item: TItemVideo, index: number) => {
            return (
              <Row key={`${index}-video`} className="mt-2 mb-5">
                <Col xs={6} className="d-flex justify-content-end">
                  <iframe
                    title={item._id}
                    src={`https://www.youtube.com/embed/${item.videoId}`}
                  ></iframe>
                </Col>
                <Col xs={6}>
                  <strong className="text-danger">{item?.title}</strong>
                  <div className="mt-2">
                    <strong>Share by:</strong>
                    <span className="p-2 text-danger">{item?.authorShare}</span>
                    <span>
                      <Button
                        variant="light"
                        disabled={!user}
                        onClick={onLikeOrUnlike(item?._id, false)}
                      >
                        {!item.isUnLikes ? (
                          <BsHandThumbsDown />
                        ) : (
                          <BsHandThumbsDownFill color="#0d6efd" />
                        )}
                        <span className="p-1">{item.unLikes || 0}</span>
                      </Button>

                      <Button
                        variant="light"
                        className="m-2"
                        disabled={!user}
                        onClick={onLikeOrUnlike(item?._id, true)}
                      >
                        {!item.isLike ? (
                          <BsHandThumbsUp />
                        ) : (
                          <BsHandThumbsUpFill color="#0d6efd" />
                        )}
                        <span className="p-1">{item.likes || 0}</span>
                      </Button>
                    </span>
                  </div>
                  <div className="mt-2 text-dark text-desc">{item?.desc}</div>
                </Col>
              </Row>
            );
          })}
        </Col>
      ) : (
        <Col xs={12} className="d-flex justify-content-center">
          <strong className="text-danger">{"No Movies!"}</strong>
        </Col>
      )}
    </Container>
  );
};

export default Videos;
