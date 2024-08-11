"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { UserVerificationContextType } from "./types";
import { useAccount } from "wagmi";
import axios from "axios"
import { toast } from "react-toastify";

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

    const { isConnected } = useAccount()

    const checkVerificationStatus = async () => {
        try {
            const response = await axios.get("/api/getVerificationStatus");
            if (response.data.verified === true) {
                setIsVerified(true);
                toast("User Verified");
            } else {
                setIsVerified(false);
            }
        } catch (error) {
            console.log("Verification check failed", error);
        }
    };

    useEffect(() => {
            if (!isConnected) return;

            checkVerificationStatus();
        }, [isConnected]);

    return (
        <UserVerificationContext.Provider value={{ isVerified, setIsVerified }}>
            {children}
        </UserVerificationContext.Provider>
    );
};
