import { Client as NotionClient } from "@notionhq/client";
import environmentService from "./environment";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { getPlaiceholder } from "plaiceholder";

interface IPrintSizes {
  id: string;
  displayNameInches: string;
  displayNameCm: string;
  prices: {
    withFrame: number;
    withoutFrame: number;
  };
}

const printSizes: IPrintSizes[] = [
  {
    id: "6x4",
    displayNameInches: "6x4",
    displayNameCm: "15x10",
    prices: {
      withFrame: 110,
      withoutFrame: 70,
    },
  },
  {
    id: "6x8",
    displayNameInches: "6x8",
    displayNameCm: "15x20",
    prices: {
      withFrame: 240,
      withoutFrame: 100,
    },
  },
  {
    id: "11x14",
    displayNameInches: "11x14",
    displayNameCm: "28x36",
    prices: {
      withFrame: 715,
      withoutFrame: 215,
    },
  },
];

interface IPrintPhoto {
  src: string;
  base64Placeholder: string;
  width: number;
  height: number;
}

interface IPrint {
  id: string;
  slug: string;
  title: string;
  minPrice: number;
  collectionName: string;
  cover: {
    src: string;
    base64Placeholder: string;
    width: number;
    height: number;
  };
  photos: IPrintPhoto[];
  availableSizes: IPrintSizes[];
  postSlug?: string;
}

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

  const queryPrintsDatabase = async () => {
    const response = await notion.databases.query({
      database_id: environmentService.notion.printsDatabaseId,
      filter: {
        property: "Featured",
        checkbox: {
          equals: false,
        },
      },
      sorts: [
        {
          property: "Order",
          direction: "ascending",
        },
      ],
    });
    const results = response.results as PageObjectResponse[];
    return results;
  };

  const queryAllPrints = async () => {
    const response = await notion.databases.query({
      database_id: environmentService.notion.printsDatabaseId,
    });
    const results = response.results as PageObjectResponse[];
    return results;
  };

  const queryFeaturedPrint = async () => {
    const response = await notion.databases.query({
      database_id: environmentService.notion.printsDatabaseId,
      filter: {
        property: "Featured",
        checkbox: {
          equals: true,
        },
      },
    });
    const results = response.results as PageObjectResponse[];
    const featuredPrint = results[0];
    return featuredPrint;
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

  const mapPageObjectToPrint = async ({
    id,
    properties,
  }: PageObjectResponse): Promise<IPrint> => {
    // @ts-ignore Notion´s types are messed up
    const coverSrc = String(properties.Cover.files[0].name);
    const coverImageBuffer = await fetch(coverSrc).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );
    const {
      base64,
      metadata: { width, height },
    } = await getPlaiceholder(coverImageBuffer);
    // @ts-ignore Notion´s types are messed up
    const availableSizesIds = properties["Sizes"].multi_select.map(
      (size: any) => size.name
    );
    const availableSizes = printSizes.filter((size) =>
      availableSizesIds.includes(size.id)
    );
    // printSizes is sorted by price, so the first element is the cheapest
    const minPrice = availableSizes[0].prices.withoutFrame;

    return {
      id,
      // @ts-ignore Notion´s types are messed up
      slug: String(properties.Slug.rich_text[0].plain_text),
      // @ts-ignore Notion´s types are messed up
      title: String(properties.Name.title[0].plain_text),
      // @ts-ignore Notion´s types are messed up
      collectionName: String(properties.Collection.select.name),
      minPrice,
      cover: {
        src: coverSrc,
        base64Placeholder: base64,
        width,
        height,
      },
      photos: await Promise.all(
        // @ts-ignore Notion´s types are messed up
        properties.Photos.files.map(async (file) => {
          const imageSrc = String(file.name);
          const coverImageBuffer = await fetch(imageSrc).then(async (res) =>
            Buffer.from(await res.arrayBuffer())
          );
          const {
            base64,
            metadata: { width, height },
          } = await getPlaiceholder(coverImageBuffer);
          return {
            src: imageSrc,
            base64Placeholder: base64,
            width,
            height,
          };
        })
      ),
      availableSizes,
      // @ts-ignore Notion´s types are messed up
      postSlug: properties["Post Slug"]?.rich_text[0]?.plain_text
        ? // @ts-ignore Notion´s types are messed up
          String(properties["Post Slug"]?.rich_text[0]?.plain_text)
        : "",
    };
  };

  const getPrints = async () => {
    const results = await queryPrintsDatabase();
    const prints = await Promise.all(results.map(mapPageObjectToPrint));
    return prints;
  };

  const getFeaturedPrint = async () => {
    const result = await queryFeaturedPrint();
    const print = await mapPageObjectToPrint(result);
    return print;
  };

  const getPrintBySlug = async (slug: string) => {
    const results = await queryAllPrints();
    const print = results.find(
      (result) =>
        // @ts-ignore Notion´s types are messed up
        String(result.properties.Slug.rich_text[0].plain_text) === slug
    );
    if (!print) {
      throw new Error(`Print with slug ${slug} not found`);
    }
    return mapPageObjectToPrint(print);
  };

  return {
    getPosts,
    getPostBySlug,
    getPostContentBlocks,
    getPrints,
    getFeaturedPrint,
    getPrintBySlug,
  };
};

const notionService = NotionService();

export type { IPost, IPrint, IPrintPhoto, IPrintSizes };
export default notionService;
