import SearchLocation from "./SearchLocation";
import SavedLocationCard from "./SavedLocationCard";
import Highlights from "./Highlights";
import { IoNotificationsOutline } from "react-icons/io5";

function Main({
  alerts,
  locationObj,
  changeLocation,
  changeTheme,
  changeSymbol,
  theme,
  symbol,
  handleSaveLocation,
}) {
  let date = JSON.stringify(locationObj) !== "{}" ? locationObj.time : "";
  date = date && date.match(/\d{4}\-\d{1,2}\-\d{2,4}/)[0];
  let dateText = new Date(date);
  dateText = dateText.toDateString();
  function open() {
    document.querySelector(".alerts-menu").classList.add("enter");
  }
  function close() {
    document.querySelector(".alerts-menu").classList.remove("enter");
  }
  return (
    <div className={`Main ${theme}`}>
      <div className="main-header">
        <div className="date">
          {dateText === "Invalid Date" ? "No date data" : dateText}
        </div>
        <SearchLocation changeLocation={changeLocation} />
        <div className="theme-symbol-save-alert">
          <button className="theme-btn" onClick={changeTheme}>
            {theme === "light" ? "Dark" : "Light"}
          </button>
          <button className="symbol-btn" onClick={changeSymbol}>
            {symbol === "Cel" ? " °F" : " °C"}
          </button>

          <button className="save-btn" onClick={handleSaveLocation}>
            Save Location
          </button>
          <div className="alert-btn" onClick={open}>
            <IoNotificationsOutline id="alert-icon" />
            <div id="alert-count">{alerts.length}</div>
          </div>
        </div>
      </div>
      <div className="weather-information">
        <Highlights theme={theme} locationObj={locationObj} symbol={symbol} />
        <SavedLocationCard
          theme={theme}
          locationObj={locationObj}
          symbol={symbol}
        />
        <div className="alerts-menu">
          <div className="alerts-menu-close" onClick={close}>
            x
          </div>
          {alerts.length > 0 ? (
            <div className="alerts">
              <ul>
                {alerts.map((alert, i) => (
                  <li key={i}>{alert.headline}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div>No severe weather alerts to show.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
