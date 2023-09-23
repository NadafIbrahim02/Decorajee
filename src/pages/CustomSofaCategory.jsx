import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useStateContext } from "../contexts/ContextProvider";
import toast, { Toaster } from "react-hot-toast";
import FoamListing from "../components/FoamListing";
import CustomSofaCategoryListing from "../components/CustomSofaCategoryListing";
function CustomSofaCategory() {
  const [Img, setImg] = useState("");
  const [SingleArray, setSingleArray] = useState([]);
  const { Base_Url, currentColor } = useStateContext();
  const [ApiFormData, setApiFormData] = useState({});
  const [ButtonLoading, setButtonLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [ShowUpdatePage, setShowUpdatePage] = useState(false);
  const [ComponentLoader, setComponentLoader] = useState(false);
  const [ImagesInArray, setImagesInArray] = useState({});
  const [MainCategories, setMainCategories] = useState([]);
  const [TwoImage, setTwoImage] = useState({});
  const [WidthArray, setWidthArray] = useState([
    { title: "Extra Small", image: "" },
    { title: "Small", image: "" },
    { title: "Medium", image: "" },
    { title: "Large", image: "" },
    { title: "Extra Large", image: "" },
  ]);
  const [ImagesLoading, setImagesLoading] = useState(false);
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
      `${Base_Url}customizeSofa/createCustomSofaCategoryImage`,
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
      if (ApiFormData.type) {
        if (ApiFormData.category_image) {
          await setLoading(true);
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            title: ApiFormData.title,
            type: ApiFormData.type,
            category_image: ApiFormData.category_image,
            width: WidthArray,
            height: "This is a sample string datafor height.",
            front_image: ApiFormData.front_image,
            back_image: ApiFormData.back_image,
          });

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          await fetch(
            `${Base_Url}customizeSofa/createCustomSofaCategory`,
            requestOptions
          )
            .then((response) => response.json())
            .then((result) => {
              setApiFormData({
                ...ApiFormData,
                ["category_image"]: "",
                ["type"]: "",
                ["title"]: "",
                ["front_image"]: "",
                ["back_image"]: "",
              });
              if (result.status === 200) {
                GetAllData();
                setLoading(false);
                toast.success("CustomSofaCategory Created Successfully", {
                  duration: 7000, // 7 seconds in milliseconds
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
        toast.error("Type Is Required");
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

    fetch(`${Base_Url}customizeSofa/getAllCustomSofaCategory`, requestOptions)
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
    GetMainCategories();
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
      ["type"]: SingleArray[0].type,
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
      `${Base_Url}customizeSofa/updateCustomSofaCategory/${SingleArray[0].id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setApiFormData({
          ...ApiFormData,
          ["category_image"]: "",
          ["type"]: "",
          ["title"]: "",
        });

        if (result.status === 200) {
          toast.success("CustomSofaCategory Updated Successfully", {
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
  const HandleAddWidthField = () => {
    const Array = [...WidthArray];
    Array.push({
      title: "",
      image: "",
    });
    setWidthArray(Array);
  };
  const HandleImagesUpload = (index) => {
    setImagesLoading(index);
    var formdata = new FormData();
    formdata.append("image", ImagesInArray[index]);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${Base_Url}customizeSofa/createCustomSofaCategoryImage`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          toast.success("File Uploaded Successfully", {
            duration: 7000,
            position: "top-center",
            reverseOrder: false,
          });
          const Arr = [...WidthArray];
          Arr[index].image = result.data.customSofa_image;

          setImagesInArray({
            ...ImagesInArray,
            [index]: false,
          });

          setWidthArray(Arr);
          setImagesLoading(false);
        } else {
          toast.error("Error Uploading File", {
            duration: 7000,
            position: "top-center",
            reverseOrder: false,
          });
          setImagesLoading(false);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const newFileUpload = (index) => {
    setButtonLoading(true);
    var formdata = new FormData();
    formdata.append("image", TwoImage[index]);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${Base_Url}customizeSofa/createCustomSofaCategoryImage`,
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
            [index === 0 ? "front_image" : "back_image"]:
              result.data.customSofa_image,
          });
          setTwoImage({ ...TwoImage, [index]: false });
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

  const GetMainCategories = () => {
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
        setMainCategories(result.data);
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
                type="number"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={ApiFormData.type}
                onChange={(e) =>
                  setApiFormData({ ...ApiFormData, ["type"]: e.target.value })
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
              <select
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={(e) =>
                  setApiFormData({ ...ApiFormData, ["type"]: e.target.value })
                }
              >
                <option selected>Select Type</option>
                {MainCategories &&
                  MainCategories.map((Type, ind) => {
                    return (
                      <option key={ind} value={Type.id}>
                        {Type.title}
                      </option>
                    );
                  })}
              </select>
              {/* <input
                type="number"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={ApiFormData.type}
              /> */}
              {/* <label
                for="floating_password"
                class="peer-focus:font-medium absolute text-sm text-gray-500  dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Select Type
              </label> */}
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
            <p className="mb-3 mt-5 text-sm text-gray-400">
              Size And Dimensions:-
            </p>
            {/* <div className="flex mb-5 justify-between items-center">
              <span
                className="font-semibold text-sm  py-1 px-4 cursor-pointer bg-green-300 text-green-700 rounded"
                onClick={HandleAddWidthField}
              >
                Add Field
              </span>
            </div> */}
            {WidthArray.map((el, index) => {
              return (
                <div
                  className="flex justify-center items-center w-full gap-5"
                  key={index}
                >
                  <div class="relative z-0 w-full mb-6 group">
                    {/* <input
                      type="text"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={el.title}
                      onChange={(e) => {
                        const Arr = [...WidthArray];
                        Arr[index].title = e.target.value;
                        setWidthArray(Arr);
                      }}
                    />
                    <label
                      for="floating_password"
                      class="peer-focus:font-medium absolute text-sm text-gray-500  dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Enter {el.fieldName}
                    </label> */}
                    <span className="text-sm font-semibold">{el.title}</span>
                  </div>
                  <div class="relative z-0 w-full mb-6 group flex">
                    <input
                      type="file"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""
                      onChange={(e) =>
                        setImagesInArray({
                          ...ImagesInArray,
                          [index]: e.target.files[0],
                        })
                      }
                    />
                    {ImagesInArray[index] ? (
                      <span
                        onClick={() => HandleImagesUpload(index)}
                        className="py-2 cursor-pointer bg-black rounded-r-xl text-white px-4 flex justify-center items-center"
                      >
                        {ImagesLoading === index ? (
                          <Spin indicator={antIcon} />
                        ) : (
                          "Upload"
                        )}
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
            <p className="text-sm font-semibold">Select Front Image</p>
            <div class="relative z-0 w-full mb-6 group flex ">
              <input
                type="file"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={(e) =>
                  setTwoImage({ ...TwoImage, [0]: e.target.files[0] })
                }
              />
              {TwoImage[0] ? (
                <span
                  onClick={() => newFileUpload(0)}
                  className="py-2 cursor-pointer bg-black rounded-r-xl text-white px-4 flex justify-center items-center"
                >
                  {ButtonLoading ? <Spin indicator={antIcon} /> : "Upload"}
                </span>
              ) : null}
            </div>
            <p className="text-sm font-semibold">Select Back Image</p>
            <div class="relative z-0 w-full mb-6 group flex ">
              <input
                type="file"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={(e) =>
                  setTwoImage({ ...TwoImage, [1]: e.target.files[0] })
                }
              />
              {TwoImage[1] ? (
                <span
                  onClick={() => newFileUpload(1)}
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
        List CustomSofaCategory
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
        <CustomSofaCategoryListing
          Data={Data}
          GetAllData={GetAllData}
          setComponentLoader={setComponentLoader}
          handleUpdateUser={handleUpdateUser}
        />
      )}
    </div>
  );
}

export default CustomSofaCategory;
