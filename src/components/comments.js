import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.formatTime = this.formatTime.bind(this);
  }

  formatTime(time) {
    // const { time } = this.props;
    const dateParse = new Date(Date.parse(time));
    const dateObject = {
      year: new Intl.DateTimeFormat("en", { year: "numeric" }).format(
        dateParse
      ),
      month: new Intl.DateTimeFormat("en", { month: "long" }).format(dateParse),
      day: new Intl.DateTimeFormat("en", { day: "2-digit" }).format(dateParse),
      hour: new Intl.DateTimeFormat("en", {
        hour12: false,
        hour: "numeric",
      }).format(dateParse),
      min: new Intl.DateTimeFormat("en", { minute: "numeric" }).format(
        dateParse
      ),
    };
    let dateNow = `${dateObject.day} ${dateObject.month} ${dateObject.year} ${dateObject.hour}:${dateObject.min}`;
    return <p className="time">{dateNow}</p>;
  }

  // render() {
  //   const { data, increment, decrement } = this.props;
  //   // const dateParse = new Date(Date.parse(data.time));
  //   // const dateObject = {
  //   //   year: new Intl.DateTimeFormat("en", { year: "numeric" }).format(
  //   //     dateParse
  //   //   ),
  //   //   month: new Intl.DateTimeFormat("en", { month: "long" }).format(dateParse),
  //   //   day: new Intl.DateTimeFormat("en", { day: "2-digit" }).format(dateParse),
  //   //   hour: new Intl.DateTimeFormat("en", {
  //   //     hour12: false,
  //   //     hour: "numeric",
  //   //   }).format(dateParse),
  //   //   min: new Intl.DateTimeFormat("en", { minute: "numeric" }).format(
  //   //     dateParse
  //   //   ),
  //   // };
  //   // let dateNow = `${dateObject.day} ${dateObject.month} ${dateObject.year} ${dateObject.hour}:${dateObject.min}`;
  //   return (
  //     <>
  //       {data.map((item) => {
  //         return (
  //           <div key={item.id}>
  //             <div className="comment-content">
  //               <div className="comment-content-user--photo bg-gray">
  //                 <img src={item.avatar} alt="" className="size" />
  //               </div>
  //               <div className="comment-content-user">
  //                 <h4 className="name bold">{item.author}</h4>
  //                 {/* <p className="time">{dateNow}</p> */}
  //                 <p className="contain">{item.message}</p>
  //                 <div className="point">
  //                   <span className="point-display">{`${item.point} point`}</span>
  //                   <button
  //                     className="point-btn"
  //                     type="button"
  //                     onClick={() => increment(item.id)}
  //                   >
  //                     <FontAwesomeIcon icon={faArrowUp} />
  //                   </button>
  //                   <button
  //                     className="point-btn"
  //                     type="button"
  //                     onClick={() => decrement(item.id)}
  //                   >
  //                     <FontAwesomeIcon icon={faArrowDown} />
  //                   </button>
  //                 </div>
  //                 <br />
  //                 <div className="reply">
  //                   {/* {item.replies.map((item) => {
  //                     const dateParse2 = new Date(Date.parse(item.date));
  //                     const dateObject2 = {
  //                       year: new Intl.DateTimeFormat("en", {
  //                         year: "numeric",
  //                       }).format(dateParse2),
  //                       month: new Intl.DateTimeFormat("en", {
  //                         month: "long",
  //                       }).format(dateParse2),
  //                       day: new Intl.DateTimeFormat("en", {
  //                         day: "2-digit",
  //                       }).format(dateParse2),
  //                       hour: new Intl.DateTimeFormat("en", {
  //                         hour12: false,
  //                         hour: "numeric",
  //                       }).format(dateParse2),
  //                       min: new Intl.DateTimeFormat("en", {
  //                         minute: "numeric",
  //                       }).format(dateParse2),
  //                     };
  //                     let dateNow2 = `${dateObject2.day} ${dateObject2.month} ${dateObject2.year} ${dateObject2.hour}:${dateObject2.min}`;
  //                     return (
  //                       <>
  //                         <div className="comment-content">
  //                           <div className="comment-content-user--photo reply bg-gray">
  //                             <img src={item.avatar} alt="" className="size" />
  //                           </div>
  //                           <div className="comment-content-user">
  //                             <h4 className="name bold">{item.author}</h4>
  //                             <p className="time">{dateNow2}</p>
  //                             <p className="contain">{item.message}</p>
  //                             <div className="point">
  //                               <span className="point-display">{`${item.point} point`}</span>
  //                               <button className="point-btn" type="button">
  //                                 <FontAwesomeIcon icon={faArrowUp} />
  //                               </button>
  //                               <button className="point-btn" type="button">
  //                                 <FontAwesomeIcon icon={faArrowDown} />
  //                               </button>
  //                             </div>
  //                           </div>
  //                         </div>
  //                         <br />
  //                       </>
  //                     );
  //                   })} */}
  //                 </div>
  //               </div>
  //             </div>
  //             <br />
  //           </div>
  //         );
  //       })}
  //     </>
  //   );
  // }

  render() {
    const {
      id,
      author,
      avatar,
      date,
      message,
      point,
      replies,
      incrementPointPost,
      decrementPointPost,
    } = this.props;
    return (
      <div className="comment-content" key={id}>
        <div className="comment-content-user--photo bg-gray">
          <img src={avatar} alt="" className="size" />
        </div>
        <div className="comment-content-user">
          <h4 className="name bold">{author}</h4>
          {this.formatTime(date)}
          <p className="contain">{message}</p>
          <div className="point">
            <span className="point-display">{`${point} point`}</span>
            <button
              className="point-btn up"
              type="button"
              onClick={() => incrementPointPost(id)}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
            <button
              className="point-btn down"
              type="button"
              onClick={() => decrementPointPost(id)}
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
          </div>
          <br />
          <div className="reply">
            {replies.map((item) => {
              return (
                <div className="comment-content" key={item.id}>
                  <div className="comment-content-user--photo reply bg-gray">
                    <img src={item.avatar} alt="" className="size" />
                  </div>
                  <div className="comment-content-user">
                    <h4 className="name bold">{item.author}</h4>
                    {this.formatTime(item.date)}
                    <p className="contain">{item.message}</p>
                    <div className="point">
                      <span className="point-display">{`${item.point} point`}</span>
                      <button
                        className="point-btn up"
                        type="button"
                        onClick={() => incrementPointPost(id, item.id)}
                      >
                        <FontAwesomeIcon icon={faArrowUp} />
                      </button>
                      <button
                        className="point-btn down"
                        type="button"
                        onClick={() => decrementPointPost(id, item.id)}
                      >
                        <FontAwesomeIcon icon={faArrowDown} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Comments;
