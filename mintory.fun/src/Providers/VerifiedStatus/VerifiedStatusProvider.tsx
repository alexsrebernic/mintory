"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { UserVerificationContextType } from "./types";
import { useAccount, useContractRead } from "wagmi";
import { toast } from "react-toastify";
import abi from '@/data/abis/world-id.abi.json';
import addresses from '@/data/contracts.json';

const UserVerificationContext = createContext<UserVerificationContextType>({
    isVerified: false,
    setIsVerified: () => { },
});

export const useUserVerification = (): UserVerificationContextType => {
    return useContext(UserVerificationContext);
};

interface UserVerificationProviderProps {
    children: React.ReactNode;
}

export const UserVerificationProvider: React.FC<UserVerificationProviderProps> = ({ children }) => {
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const { isConnected, address } = useAccount();
    const WORLDID_ABI = abi;
    const WORLDID_ADDRESS = addresses.optimism_sepolia.world_id_nft_verifier;

    const { data, isError, isLoading } = useContractRead({
        address: WORLDID_ADDRESS as `0x${string}`,
        abi: WORLDID_ABI,
        functionName: 'isVerified',
        args: [address]
    });

    useEffect(() => {
        if (isLoading) return;
        if (isError) {
            console.log("Verification check failed", isError);
            return;
        }
        if (data !== undefined) {
            setIsVerified(data === true);
            console.log("data from verification", data);
        }
    }, [data, isError, isLoading, isConnected]);

    return (
        <UserVerificationContext.Provider value={{ isVerified, setIsVerified }}>
            {children}
        </UserVerificationContext.Provider>
    );
};
