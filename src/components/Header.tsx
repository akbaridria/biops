'use client'

import { ButtonConnectWallet } from "@/modules/Header/components/ButtonConnectWallet";
import { Logo } from "./Logo";
import ButtonAccount from "@/modules/Header/components/ButtonAccount";
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { ButtonSwitchWallet } from "@/modules/Header/components/ButtonSwitchWallet";
import { ButtonFaucet } from "@/modules/Header/components/ButtonFaucet";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const pathname = usePathname()
  return (
    <>
      <div className="container px-4 mx-auto sticky top-0 z-[100]">
        <div className="navbar bg-base-100">
          <div className="flex-1 items-center md:justify-start justify-center">
            <Link href={'/'}>
              <Logo />
            </Link>
            <div className="flex items-center gap-4 ml-8">
              <Link href="/trade" className={`font-bold hover:text-primary transition-all ${pathname === '/trade' ? 'text-primary' : ''}`}>Trade</Link>
              <Link href="/liquidity" className={`font-bold hover:text-primary transition-all ${pathname === '/liquidity' ? 'text-primary' : ''}`}>Liquidity</Link>
            </div>
          </div>
          <div className="hidden md:flex flex-none">
            <div className="flex gap-2">
              {!chain?.unsupported && isConnected && <ButtonFaucet />}
              {chain?.unsupported && <ButtonSwitchWallet />}
              {!isConnected && <ButtonConnectWallet />}
              {isConnected && !chain?.unsupported && <ButtonAccount />}
            </div>
          </div>
        </div>
        <div className="flex md:hidden items-center justify-center pb-4 bg-base-100">
          <div className="flex gap-2">
            {!chain?.unsupported && isConnected && <ButtonFaucet />}
            {chain?.unsupported && <ButtonSwitchWallet />}
            {!isConnected && <ButtonConnectWallet />}
            {isConnected && !chain?.unsupported && <ButtonAccount />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
