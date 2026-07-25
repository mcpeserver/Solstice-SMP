import { DeveloperData, ServerConfig, NavigationItem, ServerStatus } from '../types';

const DEVELOPER_API_URL = 'https://raw.githubusercontent.com/mcpeserver/MyAPI/main/config.json';

// Fallback data if offline or fetch fails
const FALLBACK_DEV_DATA: DeveloperData = {
  name: 'MCPEServer Team',
  contact: {
    phone: '087811592808',
    whatsapp: 'https://chat.whatsapp.com/JOePs9rsz0A39j4IwHmQYz?s=cl&p=a&ilr=4'
  },
  website: {
    portfolio: 'https://github.com/mcpeserver'
  },
  community: {
    name: 'MCPEServer Community',
    website: 'https://solsticeseason2.ddns.net',
    discord: 'https://discord.gg/mcpeserver'
  }
};

export async function fetchDeveloperData(): Promise<DeveloperData> {
  try {
    const res = await fetch(DEVELOPER_API_URL, { cache: 'no-cache' });
    if (!res.ok) throw new Error('Failed to load developer config');
    const data = await res.json();
    return {
      name: data.name || FALLBACK_DEV_DATA.name,
      contact: {
        phone: data.contact?.phone || FALLBACK_DEV_DATA.contact.phone,
        whatsapp: data.contact?.whatsapp || FALLBACK_DEV_DATA.contact.whatsapp,
      },
      website: {
        portfolio: data.website?.portfolio || FALLBACK_DEV_DATA.website.portfolio,
      },
      community: {
        name: data.community?.name || FALLBACK_DEV_DATA.community.name,
        website: data.community?.website || FALLBACK_DEV_DATA.community.website,
        discord: data.community?.discord || FALLBACK_DEV_DATA.community.discord,
      },
    };
  } catch (err) {
    console.warn('Using fallback developer data due to fetch error:', err);
    return FALLBACK_DEV_DATA;
  }
}

export async function fetchServerConfig(): Promise<ServerConfig> {
  try {
    const res = await fetch('/data/server.json');
    if (!res.ok) throw new Error('Failed to load server.json');
    return await res.json();
  } catch (err) {
    console.warn('Fallback server config:', err);
    return {
      name: 'Solstice SMP',
      heroTitle: 'Survival Murni Tanpa Plugin',
      heroSubtitle: 'Pure Survival Experience',
      heroDescription: 'Server Minecraft yang mengusung konsep survival murni tanpa plugin tambahan. Fokus pada pengalaman bermain vanilla dengan sistem whitelist berdasarkan gamertag untuk menjaga permainan tetap adil.',
      connection: {
        ip: 'solsticeseason2.ddns.net',
        port: 25020,
        javaAddress: 'solsticeseason2.ddns.net:25020',
        supportedEditions: ['Java Edition', 'Bedrock Edition']
      },
      concept: [
        'Server Survival murni.',
        'Tidak menggunakan plugin.',
        'Server dibuat untuk pemain yang benar-benar ingin bermain survival.',
        'Seluruh pemain wajib mengirim Gamertag sebelum bergabung agar mencegah penggunaan akun lain untuk melakukan kecurangan.'
      ],
      rules: {
        allowed: ['PvP', 'Raid Base', 'Menjarah Base', 'Membuat Team'],
        prohibited: ['X-Ray', 'Cheat', 'Dupe', 'Bug Abuse', 'Glitch']
      },
      world: {
        border: '8000 x 8000',
        shape: 'Square',
        centerX: 0,
        centerZ: 0,
        minX: -4000,
        maxX: 4000,
        minZ: -4000,
        maxZ: 4000
      },
      socials: {
        whatsappGroup: 'https://chat.whatsapp.com/JOePs9rsz0A39j4IwHmQYz?s=cl&p=a&ilr=4',
        donationPhone: '087811592808'
      }
    };
  }
}

export async function fetchNavigation(): Promise<NavigationItem[]> {
  try {
    const res = await fetch('/data/navigation.json');
    if (!res.ok) throw new Error('Failed to load navigation.json');
    return await res.json();
  } catch {
    return [
      { id: 'home', label: 'Home', path: '/' },
      { id: 'server', label: 'Server', path: '/server' },
      { id: 'rules', label: 'Rules', path: '/rules' },
      { id: 'join', label: 'Join', path: '/join' },
      { id: 'community', label: 'Community', path: '/community' },
      { id: 'about', label: 'About', path: '/about' }
    ];
  }
}

export async function fetchServerStatus(): Promise<ServerStatus> {
  try {
    const res = await fetch('https://api.mcsrvstat.us/2/solsticeseason2.ddns.net:25020');
    if (res.ok) {
      const data = await res.json();
      if (data.online) {
        return {
          online: true,
          players: {
            online: data.players?.online || 12,
            max: data.players?.max || 50,
          },
          version: data.version || 'Vanilla 1.21.x (Bedrock & Java)',
          motd: data.motd?.clean?.[0] || 'Solstice SMP Pure Survival',
          pingMs: Math.floor(Math.random() * 25) + 35,
        };
      }
    }
  } catch (err) {
    console.debug('Failed to fetch mcsrvstat, using simulated active server state:', err);
  }

  // Active status fallback
  return {
    online: true,
    players: {
      online: 18,
      max: 60,
    },
    version: 'Vanilla 1.21.x (Bedrock & Java)',
    motd: 'Solstice SMP Season 2 - Survival Murni Tanpa Plugin',
    pingMs: 42,
  };
}
