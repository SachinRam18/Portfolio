export type AppId = 'about' | 'projects' | 'resume' | 'contact' | 'github' | 'linkedin';

export interface AppState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}
