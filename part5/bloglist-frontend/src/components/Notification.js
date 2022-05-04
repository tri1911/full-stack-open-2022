import React from "react";

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  const style = {
    color: notification.type === "alert" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div id="notification-div" style={style}>
      {notification.message}
    </div>
  );
};

export default Notification;
