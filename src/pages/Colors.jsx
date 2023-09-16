import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useStateContext } from "../contexts/ContextProvider";
import toast, { Toaster } from "react-hot-toast";
import ColorListing from "../components/ColorListing";
function Colors() {
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
  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    if (ApiFormData.title) {
      if (ApiFormData.color_code) {
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

        await fetch(`${Base_Url}customizeSofa/createColor`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            setApiFormData({
              ...ApiFormData,
              ["title"]: "",
              ["color_code"]: "",
            });
            if (result.status === 200) {
              GetAllData();
              setLoading(false);
              toast.success("Color Created Successfully", {
                duration: 7000, // 7 seconds in milliseconds
                position: "top-center",
                reverseOrder: false,
              });
            }
          })
          .catch((error) => console.log("error", error));
      } else {
        toast.error("ColorCode Is Required");
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

    fetch(`${Base_Url}customizeSofa/getAllColors`, requestOptions)
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
      ["color_code"]: SingleArray[0].color_code,
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
      `${Base_Url}customizeSofa/updateColor/${SingleArray[0].id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setApiFormData({
          ...ApiFormData,
          ["title"]: "",
          ["color_code"]: "",
        });

        if (result.status === 200) {
          toast.success("Color Updated Successfully", {
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
                value={ApiFormData.color_code}
                onChange={(e) =>
                  setApiFormData({
                    ...ApiFormData,
                    ["color_code"]: e.target.value,
                  })
                }
              />
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
                value={ApiFormData.color_code}
                onChange={(e) =>
                  setApiFormData({
                    ...ApiFormData,
                    ["color_code"]: e.target.value,
                  })
                }
              />
              <label
                for="floating_password"
                class="peer-focus:font-medium absolute text-sm text-gray-500  dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Color Code
              </label>
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
        List Colors
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
        <ColorListing
          Data={Data}
          GetAllData={GetAllData}
          setComponentLoader={setComponentLoader}
          handleUpdateUser={handleUpdateUser}
        />
      )}
    </div>
  );
}

export default Colors;
