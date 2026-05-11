import { defineField, defineType } from "sanity";

const productCategory = defineType({
  name: "productCategory",
  title: "Product Category",
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
      title: "Slug",
      name: "slug",
      type: "slug",
    }),
  ],
});
export default productCategory;
