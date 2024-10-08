"use client"
/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/oSTs52R4oSZ
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { CartesianGrid, XAxis, Line, LineChart } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"
import { HTMLAttributes } from "react"
import {  useSearchParams } from 'next/navigation';
import { useAccount, useReadContract } from 'wagmi';
import { useNetworkConfig } from '@/hooks/useNetworkConfig';
import CAVIAR_ABI from '@/data/abis/caviar.abi.json';
import PAIR_ABI from '@/data/abis/pair.abi.json';
import NFT_ABI from '@/data/abis/nft721.abi.json';
import TradingChart from "./TradingChart/TradingChart"
import { Sell } from "./Sell/Sell"
import { Remove } from "./Remove/Remove"
import { Add } from "./Add/Add"
import { Buy } from "./Buy/Buy"
export function Trading() {
  const searchParams = useSearchParams()
  const nftAddress = searchParams.get('collection')

  const networkConfig = useNetworkConfig();
  const { address } = useAccount();

  const { data: pairAddress } = useReadContract({
    address: networkConfig.caviar as `0x${string}`,
    abi: CAVIAR_ABI,
    functionName: 'pairs',
    args: [nftAddress, networkConfig.base_token, '0x0000000000000000000000000000000000000000000000000000000000000000'], // Assuming no merkle root
  });
  console.log(pairAddress);
  // Fetch NFT name
  const { data: nftName } = useReadContract({
    address: nftAddress as `0x${string}`,
    abi: NFT_ABI,
    functionName: 'name',
  });
  const { data: uri } = useReadContract({
    address: nftAddress as `0x${string}`,
    abi: NFT_ABI,
    functionName: 'tokenURI',
  });
  const { data: symbol } = useReadContract({
    address: nftAddress as `0x${string}`,
    abi: NFT_ABI,
    functionName: 'symbol',
  });

  // Fetch market cap
  const { data: marketCap } = useReadContract({
    address: pairAddress as `0x${string}`,
    abi: PAIR_ABI,
    args: [0],
    functionName: 'getMarketCapInUSD',
  });
  console.log(uri)
  // Fetch total supply
  const { data: totalSupply } = useReadContract({
    address: pairAddress as `0x${string}`,
    abi: PAIR_ABI,
    functionName: 'totalSupply',
  });

  // Fetch liquidity
  const { data: liquidity } = useReadContract({
    address: pairAddress as `0x${string}`,
    abi: PAIR_ABI,
    functionName: 'baseTokenReserves',
  });

  if (!pairAddress) {
    return <div>Loading pair data...</div>;
  }
  return (
    <div className="grid grid-cols-[1fr_400px] gap-6 w-full h-[80vh] mt-20">
      <div className="bg-muted rounded-lg ">
        <div className="flex items-center justify-between px-6 py-4 bg-background">
          <div className="flex items-center gap-4">
            <img
              src={uri}
              alt="NFT Image"
              width={48}
              height={48}
              className="rounded-full"
              style={{ aspectRatio: "48/48", objectFit: "cover" }}
            />
            <div>
              <h3 className="font-medium">{nftName} #{symbol.toUpperCase()}</h3>
              <p className="text-muted-foreground text-sm">NFT</p>
            </div>
          </div>
         
          <div className="flex items-center gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Market Cap</p>
              <p className="font-medium">${marketCap}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Supply</p>
              <p className="font-medium">{totalSupply}</p>
            </div>
            
          </div>
        </div>
        <TradingChart 
        pairAddress={pairAddress as `0x`}
        />
        <div className="p-6">
          <h3 className="font-medium mb-4">Trading History</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>2023-04-15</TableCell>
                <TableCell>Buy</TableCell>
                <TableCell>0.5 BTC</TableCell>
                <TableCell>$57,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2023-03-20</TableCell>
                <TableCell>Sell</TableCell>
                <TableCell>0.2 BTC</TableCell>
                <TableCell>$60,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2023-02-10</TableCell>
                <TableCell>Buy</TableCell>
                <TableCell>0.3 BTC</TableCell>
                <TableCell>$52,000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="bg-background rounded-lg shadow-lg px-4">
      <Tabs defaultValue="buy" className="">
        <TabsList className="border-b">
          <TabsTrigger value="buy">Buy</TabsTrigger>
          <TabsTrigger value="sell">Sell</TabsTrigger>
          <TabsTrigger value="add">Add liquidity</TabsTrigger>
          <TabsTrigger value="remove">Remove Liquidity</TabsTrigger>
        </TabsList>
        <TabsContent value="buy">
          <Buy zapRouterAddress={networkConfig.caviar_zap_router as `0x`} pairAddress={pairAddress as `0x`} />
        </TabsContent>
        <TabsContent value="sell">
          <Sell zapRouterAddress={networkConfig.caviar_zap_router as `0x`} pairAddress={pairAddress as `0x`} />
        </TabsContent>
        <TabsContent value="add">
          <Add  pairAddress={pairAddress as `0x`} />
        </TabsContent>
        <TabsContent value="remove">
          <Remove zapRouterAddress={networkConfig.caviar_zap_router as `0x`} pairAddress={pairAddress as `0x`} />
        </TabsContent>
      </Tabs>
   
      </div>
    </div>
  )
}

