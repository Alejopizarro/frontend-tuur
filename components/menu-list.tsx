/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const experiences = [
  {
    id: 1,
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 1,
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 4,
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const MenuList = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-md bg-transparent">
            Canyons
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="relative flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div
                      className="absolute inset-0 rounded-md"
                      style={{
                        backgroundImage: "url(/header-canyoning.jpg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: 0.4,
                        zIndex: 0,
                      }}
                    />
                    <div className="relative mb-2 mt-4 text-lg font-medium z-10">
                      TUUR Canyoning
                    </div>
                    <p className="relative text-sm leading-tight text-muted-foreground z-10">
                      The best canyons experiences in Andalucia.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/category" title="Canyons in Málaga">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </ListItem>
              <ListItem href="/offers" title="Canyons in Granada">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </ListItem>
              <ListItem href="/accesories" title="More canyons">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-md bg-transparent">
            Marbella experiences
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {experiences !== null &&
                experiences.map((experience) => (
                  <ListItem
                    key={experience.id}
                    title={experience.title}
                    // href={`/category/${experience.attributes.slug}`}
                  >
                    {experience.description}
                  </ListItem>
                ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className="text-md bg-transparent">
              Team Building
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-md bg-transparent">
            About us
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem href="/" title="About us">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </ListItem>
              <ListItem href="/" title="Blog">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </ListItem>
              <ListItem href="/" title="FAQs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </ListItem>
              <ListItem href="/" title="Guide to safety measures">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </ListItem>
              <ListItem
                href="/"
                title="Legal notice, Privacy, Terms and Conditions"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default MenuList;
