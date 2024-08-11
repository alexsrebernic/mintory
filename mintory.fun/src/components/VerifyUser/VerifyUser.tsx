import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit'
import VerifyButton from './VerifyButton'
import { useAccount, useWriteContract } from 'wagmi';
import abi from '@/data/abis/world-id.abi.json'
import addresses from '@/data/contracts.json';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { useUserVerification } from '@/Providers/VerifiedStatus/VerifiedStatusProvider';

const { writeContract, isPending, isSuccess, data: txHash } = useWriteContract();
const {address} = useAccount();
const { setIsVerified } = useUserVerification()

const APPID: string = process.env.NEXT_PUBLIC_APPID!;
const WORLDID_ABI =  abi
const WORLDID_ADDRESS = addresses.optimism_sepolia.world_id_nft_verifier

const VerifyUser = () => {

    const onSuccess = (proof : ISuccessResult) => {
        console.log("Proof", proof)
        writeContract({
            abi: WORLDID_ABI,
            address: WORLDID_ADDRESS as `0x${string}`,
            functionName: 'verifyAndMint',
            args: [
                address,
                proof.merkle_root,
                proof.nullifier_hash,
                proof.proof
            ],
        },
            {
                onSuccess: (response: any) => {
                    setIsVerified(true)
                    toast.success("User Verified Succesfully",
                        {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: false,
                            theme: "light",
                        }
                    )
                },
                onError: (response: any) => { console.log(response) }
            });

    }

  return (

    <IDKitWidget
        app_id={`app_${APPID}`} // obtained from the Developer Portal
        action="verify-user" // this is your action id from the Developer Portal
        onSuccess={onSuccess} // callback when the modal is closed
        signal={address}
    >
        {/* {({ open }) => <button onClick={open}>Verify with World ID</button>} */}
          {({ open }) => <VerifyButton text='Verify with WorldID' onClick={open} className='bg-white p-1'/>}
    </IDKitWidget>

  )
}

export default VerifyUser