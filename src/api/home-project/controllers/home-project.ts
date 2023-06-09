/**
 * home-project controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::home-project.home-project",
  ({ strapi }) => ({
    async findAll(ctx) {
      const filters = {
        publishedAt: {
          $ne: null,
        },
        ...ctx.query.filters,
      };
      const query = {
        populate: {
          home_project_cards: {
            fields: ["row", "column"],
            populate: {
              project: {
                fields: ["name", "slug"],
                populate: {
                  cover_image: {
                    fields: ["url"],
                  },
                },
              },
            },
          },
        },
        filters: filters,
      };
      const entry = await strapi.entityService.findMany(
        "api::home-project.home-project",
        query
      );
      return entry;
    },
  })
);
