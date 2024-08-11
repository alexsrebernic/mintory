"use client"
import { toast } from 'react-toastify';
import React, { useCallback, useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { SVGProps } from "react"
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAccount, useWriteContract, useTransaction, useWatchContractEvent, usePublicClient } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { baseSepolia, optimismSepolia } from 'wagmi/chains';
import abi from '@/data/abis/mintory.json';
import addresses from '@/data/contracts.json';
import CAVIAR_ABI from '@/data/abis/caviar.abi.json'; // Make sure to create this file

interface NFTFormData {
  name: string;
  chain: string;
  description: string;
  symbol: string;
  editionType: 'open' | 'limited';
  tokenLimit?: number;
  image?: File;
}

// Replace with your actual contract ABI and address
const MINTORY_ABI = abi;
const MINTORY_ADDRESS = addresses.base_sepolia.mintory; // Your contract address here



export function Create() {
  const { register, handleSubmit, watch, setValue } = useForm<NFTFormData>();
  const editionType = watch('editionType');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter()

  const { address, isConnected, chain } = useAccount();
  const { openConnectModal } = useConnectModal();

  const { writeContract, isPending, isSuccess, data: txHash } = useWriteContract();
  const publicClient = usePublicClient()
  const chainOptions = Object.entries(addresses).map(([key, value]) => ({
    id: value.chain_id,
    name: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    contractKey: key,
    caviar_address: value.caviar
  }));
  const CAVIAR_ADDRESS = chain ? chainOptions.find(net => net.id === Number(chain.id) && net.caviar_address)?.caviar_address : undefined;
  console.log(CAVIAR_ADDRESS)
  useWatchContractEvent({
    address: CAVIAR_ADDRESS as `0x${string}`,
    abi: CAVIAR_ABI,
    eventName: 'Create',
    onLogs(logs) {
      console.log('New pair created:', logs)
      if (logs && logs.length > 0) {
        const [log] = logs;
        const { args, transactionHash } = log;
        const relevantLog = logs.find(log => log.transactionHash === txHash);
        if (relevantLog) {
          // This is definitely our event
          router.push(`/trading/${relevantLog.args.nft}/${relevantLog.args.baseToken}`);
        }

    }
  }
  })

  const onSubmit: SubmitHandler<NFTFormData> = async (data) => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }

    setIsUploading(true);
    let imageUrl = '';

    try {
      if (data.image) {
        const formData = new FormData();
        formData.append('file', data.image);
        
        const response = await fetch('/api/upload-to-pinata', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Failed to upload image');
        }
  
        const result = await response.json();
        imageUrl = result.ipfsUrl;
      } else {
        return Error('No image provided')
      }

      const selectedChain = chainOptions.find(chain => chain.id === Number(data.chain));
      if (!selectedChain) {
        throw new Error(`Unsupported chain ID: ${data.chain}`);
      }

      const baseTokenAddress = addresses[selectedChain.contractKey as keyof typeof addresses].base_token;

      writeContract({
        abi: MINTORY_ABI,
        address: MINTORY_ADDRESS as `0x${string}`,
        functionName: 'createNFTAndPair',
        args: [
          data.name,
          data.symbol,
          imageUrl,
          data.editionType === 'limited' ? data.tokenLimit : 0,
          baseTokenAddress,
          '0x0000000000000000000000000000000000000000000000000000000000000000' // Zero bytes32 for merkleRoot
        ],
      }, 
      {
        onSuccess:  (response: any) => {
          console.log(response)
          toast.success("NFT Created Succesfully",
            {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              theme: "light",
            }
          )
        },
        onError: (response: any) => { console.log(response)}
      });
    } catch (error) {
      console.error('Error creating NFT:', error);
      toast.error(
        'Failed to create NFT. Please try again.',
        {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "light",
        }
      )
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleFile = useCallback((file: File) => {
    setValue('image', file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [setValue]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);



  return (
    <div className="min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <h1 className="text-xl font-bold text-black">Create NFT</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <label htmlFor="nft-name" className="block mb-2 text-sm font-medium text-black">
                NFT name
              </label>
              <Input
                id="nft-name"
                placeholder="your NFT's name"
                className="w-full bg-gray-100 border-gray-200 text-gray-500"
                {...register('name', { required: true })}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="chain" className="block mb-2 text-sm font-medium text-black">
               Chain
              </label>
              <Select onValueChange={(value) => setValue('chain', value)}>
                <SelectTrigger id="chain" className="w-full bg-gray-100 border-gray-200 placeholder:text-muted-foreground text-muted-foreground">
                  <SelectValue placeholder="Select chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="84532">Base Sepolia</SelectItem>
                  <SelectItem value="11155420">Optimism Sepolia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <label htmlFor="symbol" className="block mb-2 text-sm font-medium text-black">
                Symbol
              </label>
              <Input
                id="symbol"
                placeholder='MINTORY'
                className="w-full bg-gray-100 border-gray-200 text-gray-500 uppercase"
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
          </div>
          <div 
            className={`flex items-center justify-center border-2 border-dashed rounded-lg p-8 ${
              isDragging ? 'border-purple-500 bg-purple-100' : 'border-gray-700'
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <input
                type="file"
                id="image"
                className="hidden"
                accept="image/jpeg,image/png,image/gif,image/svg+xml,video/mp4"
                onChange={handleImageChange}
              />
              <label htmlFor="image" className="cursor-pointer">
                {previewUrl ? (
                  <img src={previewUrl} alt="Uploaded preview" className="max-w-full max-h-64 mx-auto mb-4" />
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