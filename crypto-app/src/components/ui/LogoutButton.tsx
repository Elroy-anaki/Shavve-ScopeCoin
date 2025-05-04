'use client'

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }); 
    router.push("/auth/signIn"); 
  };

  return (
    <Button onClick={handleLogout} className="bg-rose-600">
        LogOut
    </Button>
  );
}
