import { FaStar } from "react-icons/fa";

function Rating({ value, text }) {
  return (
    <div className="rating flex items-center gap-2 font-medium">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`text-lg ${star <= value ? "text-amber-500" : "text-stone-300"}`}
        />
      ))}
      <span className="rating-text"> 
        {text} reviews
      </span>
    </div>
  );
}

export default Rating;
