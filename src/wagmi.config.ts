import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { /*mainnet,*/ polygon, polygonMumbai } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Betting DApp',
  projectId: '2866ab7ca2b77a44dd4001507c75e434', // Можеш залишити так, це не критично
  chains: [polygon, polygonMumbai],
  ssr: false,
});
