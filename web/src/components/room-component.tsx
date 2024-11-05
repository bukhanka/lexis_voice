"use client";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  StartAudio,
} from "@livekit/components-react";

import { Chat } from "@/components/chat";
import { Transcript } from "@/components/transcript";
import { useConnection } from "@/hooks/use-connection";
import { AgentProvider } from "@/hooks/use-agent";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { SalesSimulatorLayout } from "@/components/sales-simulator-layout";
import { Instructions } from "@/components/instructions";

interface RoomComponentProps {
  showInstructions?: boolean;
}

export function RoomComponent({ showInstructions = true }: RoomComponentProps) {
  const { shouldConnect, wsUrl, token } = useConnection();
  const transcriptContainerRef = useRef<HTMLDivElement>(null);
  const scrollButtonRef = useRef<HTMLButtonElement>(null);
  
  return (
    <SalesSimulatorLayout clientId="2358">
      <LiveKitRoom
        serverUrl={wsUrl}
        token={token}
        connect={shouldConnect}
        audio={true}
        className="flex flex-col md:grid md:grid-cols-[1fr_360px] flex-grow overflow-hidden bg-white m-4 rounded-lg shadow-sm"
        style={{ "--lk-bg": "white" } as React.CSSProperties}
        options={{
          publishDefaults: {
            stopMicTrackOnMute: true,
          },
        }}
      >
        <AgentProvider>
          <div className="flex flex-col justify-center w-full max-w-3xl mx-auto p-4">
            <div className="flex flex-col items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 mb-2">
                {/* Add profile image here */}
              </div>
              <h3 className="font-medium">Владислав Владиславович Владиславович</h3>
              <p className="text-sm text-gray-500">Производительность 85%</p>
            </div>
            {showInstructions && <Instructions />}
            <Chat />
          </div>
          <div className="hidden md:flex flex-col h-full overflow-y-hidden border-l relative">
            <div className="p-4 border-b">
              <h3 className="font-medium">TRANSCRIPT</h3>
            </div>
            <div className="flex-grow overflow-y-auto" ref={transcriptContainerRef}>
              <Transcript
                scrollContainerRef={transcriptContainerRef}
                scrollButtonRef={scrollButtonRef}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <button
                ref={scrollButtonRef}
                className="p-2 bg-white text-gray-500 rounded-full hover:bg-gray-100 transition-colors absolute right-4 bottom-4 shadow-md flex items-center"
              >
                <ChevronDown className="mr-1 h-4 w-4" />
                <span className="text-xs pr-1">View latest</span>
              </button>
            </div>
          </div>
          <RoomAudioRenderer />
          <StartAudio label="Click to allow audio playback" />
        </AgentProvider>
      </LiveKitRoom>
    </SalesSimulatorLayout>
  );
}
