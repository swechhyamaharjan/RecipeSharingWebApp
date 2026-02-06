import React, { useState, useMemo } from 'react'
import { useGetAllUsersQuery } from '../../slices/userapiSlice'
import Loader from "../../components/Loader.jsx";
import Message from "../../components/Message.jsx";
import { FaSearch} from 'react-icons/fa';
import { LuArrowDownUp } from "react-icons/lu";

const AdminUser = () => {
  const {data: users = [], isLoading, error} = useGetAllUsersQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'email', 'date'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(user => 
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let compareA, compareB;
      
      if (sortBy === 'name') {
        compareA = a.fullname.toLowerCase();
        compareB = b.fullname.toLowerCase();
      } else if (sortBy === 'email') {
        compareA = a.email.toLowerCase();
        compareB = b.email.toLowerCase();
      } else if (sortBy === 'date') {
        compareA = new Date(a.createdAt);
        compareB = new Date(b.createdAt);
      }

      if (compareA < compareB) return sortOrder === 'asc' ? -1 : 1;
      if (compareA > compareB) return sortOrder === 'asc' ? 1 : -1;
      return;
    });

    return filtered;
  }, [users, searchTerm, sortBy, sortOrder]);

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  if (isLoading) return <Loader />
  if (error) return <Message>{error.message || "Failed to load users"}</Message>

  return (
    <div className='min-h-screen p-6'>
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        <h1 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-10'>All Users</h1>

        {/* Search and Sort Controls */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6'>
          <div className='flex flex-col md:flex-row gap-4'>
            {/* Search Bar */}
            <div className='flex-1 relative'>
              <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input
                type='text'
                placeholder='Search by name or email...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none'
              />
            </div>

            {/* Sort Controls */}
            <div className='flex gap-2'>
              <button
                onClick={() => toggleSort('name')}
                className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
                  sortBy === 'name' 
                    ? 'bg-emerald-600 text-white border-emerald-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Name
                {sortBy === 'name' && (
                  <LuArrowDownUp className='w-4 h-4' />
                )}
              </button>
              <button
                onClick={() => toggleSort('email')}
                className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
                  sortBy === 'email' 
                    ? 'bg-emerald-600 text-white border-emerald-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Email
                {sortBy === 'email' && (
                  <LuArrowDownUp className='w-4 h-4' />
                )}
              </button>
              <button
                onClick={() => toggleSort('date')}
                className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
                  sortBy === 'date' 
                    ? 'bg-emerald-600 text-white border-emerald-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Date
                {sortBy === 'date' && (
                  <LuArrowDownUp className='w-4 h-4' />
                )}
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className='mt-3 text-sm text-gray-600'>
            Showing {filteredAndSortedUsers.length} of {users.length} users
          </div>
        </div>

        {/* Table */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    S.No
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    Name
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    Email
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    Joined On
                  </th>
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-200'>
                {filteredAndSortedUsers.length === 0 ? (
                  <tr>
                    <td colSpan='4' className='px-6 py-8 text-center text-gray-600'>
                      No users found matching your search
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedUsers.map((user, index) => (
                    <tr key={user._id} className='hover:bg-gray-50 transition-colors'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                        {index + 1}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {user.fullname}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                        {user.email}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        </div>
    </div>
  )
}

export default AdminUser