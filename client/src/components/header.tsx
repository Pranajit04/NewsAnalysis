import { ImFacebook, ImTwitter, ImYoutube } from "react-icons/im";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import { FaRobot } from "react-icons/fa";

type HeaderProps = {
  onManualSearch?: (query: string) => void;
  searching?: boolean;
};

const header = ({ onManualSearch, searching }: HeaderProps) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const currTime = new Date();
    const target = new Date(currTime.getTime() + 60 * 60000);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const triggerSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    onManualSearch?.(trimmed);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      triggerSearch();
    }
  };

  return (
    <>
      <header className="relative overflow-hidden border-b-4 border-[#ffb86c] bg-[#111829] text-[var(--retro-ink)] shadow-[0_12px_0_#070a12]">
        <div className="retro-grid absolute inset-0 opacity-30 pointer-events-none" />
        <div className="xl:container xl:mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-center py-4 px-6 relative z-10">
          <div className="flex items-center justify-center gap-3">
            <img src="/Emblem_of_India.svg" width={48} height={48} alt="" />
            <div className="text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--retro-muted)]">
                daily briefings
              </p>
              <p className="text-lg font-bold retro-heading text-[var(--retro-accent)]">
                News Analysis
              </p>
            </div>
          </div>

          <div className="md:flex-none w-full sm:w-96 order-2 sm:order-1 flex items-center justify-center py-2 sm:py-0">
            <div className="relative w-full">
              <input
                type="text"
                className="input-text w-full pr-10"
                placeholder="Search your interest..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
              />
              <FontAwesomeIcon
                className="absolute right-3 top-2.5 text-[var(--retro-accent)] hover:cursor-pointer"
                icon={faMagnifyingGlass}
                onClick={triggerSearch}
              />
            </div>
          </div>

          <div className="shrink w-full sm:w-80 order-1 sm:order-2 flex flex-col justify-center items-center">
            <p className="text-xs uppercase tracking-[0.15em] text-[var(--retro-muted)]">
              next update in
            </p>
            <div className="flex justify-center items-center text-xl font-semibold retro-heading text-[var(--retro-cyan)] drop-shadow-[0_0_8px_rgba(55,240,232,0.6)]">
              {minutes.toString().padStart(2, "0")} : {seconds.toString().padStart(2, "0")}
            </div>
          </div>

          <div className="w-full sm:w-96 order-3 flex justify-center items-center">
            <div className="flex gap-6 items-center">
              <div className="flex justify-center items-center space-x-8 text-sm font-semibold">
                <a className="retro-link hover:scale-[1.02] duration-300">About</a>
                <a href="/" className="retro-link hover:scale-[1.02] duration-300">
                  Refresh
                </a>
              </div>
              <button
                type="button"
                onClick={triggerSearch}
                className="group flex items-center gap-2 px-4 py-2 bg-[#1b2234] border-2 border-[#ffb86c] rounded-xl text-sm font-semibold text-[var(--retro-ink)] shadow-[0_6px_0_#070a12] hover:-translate-y-1 hover:shadow-[0_8px_0_#070a12] transition-transform duration-200"
                title="Let the AI agent fetch Google News"
              >
                <FaRobot className="text-[var(--retro-cyan)] group-hover:text-[var(--retro-pink)]" />
                <span className="uppercase tracking-[0.08em]">AI Search</span>
              </button>
              {searching && (
                <span className="text-xs text-[var(--retro-muted)] italic">
                  scanning...
                </span>
              )}
              <img src="/G20.webp" width={72} height={72} alt="" className="hidden md:block" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default header;
