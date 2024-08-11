"use client";
import { WagmiProvider, State } from "wagmi";
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "./wagmiConfig";
import '@rainbow-me/rainbowkit/styles.css';
import { UserVerificationProvider } from "../VerifiedStatus/VerifiedStatusProvider";

const queryClient = new QueryClient();

const Providers = ({
    children,
    initialState,
}: {
    children: React.ReactNode,
    initialState: State | undefined
}) => {
    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <UserVerificationProvider >
                        {children}
                    </UserVerificationProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export default Providers;
