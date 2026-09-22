import "server-only";

import { Client } from "@notionhq/client";

if (!process.env.NOTION_TOKEN) {
  throw new Error("NOTION_TOKEN is not defined in the environment variables.");
}

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})