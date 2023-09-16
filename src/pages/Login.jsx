import React, { useState } from "react";
import "../Login.css";
import Video from "../data/banner.mp4";
import { useStateContext } from "../contexts/ContextProvider";
import toast, { Toaster } from "react-hot-toast";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
function Login() {
  const [ShowOtpForm, setShowOtpForm] = useState(false);
  const [MobileNumber, setMobileNumber] = useState("");
  const [Otp, setOtp] = useState("");
  const [Loading, setLoading] = useState(false);
  const { Base_Url } = useStateContext();
  const HandleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      mobile_no: MobileNumber,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(`${Base_Url}admin/adminSendOTP`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        if (result.status === 200) {
          toast.success("Otp Send Successfully", {
            duration: 7000,
            position: "top-center",
            reverseOrder: false,
          });
          setShowOtpForm(true);
        } else {
          toast.error("User Not Found", {
            duration: 7000,
            position: "top-center",
            reverseOrder: false,
          });
        }
      })
      .catch((error) => console.log("error", error));
  };
  const HandleOnLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      mobile_no: MobileNumber,
      otp: Otp,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(`${Base_Url}admin/adminLogin`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        if (result.status === 200) {
          sessionStorage.setItem("IsLoggedIn", true);
          sessionStorage.setItem("Data", JSON.stringify(result.admin));
          sessionStorage.setItem("token", result.token);
          window.location.reload(false);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />
  );
  return (
    <>
      <video
        src={Video}
        autoPlay
        muted
        loop
        className="absolute w-[100%] h-[100%] object-cover overflow-hidden"
        style={{ zIndex: "-1" }}
      ></video>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center h-screen flex-col">
        <p className="text-3xl text-white mb-6 font-[serif]">Decorajee Admin</p>
        <div
          className="flex justify-center items-center h-[50vh] app"
          style={{ width: "40%" }}
        >
          <section className="h-screen">
            <div className="container h-full px-6 py-24 ">
              <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between transition-all duration-1000">
                <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                  <img
                    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                    className="w-full"
                    alt="Phone image"
                  />
                </div>
                <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                  {ShowOtpForm ? (
                    <form onSubmit={HandleOnLogin}>
                      <p className="text-white mb-5 text-sm">
                        Change Mobile No: {MobileNumber}
                      </p>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="number"
                          name="repeat_password"
                          id="floating_repeat_password"
                          className="block py-2.5 px-0 text-white w-full text-sm bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-white peer font-semibold otp-input"
                          placeholder=" "
                          value={Otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                        />
                        <label
                          htmlFor="floating_repeat_password"
                          className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Enter Otp
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="inline-block w-full rounded  px-7 pb-2.5 pt-3 text-sm  uppercase leading-normal font-semibold text-white hover:bg-white hover:text-black "
                        data-te-ripple-init
                        data-te-ripple-color="light"
                      >
                        {Loading ? <Spin indicator={antIcon} /> : "Login"}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={HandleSendOtp}>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="number"
                          id="NewContent"
                          className="block py-2.5 px-0 text-white w-full text-sm bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-white peer font-semibold otp-input"
                          placeholder=" "
                          required
                          value={MobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                        />
                        <label
                          htmlFor="NewContent"
                          className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Enter Your Mobile Number
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="inline-block w-full rounded  px-7 pb-2.5 pt-3 text-sm  uppercase leading-normal font-semibold text-white hover:bg-white hover:text-black "
                        data-te-ripple-init
                        data-te-ripple-color="light"
                      >
                        {Loading ? <Spin indicator={antIcon} /> : "Send Otp"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Login;
