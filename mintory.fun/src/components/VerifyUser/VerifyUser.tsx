import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit'
import VerifyButton from './VerifyButton'

const VerifyUser = () => {
    const onSuccess = (proof : ISuccessResult) => {
        console.log("proof", proof)
    }
    const handleVerify = (proof : ISuccessResult) => {
        console.log("proof", proof)
    }
    const APPID: string = process.env.NEXT_PUBLIC_APPID!;
  return (

    <IDKitWidget
        app_id={`app_${APPID}`} // obtained from the Developer Portal
        action="verify-user" // this is your action id from the Developer Portal
        onSuccess={onSuccess} // callback when the modal is closed
        handleVerify={handleVerify} // optional callback when the proof is received
        verification_level={VerificationLevel.Device}
    >
        {/* {({ open }) => <button onClick={open}>Verify with World ID</button>} */}
          {({ open }) => <VerifyButton text='Verify with WorldID' onClick={open} className='bg-white p-1'/>}
    </IDKitWidget>

  )
}

export default VerifyUser