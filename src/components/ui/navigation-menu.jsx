import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";

// Fungsi helper untuk menggabungkan className
function cn(...classes) {
          return classes.filter(Boolean).join(" ");
}

// Navigation Menu Root
const NavigationMenu = React.forwardRef(({ className, children, ...props }, ref) => (
          <NavigationMenuPrimitive.Root ref={ref} className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)} {...props}>
                    {children}
                    <NavigationMenuViewport />
          </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = "NavigationMenu";

// Navigation Menu List
const NavigationMenuList = React.forwardRef(({ className, ...props }, ref) => (
          <NavigationMenuPrimitive.List ref={ref} className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)} {...props} />
));
NavigationMenuList.displayName = "NavigationMenuList";

// Navigation Menu Item
const NavigationMenuItem = NavigationMenuPrimitive.Item;

// Navigation Menu Trigger
const NavigationMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
          <NavigationMenuPrimitive.Trigger ref={ref} className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className)} {...props}>
                    {children}
                    <ChevronDown className="ml-1 h-3 w-3 transition-transform group-data-[state=open]:rotate-180" aria-hidden="true" />
          </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

// Navigation Menu Content
const NavigationMenuContent = React.forwardRef(({ className, ...props }, ref) => (
          <NavigationMenuPrimitive.Content ref={ref} className={cn("left-0 top-0 w-full md:absolute md:w-auto", className)} {...props} />
));
NavigationMenuContent.displayName = "NavigationMenuContent";

// Navigation Menu Link
const NavigationMenuLink = NavigationMenuPrimitive.Link;

// Navigation Menu Viewport (dropdown container)
const NavigationMenuViewport = React.forwardRef(({ className, ...props }, ref) => (
          <div className="absolute left-0 top-full flex justify-center">
                    <NavigationMenuPrimitive.Viewport ref={ref} className={cn("relative mt-1.5 w-full rounded-md border bg-popover text-popover-foreground shadow md:w-[var(--radix-navigation-menu-viewport-width)]", className)} {...props} />
          </div>
));
NavigationMenuViewport.displayName = "NavigationMenuViewport";

// Navigation Menu Indicator
const NavigationMenuIndicator = React.forwardRef(({ className, ...props }, ref) => (
          <NavigationMenuPrimitive.Indicator ref={ref} className={cn("top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden", className)} {...props}>
                    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
          </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";

// Export Semua Komponen
export {
          NavigationMenu,
          NavigationMenuList,
          NavigationMenuItem,
          NavigationMenuContent,
          NavigationMenuTrigger,
          NavigationMenuLink,
          NavigationMenuIndicator,
          NavigationMenuViewport
};
