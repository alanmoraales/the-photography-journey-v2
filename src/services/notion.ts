import { Client as NotionClient } from "@notionhq/client";
import environmentService from "./environment";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { getPlaiceholder } from "plaiceholder";

interface IPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  language: string;
  publishedAt: Date;
  cover: {
    src: string;
    base64Placeholder: string;
    width: number;
    height: number;
  };
}

const NotionService = () => {
  const notion = new NotionClient({
    auth: environmentService.notion.secret,
  });

  const queryPostsDatabase = async () => {
    const response = await notion.databases.query({
      database_id: environmentService.notion.postsDatabaseId,
      filter: {
        property: "Status",
        select: {
          equals: "Published",
        },
      },
    });
    const results = response.results as PageObjectResponse[];
    return results;
  };

  const mapPageObjectToPost = async ({
    id,
    properties,
  }: PageObjectResponse): Promise<IPost> => {
    // @ts-ignore Notion´s types are messed up
    const coverSrc = String(properties.Cover.files[0].name);
    const coverImageBuffer = await fetch(coverSrc).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );
    const {
      base64,
      metadata: { width, height },
    } = await getPlaiceholder(coverImageBuffer);
    return {
      id,
      // @ts-ignore Notion´s types are messed up
      slug: String(properties.Slug.rich_text[0].plain_text),
      // @ts-ignore Notion´s types are messed up
      title: String(properties.Name.title[0].plain_text),
      // @ts-ignore Notion´s types are messed up
      summary: String(properties.Summary.rich_text[0].plain_text),
      // @ts-ignore Notion´s types are messed up
      language: String(properties.Language.select.name),
      // @ts-ignore Notion´s types are messed up
      publishedAt: new Date(properties.Published.date.start),
      cover: {
        src: coverSrc,
        base64Placeholder: base64,
        width,
        height,
      },
    };
  };

  const getPosts = async () => {
    const results = await queryPostsDatabase();
    const posts = await Promise.all(results.map(mapPageObjectToPost));
    return posts;
  };

  const getPostBySlug = async (slug: string) => {
    const results = await queryPostsDatabase();
    const post = results.find(
      (result) =>
        // @ts-ignore Notion´s types are messed up
        String(result.properties.Slug.rich_text[0].plain_text) === slug
    );
    if (!post) {
      throw new Error(`Post with slug ${slug} not found`);
    }
    return mapPageObjectToPost(post);
  };

  const getPostContentBlocks = async (id: string) => {
    const response = await notion.blocks.children.list({
      block_id: id,
    });
    return response.results as BlockObjectResponse[];
  };

  return {
    getPosts,
    getPostBySlug,
    getPostContentBlocks,
  };
};

const notionService = NotionService();

export type { IPost };
export default notionService;
