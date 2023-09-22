import React, { useState } from "react";
import { ConfigProvider, Table } from "antd";
import { useStateContext } from "../contexts/ContextProvider";
import { FaPen, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
function MainCategoryListing({
  Data,
  GetAllData,
  setComponentLoader,
  handleUpdateUser,
}) {
  const { Base_Url, currentMode } = useStateContext();
  const [Search, setSearch] = useState("");
  const columns = [
    {
      title: <div className="text-center dark:text-white text-sm ">SrNo</div>,
      dataIndex: "srno",
      render: (t) => (
        <div className="text-center dark:text-white text-sm">{t}</div>
      ),
      sorter: {
        compare: (a, b) => a.id - b.id,
      },
    },
    {
      title: <div className="text-center dark:text-white text-sm">Title</div>,
      dataIndex: "title",
      render: (t) => (
        <div className="text-center dark:text-white text-sm">{t}</div>
      ),
      sorter: {
        compare: (a, b) => a.title - b.title,
      },
    },
    {
      title: (
        <div className="text-center dark:text-white text-sm">Description</div>
      ),
      dataIndex: "description",
      render: (t) => (
        <div className="text-center dark:text-white text-sm">{t}</div>
      ),
      sorter: {
        compare: (a, b) => a.description - b.description,
      },
    },
    {
      title: <div className="text-center dark:text-white text-sm">Image</div>,
      dataIndex: "category_image",
      render: (t) => (
        <div className="flex justify-center items-center dark:text-white">
          <img className="h-14 w-14 round" src={Base_Url + t} alt="" />
        </div>
      ),
    },
    {
      title: (
        <div className="text-center dark:text-white text-sm">CreatedAt</div>
      ),
      dataIndex: "created_at",
      render: (t) => (
        <div className="text-center dark:text-white text-sm">{t}</div>
      ),
    },
    {
      title: <div className="text-center dark:text-white text-sm">Action</div>,
      dataIndex: "id",
      render: (t) => (
        <div className="flex items-center gap-5 justify-center dark:text-white">
          <FaTrash
            className="text-lg hover:text-red-500 cursor-pointer"
            onClick={() => HandleDelete(t)}
          />
          <FaPen
            className="text-lg hover:text-green-500 cursor-pointer"
            onClick={() => handleUpdateUser(t)}
          />
        </div>
      ),
    },
  ];
  const PerPage = {
    pageSize: 50,
  };
  const itemsWithSerialNumbers = Data.map((item, index) => {
    return {
      ...item,
      srno: index + 1, // Add 1 to the index to start with 1-based numbering
    };
  });
  const HandleDelete = (id) => {
    setComponentLoader(true);
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${Base_Url}customizeSofa/deleteCustomSofaMainCategory/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          toast.success("Main Deleted Successfully", {
            duration: 7000,
            position: "top-center",
            reverseOrder: false,
          });
          GetAllData();
        }
      })
      .catch((error) => console.log("error", error));
  };
  const customTheme = {
    token: {
      colorBgBase: currentMode !== "Light" ? "#33373E" : "",
    },
  };

  return (
    <div className="mx-14 shadow-xl mb-20 ">
      <div className="mt-[12px] drop-shadow-lg w-[99%] my-2">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5  dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search By Title, Description"
            value={Search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
          {/* <button
              type="submit"
              onClick={HandleSearchClick}
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button> */}
        </div>
      </div>
      <ConfigProvider theme={customTheme}>
        <Table
          columns={columns}
          dataSource={itemsWithSerialNumbers.filter((el) => {
            return (
              Search.toLowerCase() === "" ||
              el.title.toLowerCase().includes(Search) ||
              el.description.toLowerCase().includes(Search) ||
              el.created_at.toLowerCase().includes(Search)
            );
          })}
          pagination={PerPage}
        />
      </ConfigProvider>
    </div>
  );
}

export default MainCategoryListing;
