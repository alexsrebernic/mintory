"use client"
import { useAccount, useEnsName } from 'wagmi'

export function Profile() {
    const { address } = useAccount()
    const { data, error, status } = useEnsName({ address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' ,})
    if (status === 'pending') return <div>Loading ENS name</div>
    if (status === 'error')
        return <div>Error fetching ENS name: {error.message}</div>
    return <div>ENS name: {data}</div>
}