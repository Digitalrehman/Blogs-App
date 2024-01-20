import React, { useState } from "react";
import axios from "axios";
import "./Card.css";
import { MdEditDocument } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { API_URL } from "../../Global";
import { errornotify, successnotify } from "../Tostify/Tostify";
import { AiFillLike } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa6";
import moment from "moment";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { addBookMark } from "../../Store/Slice/index";
import { useDispatch } from "react-redux";

const ToDo = ({
  task,
  showtask,
  appendTaskDetail,
  setIsupdating,
  setGetallTask,
}) => {
  let shareUrl = "https://drehmanportfolio.netlify.app";
  let dispetch = useDispatch();
  let [like, setLike] = useState(false);
  let [count, setCount] = useState("");
  let [book, setBook] = useState(Array(task.length).fill(false));

  const LikeHandler = () => {
    setLike(!like);
    setCount(like ? count - 1 : count + 1);
  };

  const bookHandler = (index) => {
    let updatedBook = [...book];
    updatedBook[index] = !updatedBook[index];
    setBook(updatedBook);
  };

  const editTaskHandler = (index) => {
    let taskid = task[index];
    setIsupdating(true);
    appendTaskDetail(taskid, taskid._id);
    showtask(true);
  };

  const DeleteTask = (index) => {
    let taskid = task[index];
    task.splice(index, 1);
    setGetallTask([...task]);
    let token = localStorage.getItem("token");

    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .delete(`${API_URL}/deleteTask/${taskid._id}`, config)
      .then((res) => {
        successnotify(res.data.message);
      })
      .catch((error) => {
        errornotify(error.response.data.message);
      });
  };

  let AddCArdHandler = (item) => {
    bookHandler();
    dispetch(addBookMark(item));
  };

  return (
    <>
      <div className="body-card">
        {task &&
          task.map((item, index) => (
            <div className="card" key={item._id} onDoubleClick={LikeHandler}>
              <h2>{item.title}</h2>
              <p className="description">{item.description}</p>
              <h4>Author</h4>
              <p className="footer">{item.status}</p>
              <div className="date">
                <p>{moment(item.createdAt).format("DD-MM-YYYY")}</p>
                <div className="button">
                  <span>
                    <MdEditDocument
                      onClick={() => {
                        editTaskHandler(index);
                      }}
                    />
                  </span>
                  <span>
                    <MdDelete
                      onClick={() => {
                        DeleteTask(index);
                      }}
                    />
                  </span>
                </div>
              </div>
              <div className="icons">
                <div className="socail-icon">
                  <span className="like">
                    {!like ? (
                      <AiOutlineLike onClick={LikeHandler} />
                    ) : (
                      <AiFillLike onClick={LikeHandler} />
                    )}
                  </span>

                  <span className="count">
                    <p>{count}</p>
                  </span>

                  <Link to="#">
                    {!book ? (
                      <FaRegBookmark onClick={bookHandler} />
                    ) : (
                      <FaBookmark
                        onClick={() => {
                          bookHandler;
                          AddCArdHandler(item);
                        }}
                      />
                    )}
                  </Link>
                </div>
                <div className="share-icon">
                  <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={30} round={true} className="facebook" />
                  </FacebookShareButton>
                  <WhatsappShareButton url={shareUrl} className="facebook">
                    <WhatsappIcon size={30} round={true} />
                  </WhatsappShareButton>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ToDo;
