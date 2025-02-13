import React from "react";
import { Bell, UserCircle, ChevronDown, FileText, LogOut } from "lucide-react";
import Logo from "../../assets/images/5.png";

const Header = () => {
          return (
                    <header className="bg-white text-blue-900 flex justify-between items-center px-4 md:px-8 lg:px-12 xl:px-16 py-3 shadow-md w-full">
                              <div className="flex items-center space-x-4">
                                        <img src={Logo} alt="DJP Logo" className="h-10" />
                                        <h1 className="text-lg font-bold">CORETAXIFY</h1>
                              </div>
                              <nav className="hidden md:flex space-x-6"></nav>
                              <div className="flex items-center space-x-6 mr-1">
                                        <FileText className="w-6 h-6 cursor-pointer" />
                                        <Bell className="w-6 h-6 cursor-pointer" />
                                        <div className="flex items-center space-x-2 cursor-pointer">
                                                  <UserCircle className="w-8 h-8" />
                                                  <span className="hidden md:inline">3510145XXXXXXX</span>
                                                  <ChevronDown className="w-5 h-5" />
                                        </div>
                                        <LogOut className="w-6 h-6 cursor-pointer text-red-600 font-bold" />
                              </div>
                    </header>
          );
};

export default Header;
