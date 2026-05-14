import umami from "@umami/node";

umami.init({
  websiteId: "88093007-ccaf-45aa-9190-45904651d254", // Your website id
  hostUrl: "https://cloud.umami.is", // URL to your Umami instance
});

export const umamiTrackCheckoutSuccessEvent = async (payload: {
  [key: string]: string | number | Date;
}) => {
  await umami.track("checkout_success", payload);
};
