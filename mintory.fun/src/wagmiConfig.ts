import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { optimismSepolia, baseSepolia } from "wagmi/chains"; 

export const config = createConfig({
  chains: [optimismSepolia, baseSepolia],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [optimismSepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
});
