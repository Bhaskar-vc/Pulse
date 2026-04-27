export interface CoreConfig {
  apiUrl: string;
  appName: string;
  version: string;
  features: Record<string, boolean>;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  department: string | null;
}
