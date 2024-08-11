// hooks/useNetworkConfig.ts

import { useAccount } from 'wagmi';
import addresses from '@/data/contracts.json';

export function useNetworkConfig() {
  const { chain } = useAccount();

  const chainOptions = Object.entries(addresses).map(([key, value]) => ({
    id: value.chain_id,
    name: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    contractKey: key,
    ...value
  }));

  const currentNetwork = chainOptions.find(net => net.id === chain?.id);

  if (!currentNetwork) {
    throw new Error('Unsupported network');
  }

  return currentNetwork;
}