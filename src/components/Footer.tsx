import { Github } from "./Icons";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer className="footer footer-center p-6 bg-primary text-primary-content">
      <aside>
        <Logo />
        <p className="font-bold">
          Predict, Win, and Trade <br /> on Mode Blockchain
        </p>
        <p>Copyright © 2023 - All right reserved</p>
      </aside>
      <nav className="-my-4">
        <div className="grid grid-flow-col gap-4">
          <Github customClass="w-6 h-6" />
        </div>
      </nav>
    </footer>
  );
};

export default Footer;