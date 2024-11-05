"use client";

import { RoomComponent } from "@/components/room-component";
import { Auth } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function Dashboard() {
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <div className="flex flex-col h-full">
      <header className="flex flex-shrink-0 h-12 items-center justify-between px-4 bg-white border-b">
        <h1 className="text-lg font-medium text-gray-700">Создание звонка</h1>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowInstructions(!showInstructions)}>
                {showInstructions ? 'Hide' : 'Show'} Instructions
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm">
            Вернуться на сайт
          </Button>
          <Button variant="default" size="sm">
            Заявка на демо
          </Button>
          <Auth />
        </div>
      </header>
      <main className="flex flex-col flex-grow overflow-hidden">
        <RoomComponent showInstructions={showInstructions} />
      </main>
    </div>
  );
}
