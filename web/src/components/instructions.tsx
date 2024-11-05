"use client";

import { useState } from "react";
import { InstructionsEditor } from "@/components/instructions-editor";
import { usePlaygroundState } from "@/hooks/use-playground-state";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CircleHelp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Instructions() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { pgState } = usePlaygroundState();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
        className={`flex flex-1 flex-col w-full gap-[4px] border p-6 rounded-lg mb-6 bg-white shadow-sm
          ${isFocused ? "ring-2 ring-purple-500" : "ring-0"}`}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="text-sm font-semibold uppercase mr-2 tracking-widest text-gray-700">
              INSTRUCTIONS
            </div>
            <HoverCard open={isOpen}>
              <HoverCardTrigger asChild>
                <CircleHelp
                  className="h-5 w-5 text-gray-500 cursor-pointer hover:text-purple-500 transition-colors"
                  onClick={() => setIsOpen(!isOpen)}
                />
              </HoverCardTrigger>
              <HoverCardContent
                className="w-[260px] text-sm"
                side="bottom"
                onInteractOutside={() => setIsOpen(false)}
              >
                Instructions are a system message that is prepended to the
                conversation whenever the model responds. Updates will be
                reflected on the next conversation turn.
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
        <div className="min-h-[200px] max-h-[400px] overflow-y-auto">
          <InstructionsEditor
            instructions={pgState.instructions}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
