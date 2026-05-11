import { defineField, defineType } from "sanity";

const promotionCode = defineType({
  name: "promotionCode",
  title: "Promotion Code",
  type: "document",
  fields: [
    defineField({
      title: "Code",
      name: "code",
      type: "string",
    }),
    defineField({
      title: "Discount Percentage",
      name: "discountPercentage",
      type: "number",
    }),
    defineField({
      title: "Expiration Date",
      name: "expirationDate",
      type: "date",
    }),
  ],
});
export default promotionCode;
