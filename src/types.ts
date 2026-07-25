export interface ConnectionInfo {
  ip: string;
  port: number;
  javaAddress: string;
  supportedEditions: string[];
}

export interface RulesInfo {
  allowed: string[];
  prohibited: string[];
}

export interface WorldInfo {
  border: string;
  shape: string;
  centerX: number;
  centerZ: number;
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export interface SocialsInfo {
  whatsappGroup: string;
  donationPhone: string;
}

export interface ServerConfig {
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  connection: ConnectionInfo;
  concept: string[];
  rules: RulesInfo;
  world: WorldInfo;
  socials: SocialsInfo;
}

export interface DeveloperData {
  name: string;
  contact: {
    phone: string;
    whatsapp: string;
  };
  website: {
    portfolio: string;
  };
  community: {
    name: string;
    website: string;
    discord: string;
  };
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
}

export interface ServerStatus {
  online: boolean;
  players: {
    online: number;
    max: number;
  };
  version: string;
  motd?: string;
  pingMs?: number;
}
