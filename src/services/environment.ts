const EnvironmentService = () => ({
  notion: {
    secret: String(process.env.NOTION_SECRET_KEY),
    postsDatabaseId: String(process.env.NOTION_POSTS_DB_ID),
  },
});

const environmentService = EnvironmentService();

export default environmentService;
