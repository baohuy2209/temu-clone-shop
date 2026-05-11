import { defineField, defineType } from "sanity";

const product = defineType({
  name: "product",
  title: "Product",
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
      title: "Price",
      name: "price",
      type: "number",
    }),
    defineField({
      title: "Image",
      name: "image",
      type: "image",
    }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
    }),
    defineField({
      title: "Category",
      name: "category",
      type: "reference",
      to: [{ type: "productCategory" }],
    }),
  ],
});
export default product;
