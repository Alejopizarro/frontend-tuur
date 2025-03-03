"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, ChevronUp, Menu, PanelRightClose } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Separator } from "./ui/separator";
import { useState } from "react";
import Link from "next/link";

const ItemsMenuMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu width={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="z-1000">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="px-4 flex flex-col gap-y-4">
          <Collapsible onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="flex w-full justify-between font-semibold">
              Canyons
              {isOpen ? <ChevronUp width={20} /> : <ChevronDown width={20} />}
            </CollapsibleTrigger>
            <CollapsibleContent>Canyons in Málaga</CollapsibleContent>
            <CollapsibleContent>Canyons in Granada</CollapsibleContent>
            <CollapsibleContent>More canyons</CollapsibleContent>
          </Collapsible>
          <Separator />
          <Collapsible onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="flex w-full justify-between font-semibold">
              Marbella experiences
              {isOpen ? <ChevronUp width={20} /> : <ChevronDown width={20} />}
            </CollapsibleTrigger>
            <CollapsibleContent>Lorem ipsum</CollapsibleContent>
            <CollapsibleContent>Lorem ipsum</CollapsibleContent>
            <CollapsibleContent>Lorem ipsum</CollapsibleContent>
            <CollapsibleContent>Lorem ipsum</CollapsibleContent>
            <CollapsibleContent>Lorem ipsum</CollapsibleContent>
            <CollapsibleContent>Lorem ipsum</CollapsibleContent>
          </Collapsible>
          <Separator />
          <Link href="/" className="font-semibold">
            Team building
          </Link>
          <Separator />
          <Collapsible onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="flex w-full justify-between font-semibold">
              About us
              {isOpen ? <ChevronUp width={20} /> : <ChevronDown width={20} />}
            </CollapsibleTrigger>
            <CollapsibleContent>Blog</CollapsibleContent>
            <CollapsibleContent>FAQs</CollapsibleContent>
            <CollapsibleContent>About us</CollapsibleContent>
            <CollapsibleContent>Guide to safety measures</CollapsibleContent>
            <CollapsibleContent>
              Legal notice, Privacy, Terms and Conditions
            </CollapsibleContent>
          </Collapsible>
          <Separator />
          <Link href="/" className="font-semibold">
            Contact us
          </Link>
          <Separator />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <PanelRightClose width={20} />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ItemsMenuMobile;
