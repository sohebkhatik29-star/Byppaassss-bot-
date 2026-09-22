export type ServiceCategory = 
  | 'native'        // Specific native handlers (23 services)
  | 'form'          // Form-based Type 1/2 shorteners (43 services)
  | 'redirect'      // Redirect-follow shorteners (1,240 services)
  | 'social';       // Fallback tracked social unlockers (31 services)

export interface BypassService {
  id: string;
  domain: string;
  name: string;
  category: ServiceCategory;
  categoryLabel: string;
  bypassMethod: string;
  technicalMechanism: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced' | 'Social Lock';
  isActive: boolean;
  sampleUrl?: string;
  antiBotTiming?: string;
  codeSnippet?: string;
  notes?: string;
}

export interface BypassResult {
  success: boolean;
  originalUrl: string;
  destinationUrl?: string | null;
  status?: number;
  method?: string;
  category?: string;
  isAutonomous?: boolean;
  hops?: Array<{ url: string; status: number; type: string }>;
  timeMs?: number;
  error?: string;
  details?: string;
  headers?: Record<string, string>;
}

export interface CategorySummary {
  category: ServiceCategory;
  title: string;
  titleHindi: string;
  count: number;
  badgeColor: string;
  iconName: string;
  description: string;
  examples: string[];
}
