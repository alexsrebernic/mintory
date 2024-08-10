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

export function Trading() {
  return (
    <div className="grid grid-cols-[1fr_400px] gap-6 w-full h-[80vh]">
      <div className="bg-muted rounded-lg ">
        <div className="flex items-center justify-between px-6 py-4 bg-background">
          <div className="flex items-center gap-4">
            <img
              src="/placeholder.svg"
              alt="NFT Image"
              width={48}
              height={48}
              className="rounded-full"
              style={{ aspectRatio: "48/48", objectFit: "cover" }}
            />
            <div>
              <h3 className="font-medium">CryptoPunk #1234</h3>
              <p className="text-muted-foreground text-sm">NFT</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Market Cap</p>
              <p className="font-medium">$1.2M</p>
            </div>
            <div>
              <p className="text-muted-foreground">Supply</p>
              <p className="font-medium">10,000</p>
            </div>
            <div>
              <p className="text-muted-foreground">Liquidity</p>
              <p className="font-medium">$500K</p>
            </div>
            <div>
              <p className="text-muted-foreground">LP Fees Earned</p>
              <p className="font-medium">$50K</p>
            </div>
          </div>
        </div>
        <LinechartChart className="w-full " />
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
      <div className="bg-background rounded-lg shadow-lg">
        <Tabs defaultValue="buy" className="">
          <TabsList className="border-b">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
            <TabsTrigger value="change">Change</TabsTrigger>
            <TabsTrigger value="pools">Pools</TabsTrigger>
          </TabsList>
          <TabsContent value="buy" className=" h-full flex flex-col gap-4 mt-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Buy</h3>
              <Switch aria-label="Toggle fractional" className="shrink-0">
                <div className="bg-background" />
                <div className="bg-muted" />
              </Switch>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" placeholder="0.00" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" placeholder="0.00" />
            </div>
            <Button className="mt-auto">Buy</Button>
          </TabsContent>
          <TabsContent value="sell" className=" h-full flex flex-col gap-4 mt-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Sell</h3>
              <Switch aria-label="Toggle fractional" className="shrink-0">
                <div className="bg-background" />
                <div className="bg-muted" />
              </Switch>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" placeholder="0.00" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" placeholder="0.00" />
            </div>
            <Button className="mt-auto">Sell</Button>
          </TabsContent>
          <TabsContent value="change" className=" h-full flex flex-col gap-4 mt-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Change</h3>
              <Switch aria-label="Toggle fractional" className="shrink-0">
                <div className="bg-background" />
                <div className="bg-muted" />
              </Switch>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" placeholder="0.00" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" placeholder="0.00" />
            </div>
            <Button className="mt-auto">Change</Button>
          </TabsContent>
          <TabsContent value="pools" className=" h-full flex flex-col gap-4 mt-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Pools</h3>
              <Switch aria-label="Toggle fractional" className="shrink-0">
                <div className="bg-background" />
                <div className="bg-muted" />
              </Switch>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" placeholder="0.00" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" placeholder="0.00" />
            </div>
            <Button className="mt-auto">Add to Pool</Button>
          </TabsContent>
        </Tabs>
   
        <div className="p-6">
          <h3 className="font-medium mb-4">FAQ</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="what-is-cryptocurrency">
              <AccordionTrigger>What is cryptocurrency?</AccordionTrigger>
              <AccordionContent>
                Cryptocurrency is a digital or virtual currency that uses cryptography for security. It is a
                decentralized form of currency, not issued by any central authority, making it potentially immune to
                government interference or manipulation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="how-to-buy-cryptocurrency">
              <AccordionTrigger>How do I buy cryptocurrency?</AccordionTrigger>
              <AccordionContent>
                To buy cryptocurrency, you can use a cryptocurrency exchange platform. These platforms allow you to buy,
                sell, and trade various cryptocurrencies using fiat currency (like USD) or other cryptocurrencies.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="what-is-a-cryptocurrency-wallet">
              <AccordionTrigger>What is a cryptocurrency wallet?</AccordionTrigger>
              <AccordionContent>
                A cryptocurrency wallet is a digital wallet used to store, send, and receive cryptocurrencies. It
                provides a secure way to manage your cryptocurrency assets and interact with the blockchain network.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

function LinechartChart(props : HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  )
}
