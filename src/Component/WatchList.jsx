import { useState } from "react";
import WatchedSummary from "./WatchedSummary";
import WatchedList from "./WatchedList";

function WatchList() {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && <></>}
    </div>
  );
}
export default WatchList;
