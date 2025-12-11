import React from "react";

const categories = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 pt-4 font-bold bg-[#0f141f] pb-4 px-6 border-b-4 border-[#ffb86c] shadow-[0_8px_0_#070a12]">
        <a className="retro-chip" href="#">
          External Affairs
        </a>
        <a className="retro-chip" href="#">
          Law and Justice
        </a>
        <a className="retro-chip" href="#">
          Youth Affairs & Sports
        </a>
        <a className="retro-chip" href="#">
          Finance
        </a>
        <a className="retro-chip" href="#">
          Internal Security
        </a>
        <a className="retro-chip" href="#">
          Culture
        </a>
        <a className="retro-chip" href="#">
          Info & Broadcasting
        </a>
        <a className="retro-chip" href="#">
          Home Affairs
        </a>
        <a className="retro-chip" href="#">
          Science & Tech
        </a>
        <a className="retro-chip" href="#">
          Electronics & IT
        </a>
      </div>
    </>
  );
};

export default categories;
