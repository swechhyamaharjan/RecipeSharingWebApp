import Notification from "../model/Notification.js";

const getMyNotifications = async(req, res) => {
  const notifications = await Notification.find({user: req.user._id})
  .sort({created: -1});

  res.send(notifications);
}

export {getMyNotifications};