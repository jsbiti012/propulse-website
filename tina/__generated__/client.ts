import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'b937e0ac6efff6960c2d60d53d284612bc61f31a', queries,  });
export default client;
  