import { Chevron } from "./Icons";
import { Logo } from "./Logo";

export const Header = () => {
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
            <button className="btn btn-outline btn-primary btn-sm">
              <div>Connect Wallet</div>
              <Chevron customClass="w-4 h-4 rotate-[90deg]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
