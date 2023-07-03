import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

function Header() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      className="absolute top-5 right-5 bg-dark p-1 rounded-full flex items-center  gap-x-2 cursor-pointer"
    >
      <img
        alt="userImage"
        className="rounded-full"
        width={30}
        height={30}
        src={session?.user?.image || ""}
      />
      <p className="text-white">{session?.user?.name}</p>
      {isOpen ? (
        <ChevronUpIcon className="h-5 text-white" />
      ) : (
        <ChevronDownIcon className="h-5 text-white" />
      )}
      {isOpen && (
        <div className="absolute rounded-lg p-2 right-0 w-full -bottom-12  bg-dark2 ">
          <div onClick={() => signOut()}>
            <p className="text-white">Log out</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
