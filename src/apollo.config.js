module.exports = {
  client: {
    service: {
      name: "project-geo",
      // URL to the GraphQL API
      url: "https://tidy-seasnail-24.hasura.app/v1/graphql",
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js"],
  },
};
