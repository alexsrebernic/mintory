// Add.tsx
import React, { useState } from 'react';
import { useWriteContract, useReadContract } from 'wagmi';
import { parseEther } from 'viem';
import PAIR_ABI from '@/data/abis/pair.abi.json';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Add({ pairAddress }: { pairAddress: `0x${string}` }) {
  const [baseTokenAmount, setBaseTokenAmount] = useState('');
  const [fractionalTokenAmount, setFractionalTokenAmount] = useState('');
  const [minLpTokenAmount, setMinLpTokenAmount] = useState('');

  const { data: baseTokenReserves } = useReadContract({
    address: pairAddress,
    abi: PAIR_ABI,
    functionName: 'baseTokenReserves',
    query: {
        refetchInterval: 5000,
      }  });

  const { data: fractionalTokenReserves } = useReadContract({
    address: pairAddress,
    abi: PAIR_ABI,
    functionName: 'fractionalTokenReserves',
    query: {
        refetchInterval: 5000,
      }  });

  const { writeContract, isPending, isSuccess } = useWriteContract();

  const handleAddLiquidity = () => {
    if (writeContract) {
      writeContract({
        address: pairAddress,
        abi: PAIR_ABI,
        functionName: 'add',
        args: [
          parseEther(baseTokenAmount || '0'),
          parseEther(fractionalTokenAmount || '0'),
          parseEther(minLpTokenAmount || '0'),
          0, // minPrice
          parseEther('1000000'), // maxPrice (set to a high value)
          BigInt(Math.floor(Date.now() / 1000) + 3600),
        ],
        value: parseEther(baseTokenAmount || '0'),
      });
    }
  };

  const insufficientLiquidity = !baseTokenReserves || !fractionalTokenReserves || Number(baseTokenReserves) === 0 || Number(fractionalTokenReserves) === 0;

  return (
    <div>
      <Input
        type="text"
        value={baseTokenAmount}
        onChange={(e) => setBaseTokenAmount(e.target.value)}
        placeholder="Base Token Amount"
      />
      <Input
        type="text"
        value={fractionalTokenAmount}
        onChange={(e) => setFractionalTokenAmount(e.target.value)}
        placeholder="Fractional Token Amount"
      />
      <Input
        type="text"
        value={minLpTokenAmount}
        onChange={(e) => setMinLpTokenAmount(e.target.value)}
        placeholder="Min LP Token Amount"
      />
      <Button onClick={handleAddLiquidity} disabled={isPending || !writeContract}>
        {isPending ? 'Adding Liquidity...' : 'Add Liquidity'}
      </Button>
      {isSuccess && <div>Liquidity added successfully!</div>}
    </div>
  );
}