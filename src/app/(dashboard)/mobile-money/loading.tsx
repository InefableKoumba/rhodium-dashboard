import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-96">
      <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
