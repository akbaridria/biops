'use client'

import { ButtonConnectWallet } from "@/modules/Header/components/ButtonConnectWallet";
import { Logo } from "./Logo";
import ButtonAccount from "@/modules/Header/components/ButtonAccount";
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { ButtonSwitchWallet } from "@/modules/Header/components/ButtonSwitchWallet";
import { ButtonFaucet } from "@/modules/Header/components/ButtonFaucet";
export const Header = () => {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()

  return (
    <>
      <div className="container px-4 mx-auto sticky top-0 z-[100]">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <div>
              <Logo />
            </div>
          </div>
          <div className="flex-none">
            <div className="flex gap-2">
              <ButtonFaucet />
              {chain?.unsupported && <ButtonSwitchWallet />}
              {!isConnected && <ButtonConnectWallet />}
              {isConnected && !chain?.unsupported && <ButtonAccount />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
