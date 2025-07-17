import { DepositPanel } from './components/DepositPanel';
import { PlayerPanel } from './components/PlayerPanel';
import { ClaimRewardPanel } from '@/components/ClaimRewardPanel';
import { MatchStatusPanel } from '@/components/MatchStatusPanel';
import { ConnectButton } from '@rainbow-me/rainbowkit';
//import { Card } from '@/components/ui/card';

export default function App() {
  return (
    <main className="min-h-screen bg-gray-100 p-4 flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">Polygon Betting dApp</h1>

      <div className="w-full max-w-md space-y-4">
      <ConnectButton />
      <MatchStatusPanel />
      <DepositPanel />
      <PlayerPanel />
      <ClaimRewardPanel />
   </div>

      <footer className="mt-auto text-gray-500 text-sm p-2">
        Powered by Viem, Wagmi, and Vite + Shadcn
      </footer>
    </main>
  );
}