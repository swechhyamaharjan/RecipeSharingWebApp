import React from 'react'
import { useGetAllUsersQuery } from '../../slices/userapiSlice'
import Loader from "../../components/Loader.jsx";
import Message from "../../components/Message.jsx";

const AdminUser = () => {
  const {data: users = [], isLoading, error} = useGetAllUsersQuery();

  if (isLoading) return <Loader />
  if (error) return <Message>{error.message || "Failed to load users"}</Message>

  return (
    <div className='min-h-screen p-6 bg-gray-50'>
      <h1 className='text-2xl font-bold mb-6 text-gray-700'>All Users</h1>

      <div>
        <table className='overflow-x-auto bg-white shadow rounded-lg border border-gray-200'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>ID</th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Name</th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Email</th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Joined On</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200'>
            {users.map((user, index)=>(
              <tr key={user._id}>
                <td className='px-6 whitespace-nowrap text-gray-700 text-sm'>{index+1}</td>
                <td className='px-6 whitespace-nowrap text-gray-700 text-sm'>{user.fullname}</td>
                <td className='px-6 whitespace-nowrap text-gray-700 text-sm'>{user.email}</td>
                <td className='px-6 whitespace-nowrap text-gray-700 text-sm'>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminUser