const EnvironmentService = () => ({
  notion: {
    secret: String(process.env.NOTION_SECRET_KEY),
    postsDatabaseId: String(process.env.NOTION_POSTS_DB_ID),
    printsDatabaseId: String(process.env.NOTION_PRINTS_DB_ID),
  },
  whatsapp: {
    number: String(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
  },
  mixpanel: {
    token: String(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN),
  },
});

const environmentService = EnvironmentService();

export default environmentService;
