'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/contract';
import { parseEther } from 'viem';

export function PlayerPanel() {
  const { address, isConnected } = useAccount();

  const { data: remainingTime } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getRemainingTime',
  });

  const { data: myDeposit, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getDeposit',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { writeContractAsync, isPending } = useWriteContract();

  const handleBet = async (team: number) => {
    if (!isConnected || myDeposit === undefined) return;
    try {
      const depositBigInt = myDeposit as bigint;
      if (depositBigInt >= parseEther('1')) {
        await writeContractAsync({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'placeBet',
          args: [team],
        });
      } else {
        const shortfall = parseEther('1') - depositBigInt;
        await writeContractAsync({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'placeBet',
          args: [team],
          value: shortfall,
        });
      }
      await refetch();
    } catch (err) {
      console.error('Bet error:', err);
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="text-lg font-semibold">Place Your Bet (1 MATIC)</div>
        <div>
          Remaining Time:{' '}
          {remainingTime !== undefined ? `${Number(remainingTime)} sec` : 'Loading...'}
        </div>

        <div className="flex space-x-2">
          <Button
            disabled={!isConnected || isPending || (remainingTime !== undefined && Number(remainingTime) === 0)}
            onClick={() => handleBet(1)}
          >
            Bet on Team A
          </Button>
          <Button
            disabled={!isConnected || isPending || (remainingTime !== undefined && Number(remainingTime) === 0)}
            onClick={() => handleBet(2)}
          >
            Bet on Team B
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
