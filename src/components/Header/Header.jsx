import React from "react";
import { Bell, UserCircle, ChevronDown } from "lucide-react";
import Logo from "../../assets/images/5.png"

const Header = () => {
          return (
                    <header className="bg-blue-900 text-white flex justify-between items-center px-[100px] py-3 shadow-md">
                              <div className="flex items-center space-x-4">
                                        <img src={Logo}      alt="DJP Logo" className="h-10" />
                                        <h1 className="text-lg font-semibold">DJP</h1>
                              </div>
                              <nav className="hidden md:flex space-x-6">    
                              </nav>
                              <div className="flex items-center space-x-4">
                                        <Bell className="w-6 h-6 cursor-pointer" />
                                        <div className="flex items-center space-x-2 cursor-pointer">
                                                  <UserCircle className="w-8 h-8" />
                                                  <span className="hidden md:inline">3510145XXXXXXX</span>
                                                  <ChevronDown className="w-5 h-5" />
                                        </div>
                              </div>
                    </header>
          );
};

export default Header;
