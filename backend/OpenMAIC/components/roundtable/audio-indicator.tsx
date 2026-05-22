export type AudioIndicatorState = 'idle' | 'speaking' | 'paused' | 'playing' | 'generating';

export interface AudioIndicatorProps {
  agentId: string;
  state: AudioIndicatorState;
}
