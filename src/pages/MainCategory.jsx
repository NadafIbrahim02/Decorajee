import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useStateContext } from "../contexts/ContextProvider";
import toast, { Toaster } from "react-hot-toast";
import CustomSofaCategoryListing from "../components/CustomSofaCategoryListing";
import MainCategoryListing from "../components/MainCategoryListing";
function MainCategory() {
  const [Img, setImg] = useState("");
  const [SingleArray, setSingleArray] = useState([]);
  const { Base_Url, currentColor } = useStateContext();
  const [ApiFormData, setApiFormData] = useState({});
  const [ButtonLoading, setButtonLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [ShowUpdatePage, setShowUpdatePage] = useState(false);
  const [ComponentLoader, setComponentLoader] = useState(false);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />
  );
  const handleUploadFile = () => {
    setButtonLoading(true);
    var formdata = new FormData();
    formdata.append("image", Img);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${Base_Url}customizeSofa/createCustomSofaMainCategoryImage`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          toast.success("File Uploaded Successfully", {
            duration: 7000, // 7 seconds in milliseconds
            position: "top-center",
            reverseOrder: false,
          });
          setApiFormData({
            ...ApiFormData,
            ["category_image"]: result.data.customSofa_image,
          });
          setImg("");
          setButtonLoading(false);
        } else {
          toast.error("Error Uploading File", {
            duration: 7000, // 7 seconds in milliseconds
            position: "top-center",
            reverseOrder: false,
          });
          setImg("");
          setButtonLoading(false);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    if (ApiFormData.title) {
      if (ApiFormData.description) {
        if (ApiFormData.category_image) {
          await setLoading(true);
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify(ApiFormData);

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          await fetch(
            `${Base_Url}customizeSofa/createCustomSofaMainCategory`,
            requestOptions
          )
            .then((response) => response.json())
            .then((result) => {
              setApiFormData({});
              if (result.status === 200) {
                GetAllData();
                setLoading(false);
                toast.success("MainCategory Created Successfully", {
                  duration: 7000,
                  position: "top-center",
                  reverseOrder: false,
                });
              }
            })
            .catch((error) => console.log("error", error));
        } else {
          toast.error("Image Is Required");
        }
      } else {
        toast.error("Description Is Required");
      }
    } else {
      toast.error("Title Is Required");
    }
  };
  const GetAllData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${Base_Url}customizeSofa/getAllCustomSofaMainCategory`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result.data.reverse());
        setComponentLoader(false);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    setComponentLoader(true);
    GetAllData();
  }, []);
  const handleUpdateUser = (id) => {
    setShowUpdatePage(true);
    const SingleArray = Data.filter((el) => {
      return el.id === id;
    });
    setSingleArray(SingleArray);
    setApiFormData({
      ...ApiFormData,
      ["title"]: SingleArray[0].title,
      ["description"]: SingleArray[0].description,
      ["category_image"]: SingleArray[0].category_image,
    });
  };
  const HandleOnUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(ApiFormData);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      `${Base_Url}customizeSofa/updateCustomSofaMainCategory/${SingleArray[0].id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setApiFormData({
          ...ApiFormData,
          ["category_image"]: "",
          ["description"]: "",
          ["title"]: "",
        });

        if (result.status === 200) {
          toast.success("MainCategory Updated Successfully", {
            duration: 7000,
            position: "top-center",
            reverseOrder: false,
          });
          setLoading(false);
          setShowUpdatePage(false);
          setComponentLoader(true);
          GetAllData();
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mx-14 bg-slate-200 dark:bg-secondary-dark-bg  mt-8 rounded-lg py-2 px-14 shadow-xl">
        {ShowUpdatePage ? (
          <form className="my-4" onSubmit={HandleOnUpdate}>
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="text"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                value={ApiFormData.title}
                onChange={(e) =>
                  setApiFormData({ ...ApiFormData, ["title"]: e.target.value })
                }
              />
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="text"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={ApiFormData.description}
                onChange={(e) =>
                  setApiFormData({
                    ...ApiFormData,
                    ["description"]: e.target.value,
                  })
                }
              />
            </div>
            <div class="relative z-0 w-full mb-6 group flex ">
              <img
                src={Base_Url + ApiFormData.category_image}
                alt=""
                style={{ width: "350px", objectFit: "contain" }}
              />
            </div>
            <div class="relative z-0 w-full mb-6 group flex ">
              <input
                type="file"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                onChange={(e) => setImg(e.target.files[0])}
              />
              {Img ? (
                <span
                  onClick={handleUploadFile}
                  className="py-2 bg-black rounded-r-xl text-white px-4 flex justify-center items-center"
                >
                  {ButtonLoading ? <Spin indicator={antIcon} /> : "Upload"}
                </span>
              ) : null}
            </div>

            <button
              type="submit"
              style={{ background: currentColor }}
              class="text-white dark:text-blue-600  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-white"
            >
              {Loading ? <Spin indicator={antIcon} /> : "Update"}
            </button>
          </form>
        ) : (
          <form className="my-4" onSubmit={HandleOnSubmit}>
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="text"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                value={ApiFormData.title}
                onChange={(e) =>
                  setApiFormData({ ...ApiFormData, ["title"]: e.target.value })
                }
              />
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500  dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Title
              </label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="text"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={ApiFormData.type}
                onChange={(e) =>
                  setApiFormData({
                    ...ApiFormData,
                    ["description"]: e.target.value,
                  })
                }
              />
              <label
                for="floating_password"
                class="peer-focus:font-medium absolute text-sm text-gray-500  dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Description
              </label>
            </div>
            <div class="relative z-0 w-full mb-6 group flex ">
              <input
                type="file"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                onChange={(e) => setImg(e.target.files[0])}
              />
              {Img ? (
                <span
                  onClick={handleUploadFile}
                  className="py-2 cursor-pointer bg-black rounded-r-xl text-white px-4 flex justify-center items-center"
                >
                  {ButtonLoading ? <Spin indicator={antIcon} /> : "Upload"}
                </span>
              ) : null}
            </div>

            <button
              type="submit"
              style={{ background: currentColor }}
              class="text-white dark:text-blue-600  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-white"
            >
              {Loading ? <Spin indicator={antIcon} /> : "Submit"}
            </button>
          </form>
        )}
      </div>
      <p className="text-3xl text-center mt-6 mb-2 font-semibold dark:text-white">
        List MainCategory
      </p>
      {ComponentLoader ? (
        <div className="flex justify-center items-center h-[550px]">
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 40 }}
                className="text-[#001529] dark:text-white"
                spin
              />
            }
          />
        </div>
      ) : (
        <MainCategoryListing
          Data={Data}
          GetAllData={GetAllData}
          setComponentLoader={setComponentLoader}
          handleUpdateUser={handleUpdateUser}
        />
      )}
    </div>
  );
}

export default MainCategory;
