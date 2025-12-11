import { useState } from "react";
import Header from "../components/header";
import Categories from "@/components/categories";
import LatestPosts from "@/components/latestPosts";
import ImageGallery from "@/components/ImageGallery";

type ManualArticle = {
  title: string;
  link: string;
  pubDate?: string;
  description?: string;
};

export default function Home() {
  const [manualResults, setManualResults] = useState<ManualArticle[]>([]);
  const [manualQuery, setManualQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const handleManualSearch = async (query: string) => {
    try {
      setIsSearching(true);
      setSearchError("");
      setManualQuery(query);
      const resp = await fetch(`/api/googleNews?query=${encodeURIComponent(query)}`);
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data?.error || "Failed to fetch Google News");
      }
      setManualResults(data.articles || []);
    } catch (error: any) {
      setManualResults([]);
      setSearchError(error?.message || "Unable to fetch Google News");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <Header onManualSearch={handleManualSearch} searching={isSearching} />
      <Categories />
      {manualQuery && (
        <div className="mx-4 mt-6 mb-4 bg-[#0f141f] border-4 border-[#ffb86c] shadow-[0_12px_0_#070a12] rounded-2xl p-5 text-[var(--retro-ink)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div className="retro-heading text-[var(--retro-cyan)] drop-shadow-[0_0_12px_rgba(55,240,232,0.7)] text-xl uppercase">
              Google News results for “{manualQuery}”
            </div>
            <button
              className="text-xs uppercase tracking-[0.12em] px-3 py-2 border-2 border-[#ffb86c] rounded-lg hover:bg-[#1b2234] transition"
              onClick={() => {
                setManualResults([]);
                setManualQuery("");
                setSearchError("");
              }}
            >
              Clear
            </button>
          </div>
          {searchError && (
            <div className="text-[#ff6f91] text-sm mb-2">{searchError}</div>
          )}
          {isSearching ? (
            <div className="text-[var(--retro-muted)]">AI agent is fetching from Google News...</div>
          ) : manualResults.length === 0 ? (
            <div className="text-[var(--retro-muted)]">No articles found. Try a different keyword.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {manualResults.map((article) => (
                <div
                  key={article.link}
                  className="retro-panel p-4 flex flex-col gap-2"
                >
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noreferrer"
                    className="retro-link text-lg font-bold hover:underline"
                  >
                    {article.title}
                  </a>
                  {article.pubDate && (
                    <p className="text-xs text-[var(--retro-muted)]">
                      {new Date(article.pubDate).toLocaleString()}
                    </p>
                  )}
                  {article.description && (
                    <p className="text-sm text-[var(--retro-ink)]/80 overflow-hidden text-ellipsis">
                      {article.description.replace(/<[^>]+>/g, "")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="mt-4 mb-4">
        <ImageGallery />
      </div>
     <LatestPosts />
    </>
  );
}
