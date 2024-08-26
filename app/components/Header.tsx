"use client";

import SearchBar from "./search/SearchBar";
import MenuIcon from "./menu/MenuIcon";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="p-2 flex justify-between items-center h-[10svh] w-screen bg-blue-800 fixed top-0">
      <MenuIcon onClick={() => setOpen(!open)} open={open} />
      <SearchBar />
    </header>
  );
}
