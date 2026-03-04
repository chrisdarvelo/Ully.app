export interface Recipe {
  id: string;
  name: string;
  method: string;
  description: string;
  artSeed: number;
  artStyle: string;
  createdAt: string;
  updatedAt: string;
}

export interface Barista {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  avatarSeed: number;
  avatarColor: string;
  avatarUrl?: string;
  recipes: { title: string; url: string }[];
  blogs: { title: string; url: string }[];
  recommendations: string[];
  followed?: boolean;
}

export interface Cafe {
  id: string;
  name: string;
  location?: string;
  notes?: string;
  addedAt: string;
}

export interface NewsArticle {
  title: string;
  source: string;
  link: string;
  date: string;
}

export interface BlogPost {
  title: string;
  url: string;
  source: string;
  baristaAvatarUrl?: string;
  baristaAvatarColor?: string;
  baristaId: string;
}

export type MessageRole = 'user' | 'ully' | 'assistant';

export interface ChatMessage {
  role: MessageRole;
  text: string;
  image?: string; // base64
  imageUri?: string;
  frames?: string[]; // array of base64
  isVideo?: boolean;
}

export interface ChatHistoryEntry {
  id: string;
  preview: string;
  date: string;
  messages: ChatMessage[];
}

export type UserRole = 'consumer' | 'barista' | 'organization';
export type UserTier = 'free' | 'pro' | 'business';

export interface UserProfile {
  uid: string;
  email: string | null;
  username?: string;
  onboarded: boolean;
  avatarUri?: string;
  role?: UserRole;
  tier?: UserTier;
  // Consumer
  dailyCoffees?: '1' | '3' | 'more';
  favoriteMethod?: 'drip' | 'espresso' | 'pour_over';
  drinkAt?: 'home' | 'go_out';
  // Barista
  skillLevel?: 'amateur' | 'semi_pro' | 'champion';
  baristaMethod?: 'espresso' | 'pour_over' | 'other';
  favoriteRoaster?: string;
  // Organization
  employeeCount?: '10' | '50' | 'more';
  orgType?: 'roaster' | 'cafe' | 'distributor';
  businessType?: 'retailer' | 'wholesaler';
  // legacy/misc
  location?: string;
  favoriteRoasts?: string[];
  equipment?: string[];
  shops?: string[];
}

// ── Business / Organization types ───────────────────────────────────────────

export interface Machine {
  id: string;
  name: string;
  type: 'espresso_machine' | 'grinder' | 'water_treatment' | 'other';
  brand?: string;
  model?: string;
  serialNumber?: string;
  location?: string;
  installedAt?: string;
  notes?: string;
}

export type ServiceType =
  | 'group_service' | 'boiler_flush' | 'descale'
  | 'gasket_replacement' | 'grinder_calibration' | 'custom';

export interface ServiceRecord {
  id: string;
  machineId: string;
  serviceType: ServiceType;
  completedAt: string;
  technicianName?: string;
  notes: string;
  partsReplaced?: string[];
  nextDueAt?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'barista' | 'head_barista' | 'manager';
  startDate?: string;
  linkedUid?: string;
  avatarUri?: string;
}

export type DrillType =
  | 'espresso_workflow' | 'milk_texture' | 'cupping'
  | 'latte_art' | 'customer_service' | 'custom';

export interface TrainingSession {
  id: string;
  memberId: string;
  createdAt: string;
  drillType: DrillType;
  durationMinutes: number;
  focusArea: string;
  selfScore: 1 | 2 | 3 | 4 | 5;
  managerScore?: 1 | 2 | 3 | 4 | 5;
  notes: string;
  tags: string[];
}

export interface NotificationPrefs {
  enabled: boolean;
  dailyTip: boolean;
  newContent: boolean;
}

export interface DialInData {
  dose: number;    // grams
  yield: number;   // grams
  time: number;    // seconds
  taste: 'sour' | 'balanced' | 'bitter';
  image?: string;  // base64 — espresso shot photo
  imageUri?: string;
}
