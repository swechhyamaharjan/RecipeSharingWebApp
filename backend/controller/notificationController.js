import Notification from "../model/Notification.js";

const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const markNotificationRead = async (req, res) => {
  const notificationId = req.params.id;

  const updatedNotification = await Notification.findByIdAndUpdate(
    notificationId,
    { isRead: true },
    { new: true }
  );

  res.status(200).send({
    message: "Message has been read!!",
    updatedNotification
  });
};


export { getMyNotifications, markNotificationRead };