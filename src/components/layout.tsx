
import { ReactNode } from "react";
import NavBar from "./ui/navBar";


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    
      <div className="flex">
        <NavBar  />
        <div  className="w-screen p-10" >
          {children}
        </div>
      </div>
   
  );
};

export default Layout;
