import "../styles/letterhead.css";
import { letterHead } from "@auth/assets";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Letterhead = (props: Props) => {
  const { children } = props;

  return (
    <div className="letterhead-container">
      <div>
        <img src={letterHead} alt="Letterhead" className="letterhead" />
        {children}
      </div>
    </div>
  );
};

export default Letterhead;
