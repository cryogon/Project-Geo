module.exports = {
  client: {
    service: {
      name: "project-geo",
      // URL to the GraphQL API
      url: "https://dashing-mouse-23.hasura.app/v1/graphql",
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js"],
  },
};
