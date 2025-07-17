'use client';
import { Card, CardContent } from '@/components/ui/card';
import { useReadContract } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/contract';
import { useEffect, useState } from 'react';

export function MatchStatusPanel() {
  const { data: remainingTime, refetch: refetchTime } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getRemainingTime',
  });

  const { data: matchOngoing, refetch: refetchMatch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'matchOngoing',
  });

  const [localTime, setLocalTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchTime();
      refetchMatch();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (remainingTime !== undefined) {
      setLocalTime(Number(remainingTime));
    }
  }, [remainingTime]);

  const statusText = matchOngoing
    ? 'Match in Progress'
    : localTime > 0
    ? `Betting Open — ${localTime} sec left`
    : 'Betting Closed — Waiting for Match';

  return (
    <Card>
      <CardContent className="p-4 text-center">
        <div className="text-lg font-semibold">Match Status</div>
        <div className="text-xl">{statusText}</div>
      </CardContent>
    </Card>
  );
}
