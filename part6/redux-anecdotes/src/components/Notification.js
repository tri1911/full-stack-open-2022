// import { useSelector } from "react-redux";
import { connect } from "react-redux";

const Notification = ({ notification }) => {
  // const notification = useSelector((state) => state.notification.message);
  const style = { border: "solid", padding: 10, borderWidth: 1 };
  return notification && <div style={style}>{notification}</div>;
};

const mapStateToProps = (state) => {
  return { notification: state.notification.message };
};

export default connect(mapStateToProps)(Notification);
