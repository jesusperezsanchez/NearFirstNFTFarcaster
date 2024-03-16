import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit";
import { writeContract } from "@wagmi/core";
import { NextRequest, NextResponse } from "next/server";
import { privateKeyToAccount } from "viem/accounts";

import { env } from "@/env.mjs";
// import { createWalletClient, http } from "viem";
// import { privateKeyToAccount } from "viem/accounts";
// import { sepolia } from "viem/chains";
// import { env } from "@/env.mjs";
import { frame_error, frame_next } from "@/lib/frames";
import { config } from "@/lib/wagmi-client";

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let fid: number | undefined = 0;
  let text: string | undefined = "";
  let address: string | undefined = "";

  const body: FrameRequest = await req.json();

  try {
    const { isValid, message } = await getFrameMessage(body, {
      neynarApiKey: "NEYNAR_ONCHAIN_KIT",
    });

    if (!isValid || !message) {
      return new NextResponse(
        getFrameHtmlResponse(frame_error("couldn't validate the message"))
      );
    }

    if (message) {
      fid = message.interactor.fid;
      address = message.interactor.verified_accounts[0];
    }

    if (message?.input) {
      text = message.input;
    }

    console.log("minting...");

    const account = privateKeyToAccount(`0x${env.PRIVATE_KEY}`);

    console.log("connected...");

    let result;
    try {
      result = await writeContract(config, {
        abi,
        address: "0xbee92c70acfca09120ea02eb5432efd1ab6471a2",
        functionName: "safeMint",
        args: [
          address,
          "http://google.com",
        ],
        account,
      });
    } catch (error) {
      console.error("Error during contract write:", error);
      return new NextResponse(
        // @ts-expect-error undefined error type
        getFrameHtmlResponse(frame_error(error.toString()))
      );
    }

    console.log(result);

    // const account = privateKeyToAccount(`0x${env.PRIVATE_KEY}`);

    // const client = createWalletClient({
    //   account,
    //   chain: sepolia,
    //   transport: http(`https://eth-sepolia.g.alchemy.com/v2/${env.ALCHEMY_KEY}`),
    // });

    // send a transaction
    // await client.sendTransaction({
    //   account,
    //   to: `0x...`,
    //   value: 1n,
    // });

    // update DB
    // await supabase.from("Users").upsert({
    //   id: fid,
    //   updated_at: new Date().toISOString(),
    // });

    return new NextResponse(
      getFrameHtmlResponse(frame_next(fid.toString(), address, text))
    );
  } catch (error) {
    return new NextResponse(
      // @ts-expect-error undefined error type
      getFrameHtmlResponse(frame_error(error.toString()))
    );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
