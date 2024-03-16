import { createConfig,http } from "@wagmi/core";
import { aurora } from "@wagmi/core/chains";

export const config = createConfig({
  chains: [aurora],
  transports: {
    [aurora.id]: http(),
  },
});
