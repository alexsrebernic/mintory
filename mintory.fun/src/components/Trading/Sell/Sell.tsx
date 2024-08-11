// Sell.tsx
import React, { useState, useEffect } from 'react';
import { useWriteContract, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import PAIR_ABI from '@/data/abis/pair.abi.json';
import CAVIAR_ZAP_ROUTER_ABI from '@/data/abis/zapRouter.json';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Sell({ pairAddress, zapRouterAddress }: { pairAddress: `0x${string}`, zapRouterAddress: `0x${string}` }) {
  const [inputAmount, setInputAmount] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');

  const { data: baseTokenReserves } = useReadContract({
    address: pairAddress,
    abi: PAIR_ABI,
    functionName: 'baseTokenReserves',
    query: { refetchInterval: 5000 }
  });

  const { data: fractionalTokenReserves } = useReadContract({
    address: pairAddress,
    abi: PAIR_ABI,
    functionName: 'fractionalTokenReserves',
    query: { refetchInterval: 5000 }
  });

  useEffect(() => {
    if (baseTokenReserves && fractionalTokenReserves && inputAmount) {
      const inputAmountBN = parseEther(inputAmount);
      const k = BigInt(baseTokenReserves as any) * BigInt(fractionalTokenReserves as any);
      const newBaseTokenReserves = k / (BigInt(fractionalTokenReserves as any) + inputAmountBN);
      const outputAmountBN = BigInt(baseTokenReserves as any) - newBaseTokenReserves;
      setExpectedOutput(formatEther(outputAmountBN));
    } else {
      setExpectedOutput('');
    }
  }, [inputAmount, baseTokenReserves, fractionalTokenReserves]);

  const { writeContract, isPending, isSuccess } = useWriteContract();

  const handleSell = () => {
    if (writeContract) {
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600);
      const slippageTolerance = 0.05; // 5% slippage tolerance
      const minOutputAmount = BigInt(Number(parseEther(expectedOutput)) * (1 - slippageTolerance));

      writeContract({
        address: zapRouterAddress,
        abi: CAVIAR_ZAP_ROUTER_ABI,
        functionName: 'removeAndSell',
        args: [
          pairAddress,
          {
            lpTokenAmount: parseEther(inputAmount),
            minBaseTokenOutputAmount: 0,
            minFractionalTokenOutputAmount: 0,
            deadline
          },
          {
            inputAmount: parseEther(inputAmount),
            minOutputAmount,
            deadline
          }
        ],
      });
    }
  };

  const insufficientLiquidity = !baseTokenReserves || !fractionalTokenReserves || Number(baseTokenReserves) === 0 || Number(fractionalTokenReserves) === 0;

  return (
    <div>
      <Input
        type="text"
        value={inputAmount}
        onChange={(e) => setInputAmount(e.target.value)}
        placeholder="Input Amount"
      />
      <div>Expected Output: {expectedOutput}</div>
      <Button onClick={handleSell} disabled={isPending || !writeContract || insufficientLiquidity}>
        {isPending ? 'Selling...' : insufficientLiquidity ? 'Insufficient Liquidity' : 'Sell'}
      </Button>
      {isSuccess && <div>Transaction successful!</div>}
    </div>
  );
}