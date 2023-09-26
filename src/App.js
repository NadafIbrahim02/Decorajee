import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Sidebar, ThemeSettings } from "./components";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";

import {
  Colors,
  CustomSofaCategory,
  Ecommerce,
  Fabric,
  FabricFolder,
  FabricFolderShade,
  Foam,
  Login,
  MainCategory,
  NotFound,
  Woods,
} from "./pages";

const App = () => {
  const [CollapeValue, setCollapeValue] = useState(false);
  const IsLoggedIn = sessionStorage.getItem("IsLoggedIn");
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter basename="/Decorajee">
        {IsLoggedIn ? (
          <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: "50%" }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>
            {activeMenu ? (
              <div
                className={CollapeValue ? "w-20 " : "w-52"}
                style={{ transition: "0.5s" }}
              >
                <div className=" fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                  <Sidebar setCollapeValue={setCollapeValue} />
                </div>
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg ">
                <Sidebar />
              </div>
            )}
            <div
              className={
                activeMenu
                  ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen w-full"
                  : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
              }
            >
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar setCollapeValue={setCollapeValue} />
              </div>
              <div>
                {themeSettings && <ThemeSettings />}

                <Routes>
                  <Route
                    path="/"
                    element={
                      <React.Suspense>
                        <Ecommerce />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/Foam"
                    element={
                      <React.Suspense>
                        <Foam />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/Woods"
                    element={
                      <React.Suspense>
                        <Woods />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/Colors"
                    element={
                      <React.Suspense>
                        <Colors />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/Fabric"
                    element={
                      <React.Suspense>
                        <Fabric />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/FabricFolder/:id"
                    element={
                      <React.Suspense>
                        <FabricFolder />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/FabricFolderShade/:id"
                    element={
                      <React.Suspense>
                        <FabricFolderShade />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/CustomSofaCategory"
                    element={
                      <React.Suspense>
                        <CustomSofaCategory />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/MainCategory"
                    element={
                      <React.Suspense>
                        <MainCategory />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <React.Suspense>
                        <NotFound />
                      </React.Suspense>
                    }
                  />
                </Routes>
              </div>
            </div>
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <React.Suspense>
                  <Login />
                </React.Suspense>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
