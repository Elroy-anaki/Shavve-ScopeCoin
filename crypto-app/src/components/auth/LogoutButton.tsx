'use client'

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { toast } from "sonner"

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }); 
    toast("Bye Bye...", {
      style: {
        backgroundColor: "#DC2626", // צבע ירוק (green-600)
        color: "#fff"
        
      }
    });
        router.replace("/auth/signIn"); 
  };

  return (
    <Button onClick={handleLogout} className="bg-rose-600 hover:bg-rose-500">
        LogOut
    </Button>
  );
}
