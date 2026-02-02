import { useGetMyNotificationQuery, useMarkReadMutation} from "../slices/notificationApiSlice"
import Loader from '../components/Loader';
import Message from '../components/Message';

const Notification = () => {
  const {data: notifications = [], isLoading, error} = useGetMyNotificationQuery();
  const [markRead] = useMarkReadMutation();

  if (isLoading) return <Loader />
  if (error) return <Message variant="danger">{error.message || "Failed to load notifications"}</Message>;
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Notifications</h2>

         {notifications.length === 0 ? 
         (
         <p className="p-4 text-gray-500">There is no notifications</p>
        ) 
         : (
          notifications.map((noti) => 
          (<div key={noti._id}
          onClick={() => !noti.isRead && markRead(noti._id)}
          className={`p-4 border-b cursor-pointer ${!noti.isRead ? "bg-red-100" : ""}`}>
              <p>{noti.message}</p>
              <span className="text-xs text-gray-400">
              {new Date(noti.createdAt).toLocaleString()}
            </span>
          </div>))
          )}
      </div>
    </div>
  )
}

export default Notification