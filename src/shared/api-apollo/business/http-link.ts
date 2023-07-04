import { createHttpLink } from "@apollo/client/core";

const GQL_URL = "https://gateway-erp.dev.cluster.kznexpess.com";

// httpLink – just need it to work
export const httpLink = createHttpLink({ uri: GQL_URL });
