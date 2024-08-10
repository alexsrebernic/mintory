"use client"
import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { SVGProps } from "react"
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAccount, useWriteContract, useTransaction } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { baseSepolia, optimismSepolia } from 'wagmi/chains';
import abi from '@/data/abis/mintory.json';
import addresses from '@/data/contracts.json';
interface NFTFormData {
  name: string;
  chain: string;
  description: string;
  symbol: string;
  editionType: 'open' | 'limited';
  tokenLimit?: number;
  image?: FileList;
}

// Replace with your actual contract ABI and address
const MINTORY_ABI = abi;
const MINTORY_ADDRESS = addresses.base_sepolia.mintory; // Your contract address here

export function Create() {
  const { register, handleSubmit, watch, setValue } = useForm<NFTFormData>();
  const editionType = watch('editionType');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const { writeContract, isPending, isSuccess, data } = useWriteContract();

  const onSubmit: SubmitHandler<NFTFormData> = async (data) => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }

    // Handle image upload (e.g., to IPFS) here
    // For this example, we'll just use a placeholder URL
    const imageUrl = 'https://example.com/placeholder.jpg';

    const baseTokenAddress = data.chain === 'baseSepolia' 
      ? '0x...' // Base Sepolia token address
      : '0x...'; // Optimism Sepolia token address

    writeContract({
      abi: MINTORY_ABI,
      address: MINTORY_ADDRESS as `0x`,
      functionName: 'createNFTAndPair',
      args: [
        data.name,
        data.symbol,
        imageUrl,
        data.editionType === 'limited' ? data.tokenLimit : 0,
        data.description,
        baseTokenAddress,
        '0x0000000000000000000000000000000000000000' // Placeholder for merkleRoot
      ],
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };
  return (
    <div className="min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6 mr-2 text-black" />
          <h1 className="text-xl font-bold text-black">create project</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <label htmlFor="project-name" className="block mb-2 text-sm font-medium text-black">
                project name
              </label>
              <Input
                id="project-name"
                placeholder="your project's name"
                className="w-full bg-gray-100 border-gray-200 text-gray-500"
                {...register('name', { required: true })}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="chain" className="block mb-2 text-sm font-medium text-black">
                chain
              </label>
              <Select onValueChange={(value) => setValue('chain', value)}>
                <SelectTrigger id="chain" className="w-full bg-gray-100 border-gray-200 placeholder:text-muted-foreground text-muted-foreground">
                  <SelectValue placeholder="Select chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baseSepolia">Base Sepolia</SelectItem>
                  <SelectItem value="optimismSepolia">Optimism Sepolia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-black">
                Description
              </label>
              <textarea
                id="description"
                className="w-full bg-gray-100 border-gray-200 text-gray-500 rounded-md"
                {...register('description', { required: true })}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="symbol" className="block mb-2 text-sm font-medium text-black">
                Symbol
              </label>
              <Input
                id="symbol"
                className="w-full bg-gray-100 border-gray-200 text-gray-500"
                {...register('symbol', { required: true })}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="editionType" className="block mb-2 text-sm font-medium text-black">
                Edition Type
              </label>
              <Select onValueChange={(value) => setValue('editionType', value as 'open' | 'limited')}>
                <SelectTrigger id="editionType" className="w-full bg-gray-100 border-gray-200 placeholder:text-muted-foreground text-muted-foreground">
                  <SelectValue placeholder="Select edition type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open Edition</SelectItem>
                  <SelectItem value="limited">Limited Edition</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {editionType === 'limited' && (
              <div className="mb-4">
                <label htmlFor="tokenLimit" className="block mb-2 text-sm font-medium text-black">
                  Token Limit
                </label>
                <Input
                  id="tokenLimit"
                  type="number"
                  className="w-full bg-gray-100 border-gray-200 text-gray-500"
                  {...register('tokenLimit', { required: editionType === 'limited' })}
                />
              </div>
            )}
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isPending}>
              {isPending ? 'Creating...' : 'create project'}
            </Button>
            {isSuccess && (
              <div className="mt-2 text-green-500">
                Successfully created your NFT project!
              </div>
            )}
          </div>
          <div className="flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg p-8">
            <div className="text-center">
              <input
                type="file"
                id="image"
                className="hidden"
                {...register('image')}
                accept="image/jpeg,image/png,image/gif,image/svg+xml,video/mp4"
                onChange={handleImageChange}
              />
              <label htmlFor="image" className="cursor-pointer">
                {imageUrl ? (
                  <img src={imageUrl} alt="Uploaded preview" className="max-w-full max-h-64 mx-auto mb-4" />
                ) : (
                  <PlusIcon className="w-8 h-8 mb-4 text-black mx-auto" />
                )}
                <p className="text-sm mb-2 text-black">click to add files</p>
                <p className="text-xs text-gray-400 mb-2">or drag & drop media</p>
                <p className="text-xs text-gray-400">jpg, png, mp4, gif or svg</p>
                <p className="text-xs text-gray-400">1000x1000px recommended.</p>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}



function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}