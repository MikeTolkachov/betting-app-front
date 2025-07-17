'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { parseEther, formatEther } from 'viem';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/contract';
import { useState } from 'react';

export function DepositPanel() {
  const { address, isConnected } = useAccount();
  const { data: depositBalance, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getDeposit',
    args: [address!],
    query: { enabled: !!address },
  });

  const { writeContractAsync, isPending } = useWriteContract();

  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleDeposit = async () => {
    if (!isConnected) return;
    try {
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'deposit',
        value: parseEther('1'),
      });
      await refetch();
    } catch (err) {
      console.error('Deposit error:', err);
    }
  };

  const handleWithdraw = async () => {
    if (!isConnected || !withdrawAmount) return;
    try {
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'claimFromDeposit',
        args: [parseEther(withdrawAmount)],
      });
      await refetch();
    } catch (err) {
      console.error('Withdraw error:', err);
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="text-lg font-semibold">Your Deposit:</div>
        <div className="text-xl">
          {depositBalance !== undefined
            ? `${Number(formatEther(depositBalance)).toFixed(2)} MATIC`
            : '0.00 MATIC'}
        </div>

        <Button disabled={!isConnected || isPending} onClick={handleDeposit}>
          {isPending ? 'Depositing...' : 'Deposit 1 MATIC'}
        </Button>

        <div className="flex items-center space-x-2">
          <Input
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Amount to withdraw (MATIC)"
          />
          <Button disabled={!isConnected || isPending} onClick={handleWithdraw}>
            Withdraw
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
