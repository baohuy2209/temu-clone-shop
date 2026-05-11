import { defineField, defineType } from "sanity";

const promotionCampaign = defineType({
  name: "promotionCampaign",
  title: "Promotion Campaign",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
    }),
    defineField({
      title: "Description",
      name: "description",
      type: "text",
    }),
    defineField({
      title: "Code",
      name: "code",
      type: "reference",
      to: [{ type: "promotionCode" }],
    }),
  ],
});
export default promotionCampaign;
