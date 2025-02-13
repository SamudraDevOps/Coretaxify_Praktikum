import React from "react";
import { Bell, UserCircle, ChevronDown, FileText, LogOut } from "lucide-react";
import Logo from "../../assets/images/5.png";
import {
          NavigationMenu,
          NavigationMenuContent,
          NavigationMenuIndicator,
          NavigationMenuItem,
          NavigationMenuLink,
          NavigationMenuList,
          NavigationMenuTrigger,
          NavigationMenuViewport,
} from "@/components/ui/navigation-menu"


const Header = () => {
          return (
                    <div className="">
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
                              <div className="w-full bg-blue-900 pt-1">
                                        <NavigationMenu className="w-full bg-blue-900 pb-2 ml-2 pt-1">
                                                  <NavigationMenuList className="bg-blue-900">
                                                            <NavigationMenuItem className="text-blue-900 bg-blue-900">
                                                                      <NavigationMenuTrigger>Profil Saya</NavigationMenuTrigger>
                                                                      <NavigationMenuContent>
                                                                                <NavigationMenuLink>test</NavigationMenuLink>
                                                                      </NavigationMenuContent>
                                                            </NavigationMenuItem>
                                                            <NavigationMenuItem className="text-blue-900 bg-blue-900">
                                                                      <NavigationMenuTrigger>E-Faktur</NavigationMenuTrigger>
                                                            </NavigationMenuItem>
                                                            <NavigationMenuItem className="text-blue-900 bg-blue-900">
                                                                      <NavigationMenuTrigger>e-Bupot</NavigationMenuTrigger>
                                                                      <NavigationMenuContent>
                                                                                <NavigationMenuLink>test</NavigationMenuLink>
                                                                      </NavigationMenuContent>
                                                            </NavigationMenuItem>
                                                            <NavigationMenuItem className="text-blue-900 bg-blue-900">
                                                                      <NavigationMenuTrigger>Surat Pemberitahuan(SPT)</NavigationMenuTrigger>
                                                                      <NavigationMenuContent>
                                                                                <NavigationMenuLink>test</NavigationMenuLink>
                                                                      </NavigationMenuContent>
                                                            </NavigationMenuItem>
                                                  </NavigationMenuList>
                                        </NavigationMenu>
                              </div>
                    </div>
          );
};

export default Header;
