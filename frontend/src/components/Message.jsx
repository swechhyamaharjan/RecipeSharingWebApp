import React from "react";

const Message = ({ variant = "danger", children }) => {
  let bgColor = "bg-red-100 text-red-700"; //default

  if (variant === "success") bgColor = "bg-green-100 text-green-700";
  if (variant === "warning") bgColor = "bg-yellow-100 text-yellow-700";
  if (variant === "info") bgColor = "bg-blue-100 text-blue-700";

  return (
    <div className={`${bgColor} px-4 py-3 rounded-md mb-4 text-center`}>
      {children}
    </div>
  );
};

export default Message;
