import { SessionConfig, defaultSessionConfig } from "./playground-state";
import { VoiceId } from "./voices";
import {
  Annoyed,
} from "lucide-react";

export interface Preset {
  id: string;
  name: string;
  description?: string;
  instructions: string;
  sessionConfig: SessionConfig;
  defaultGroup?: PresetGroup;
  icon?: React.ElementType;
  dynamicConfig?: DynamicClientConfig;
}

export enum PresetGroup {
  FUNCTIONALITY = "Use-Case Demos",
  PERSONALITY = "Fun Style & Personality Demos",
}

export interface DynamicClientConfig {
  language: string;
  mood: string[];
  callType: string;
  clientIndustry: string;
  clientPosition: string;
  callPurpose: string;
  businessType: string;
  businessSphere: string;
  saleObject: string;
}

export const defaultPresets: Preset[] = [
  {
    id: "dynamic-difficult-client",
    name: "Dynamic Difficult Client",
    description: "A configurable difficult client scenario for sales training",
    instructions: `Act as a person in the position of {clientPosition} working in {clientIndustry}. 
This is a {callType} call.
Respond showing the following mood and characteristics: {mood}.

Be realistic but challenging:
- Show the specified mood and characteristics consistently
- Be reluctant to engage in lengthy discussions
- Avoid immediate agreement or commitment
- Get shorter and more direct in responses if the conversation drags on

If the conversation goes off-topic or becomes unprofessional, interrupt to bring it back on track.`,
    sessionConfig: {
      ...defaultSessionConfig,
      voice: VoiceId.echo,
    },
    defaultGroup: PresetGroup.FUNCTIONALITY,
    icon: Annoyed,
    dynamicConfig: {
      language: "",
      mood: [],
      callType: "",
      clientIndustry: "",
      clientPosition: "",
      callPurpose: "",
      businessType: "",
      businessSphere: "",
      saleObject: "",
    },
  },
];
