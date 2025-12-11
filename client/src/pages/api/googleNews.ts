import type { NextApiRequest, NextApiResponse } from "next";

type Article = {
  title: string;
  link: string;
  pubDate?: string;
  description?: string;
};

const stripCdata = (value: string) =>
  value.replace("<![CDATA[", "").replace("]]>", "").trim();

const extractTag = (block: string, tag: string) => {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? stripCdata(match[1]) : "";
};

const parseRss = (xml: string): Article[] => {
  const items: Article[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null && items.length < 12) {
    const block = match[1];
    items.push({
      title: extractTag(block, "title"),
      link: extractTag(block, "link"),
      pubDate: extractTag(block, "pubDate"),
      description: extractTag(block, "description"),
    });
  }

  return items.filter((item) => item.title && item.link);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  const endpoint = `https://news.google.com/rss/search?q=${encodeURIComponent(
    query
  )}&hl=en-US&gl=US&ceid=US:en`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Google News responded with ${response.status}`);
    }
    const xml = await response.text();
    const articles = parseRss(xml);
    return res.status(200).json({ articles });
  } catch (error: any) {
    console.error("Google News fetch failed", error);
    return res
      .status(500)
      .json({ error: "Unable to fetch Google News articles" });
  }
}

