import React from "react"

function SearchBar() {
  return (
    <div className="flex items-center justify-center pt-12">
      <div className="flex border-2 border-gray-200 rounded">
        <input
          type="text"
          className="px-4 py-2 border-b-2 border-blue-600 outline-none w-80 focus:border-green-400"
          placeholder="Search..."
        />
        <button className="px-4 text-white bg-blue-600 border-l ">
          Search
        </button>
      </div>
    </div>
  )
}

export default SearchBar
