import { FrameButtonMetadata } from "@coinbase/onchainkit/dist/types/core/types";

import { env } from "@/env.mjs";

// Error
export const frame_error = (text: string) => {
  const body = `There was an error validating the request: ${text}`;
  return {
    buttons: [
      {
        label: "Home",
      },
    ] as [FrameButtonMetadata, ...FrameButtonMetadata[]],
    image: `${env.NEXT_PUBLIC_URL}/api/image?body=${body}`,
    post_url: `${env.NEXT_PUBLIC_URL}/api/home`,
  };
};

// Home
export const frame_home = () => {
  const body = "NEAR NFT Historic Minting";
  console.log(body);
  return {
    buttons: [
      {
        label: "Mint the first ever Near NFT",
      },
    ] as [FrameButtonMetadata, ...FrameButtonMetadata[]],
    image: `https://i.postimg.cc/hjWQphw9/mint.png`,
    post_url: `${env.NEXT_PUBLIC_URL}/api/next`,
  };
};

// Next
export const frame_next = (fid: string, address: string, text: string) => {
  const body = `🚀 LFG%0D%0Dfid: ${fid}%0D%0Daddress: ${address.slice(
    0,
    6
  )}%0D%0Dmessage: ${text}`;
  console.log(body);
  return {
    buttons: [
      {
        label: "Home",
      },
    ] as [FrameButtonMetadata, ...FrameButtonMetadata[]],
    image: `https://i.postimg.cc/Km14RrCL/congrats.jpg`,
    post_url: `${env.NEXT_PUBLIC_URL}/api/home`,
  };
};
