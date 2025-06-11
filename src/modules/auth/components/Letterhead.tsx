import "../styles/letterhead.css";
import { letterHead } from "@auth/assets";

const Letterhead = () => {
  return (
    <div className="letterhead-container">
      <div>
        <img src={letterHead} alt="Letterhead" className="letterhead" />
      </div>
    </div>
  );
};

export default Letterhead;
