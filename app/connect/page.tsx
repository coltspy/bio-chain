import WalletConnect from '@/app/components/ConnectModal';

export default function ConnectPage() {
  return <WalletConnect isOpen={false} onClose={function (): void {
      throw new Error('Function not implemented.');
  } } onConnect={function (walletType: string): void {
      throw new Error('Function not implemented.');
  } }/>;
}