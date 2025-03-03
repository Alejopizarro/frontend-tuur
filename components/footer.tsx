import { BaselineWhatsapp } from "@/public/whatsapp";
import { Mail, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <div className="w-full bg-teal-500">
      <div className="grid sm:grid-cols-3">
        <div className="py-4 flex flex-col gap-4 mx-auto sm:py-16 sm:px-24">
          <h5 className="font-bold text-xl">TUUR Canyoning</h5>
          <p>About us</p>
          <p>FAQs</p>
          <p>Blog</p>
          <p>Legal notice, privacity, terms and conditions</p>
        </div>
        <div className="py-4 flex flex-col gap-4 mx-auto sm:py-16 sm:px-24">
          <h5 className="font-bold text-xl">Contact us</h5>
          <div className="flex items-center gap-x-2">
            <PhoneCall width={20} /> <span>+34 699 199 158</span>
          </div>
          <div className="flex items-center gap-x-2">
            <Mail width={20} /> <span>tuurcanyoning@gmail.com</span>
          </div>
          <div className="flex items-center gap-x-2">
            <BaselineWhatsapp width={20} /> <span>+34 699 199 158</span>
          </div>
        </div>
        <div className="py-4 flex flex-col gap-4 mx-auto sm:py-16 sm:px-24">
          <h5 className="font-bold text-xl">Other activities</h5>
          <Link href="https://marbellahiking.com">marbellahiking.com</Link>
          <Link href="https://tuuradventure.com">tuuradventure.com</Link>
          <Link href="https://coasteeringmenorca.com">
            coasteeringmenorca.com
          </Link>
        </div>
      </div>
      <div className="py-4 sm:px-24">
        <Separator />
        <span className="py-4 block text-sm text-gray-500 justify-start dark:text-gray-400">
          &copy; 2016 - 2025
          <Link href="*"> TUUR Canyoning.</Link> Todos los derechos reservados.
        </span>
      </div>
    </div>
  );
};

export default Footer;
