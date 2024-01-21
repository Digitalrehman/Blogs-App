import React, { useEffect, useState } from "react";
import Navbar from "../SeperateNavbar/Navbar";
import "./Card.css";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import moment from "moment";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const Favourite = () => {
  let shareUrl = "https://drehmanportfolio.netlify.app";
  let [like, setLike] = useState(false);
  let [count, setCount] = useState("");
  const LikeHandler = () => {
    setLike(!like);
    setCount(like ? count - 1 : count + 1);
  };
  const [book, setBook] = useState([]);

  useEffect(() => {
    const savedBook = localStorage.getItem("bookmarkedPosts");
    setBook(JSON.parse(savedBook));
  }, []);

  return (
    <>
      <Navbar />
      <div className="body-card">
        {book.map((product, index) => (
          <div className="card" key={index}>
            <h2>{product.title}</h2>
            <p className="description">{product.description}</p>
            <h4>Author</h4>
            <p className="footer">{product.status}</p>
            <div className="date">
              <p>{moment(product.createdAt).format("DD-MM-YYYY")}</p>
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

export default Favourite;
