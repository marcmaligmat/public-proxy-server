import React from "react"

function Filter({ fbAccounts, setFbaccount }) {
  return (
    <div className="flex ">
      <div className="mb-3 xl:w-96">
        <select
          className="form-select appearance-none
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          aria-label="Default select example"
          onChange={(e) => {
            setFbaccount(e.currentTarget.value)
          }}
        >
          <option>Facebook Accounts</option>
          {fbAccounts.map((fbAcc) => {
            return (
              <option key={fbAcc.id} value={fbAcc.id}>
                {fbAcc.email}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default Filter
