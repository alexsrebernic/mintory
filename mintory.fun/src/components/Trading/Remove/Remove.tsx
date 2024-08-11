// Remove.tsx
import React, { useState } from 'react';
import { useWriteContract, useReadContract } from 'wagmi';
import { parseEther } from 'viem';
import PAIR_ABI from '@/data/abis/pair.abi.json';
import CAVIAR_ZAP_ROUTER_ABI from '@/data/abis/zapRouter.json';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Remove({ pairAddress, zapRouterAddress }: { pairAddress: `0x${string}`, zapRouterAddress: `0x${string}` }) {
  const [lpTokenAmount, setLpTokenAmount] = useState('');

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

  const { writeContract, isPending, isSuccess } = useWriteContract();

  const handleRemoveLiquidity = () => {
    if (writeContract) {
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600);
      const slippageTolerance = 0.05; // 5% slippage tolerance

      writeContract({
        address: zapRouterAddress,
        abi: CAVIAR_ZAP_ROUTER_ABI,
        functionName: 'removeAndSell',
        args: [
          pairAddress,
          {
            lpTokenAmount: parseEther(lpTokenAmount),
            minBaseTokenOutputAmount: 0,
            minFractionalTokenOutputAmount: 0,
            deadline
          },
          {
            inputAmount: parseEther(lpTokenAmount), // Assuming 1:1 ratio for simplicity
            minOutputAmount: 0,
            deadline
          }
        ],
      });
    }
  };

  return (
    <div>
      <Input
        type="text"
        value={lpTokenAmount}
        onChange={(e) => setLpTokenAmount(e.target.value)}
        placeholder="LP Token Amount"
      />
      <Button onClick={handleRemoveLiquidity} disabled={isPending || !writeContract}>
        {isPending ? 'Removing Liquidity...' : 'Remove Liquidity'}
      </Button>
      {isSuccess && <div>Liquidity removed successfully!</div>}
    </div>
  );
}