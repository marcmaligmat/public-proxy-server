import React from "react"
import Router from "next/router"

function Navbar({ handleResetPorts, handleLogOut }) {
  return (
    <nav className="bg-slate-300 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 sticky inset-x-0 top-0 left-0 z-10">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div className="flex gap-4 md:order-2">
          <button
            type="button"
            onClick={() => handleResetPorts()}
            className=" text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Reset Ports
          </button>
          <button
            type="button"
            onClick={() => handleLogOut()}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Logout
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                aria-current="page"
              >
                Clint Proxy Server
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
