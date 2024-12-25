import { strapiSDK } from "@strapi/sdk-js";

export const strapiSdk = strapiSDK({
  baseURL: process.env.NEXT_API_URL!,
  auth: {
    strategy: "api-token",
    options: { token: process.env.STRAPI_TOKEN },
  },
});
