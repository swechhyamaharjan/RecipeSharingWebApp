import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router';
import { useUserfavoriteQuery } from '../slices/userapiSlice';
import { useToggleFavoriteMutation } from '../slices/recipeApiSlice';
import { useSelector } from 'react-redux';
import Rating from '../components/Rating';
import { FaBookmark } from "react-icons/fa";
import { toast } from 'react-toastify';

const Bookmark = () => {
  const { data: Favorites, isLoading, error } = useUserfavoriteQuery();
  const [toggleFav, { isLoading: bookmarking }] = useToggleFavoriteMutation();
  const { userInfo } = useSelector((state) => state.auth);

  if (isLoading) return <Loader />;
  if (error) return <Message>{error.message || "Failed to load your recipes"}</Message>;

  const handleFavorite = async (id) => {
    if (!userInfo) {
      toast.error("Please signin to bookmark this recipe!!");
      return;
    }
    try {
      const res = await toggleFav(id).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.error || err?.error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10'>
        <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8'>My bookmarks</h2>
        {Favorites.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-600 text-lg'>You haven't saved any recipes.</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
            {Favorites.map((fav) => {
              const isBookmarked = fav.favorites?.includes(userInfo?._id);
              return (
                <div
                  key={fav._id}
                  className='bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100'
                >
                  <div className='relative overflow-hidden'>
                    <img
                      src={fav.image}
                      alt={fav.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <FaBookmark
                      onClick={() => handleFavorite(fav._id)}
                      className={`absolute top-2 right-2 text-2xl p-1 rounded-full cursor-pointer 
                        ${isBookmarked ? "text-red-500 bg-white"  : "text-white bg-black bg-opacity-50"}`}
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 hover:text-green-600 transition-colors">
                      {fav.title}
                    </h3>

                    <p className="text-sm text-gray-500 mb-2">
                      Category: <span className="font-medium text-gray-700">{fav.category?.name}</span>
                    </p>

                    <div className="mb-3">
                      <Rating value={fav.averageRating} text={fav.likes.length} />
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 h-10 overflow-hidden">
                      {fav.description}
                    </p>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <Link
                        to={`/recipe/${fav._id}`}
                        className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors"
                      >
                        View Recipe
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmark;
