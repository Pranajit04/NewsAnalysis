import React from "react";
import style from "../styles/card.module.css";
import Image from "next/image";
const card = (props: any) => {
  return (
    <div className="flex justify-center items-center hover:cursor-pointer">
      <div className={`${style.card} retro-panel`}>
        <div className={style.card_header}>
          <Image
            src={`/categories/images/${props.imgUrl}.jpg`}
            width={400}
            height={200}
            alt="Picture of the author"
          />
        </div>
        <div className={style.card_content}>
          <h3 className="flex justify-center text-xl retro-heading text-[var(--retro-cyan)] drop-shadow-[0_0_10px_rgba(55,240,232,0.6)]" id="news-title">
            {props.Title}
          </h3>
          <h6 className={style.news_source} id="news-source">
            {props.categories}
          </h6>
          <p className="text-sm leading-6 text-[var(--retro-ink)]/80" id="news-desc">
            {props.description}
          </p>
        </div>
        <div className="flex justify-center items-center space-x-4 bg-[#0f141f] py-3 border-t border-[#ffb86c]">
          <div className="flex flex-col justify-center items-center text-[var(--retro-ink)]">
            Positive <div className="font-bold">{props.positive}%</div>
          </div>
          <div className="flex flex-col justify-center items-center text-[var(--retro-ink)]">
            Neutral <div className="font-bold">{props.neutral}%</div>
          </div>
          <div className="flex flex-col justify-center items-center text-[var(--retro-ink)]">
            Negative <div className="font-bold">{props.negative}%</div>
          </div>
        </div>
        <div className="flex justify-center items-center pt-3 pb-4">
          <a className="text-lg retro-link hover:scale-[1.04] duration-300 font-semibold" target="_blank"
            href={props.url}>
          Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default card;
