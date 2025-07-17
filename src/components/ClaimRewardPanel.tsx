'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAccount, useWriteContract } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/contract';

export function ClaimRewardPanel() {
  const { isConnected } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();

  const handleClaimReward = async () => {
    try {
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'claimReward',
      });
      console.log('Reward claimed successfully');
    } catch (err) {
      console.error('Error claiming reward:', err);
    }
  };

  const handleAcknowledgeLoss = async () => {
    try {
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'acknowledgeLoss',
      });
      console.log('Loss acknowledged');
    } catch (err) {
      console.error('Error acknowledging loss:', err);
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="text-lg font-semibold">Match Result</div>
        <div className="flex space-x-2">
          <Button disabled={!isConnected || isPending} onClick={handleClaimReward}>
            Claim Reward
          </Button>
          <Button disabled={!isConnected || isPending} onClick={handleAcknowledgeLoss}>
            Acknowledge Loss
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
