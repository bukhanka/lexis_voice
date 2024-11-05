"use client";

import * as React from "react";
import { Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { usePlaygroundState } from "@/hooks/use-playground-state";
import { PresetGroup } from "@/data/presets";
import { useConnection } from "@/hooks/use-connection";

export function SidebarPresetSelector() {
  const { pgState, dispatch, helpers } = usePlaygroundState();
  const { disconnect, connect, shouldConnect } = useConnection();
  const [lastPresetId, setLastPresetId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (pgState.selectedPresetId !== lastPresetId) {
      setLastPresetId(pgState.selectedPresetId);
      if (shouldConnect) {
        disconnect().then(() => {
          connect();
        });
      }
    }
  }, [pgState.selectedPresetId, shouldConnect, disconnect, connect, lastPresetId]);

  const handlePresetSelect = (presetId: string) => {
    dispatch({
      type: "SET_SELECTED_PRESET_ID",
      payload: presetId,
    });

    const selectedPreset = helpers.getSelectedPreset({
      ...pgState,
      selectedPresetId: presetId,
    });
    
    if (selectedPreset && !selectedPreset.defaultGroup) {
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (selectedPreset && selectedPreset.defaultGroup) {
      const params = helpers.encodeToUrlParams({
        ...pgState,
        selectedPresetId: presetId,
      });
      window.history.replaceState(
        {},
        document.title,
        `${window.location.pathname}${params ? `?${params}` : ""}`,
      );
    }
  };

  const selectedPreset = helpers.getSelectedPreset(pgState);
  const presets = helpers.getDefaultPresets();

  return (
    <Select
      value={pgState.selectedPresetId || ""}
      onValueChange={handlePresetSelect}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Выберите шаблон">
          {selectedPreset?.name || "Выберите шаблон"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.values(PresetGroup).map((group) => (
          <React.Fragment key={group}>
            <div className="px-2 py-1.5 text-sm font-semibold text-gray-500">
              {group}
            </div>
            {presets
              .filter((preset) => preset.defaultGroup === group)
              .map((preset) => (
                <HoverCard key={preset.id}>
                  <HoverCardTrigger asChild>
                    <SelectItem value={preset.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{preset.name}</span>
                        {pgState.selectedPresetId === preset.id && (
                          <Check className="h-4 w-4 ml-2" />
                        )}
                      </div>
                    </SelectItem>
                  </HoverCardTrigger>
                  <HoverCardContent
                    className="w-[260px]"
                    side="right"
                    align="start"
                  >
                    <p className="text-sm">{preset.description}</p>
                  </HoverCardContent>
                </HoverCard>
              ))}
          </React.Fragment>
        ))}
      </SelectContent>
    </Select>
  );
} 