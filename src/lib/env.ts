import { z } from 'zod';

const envSchema = z.object({
  // Server-side Sarvam AI Voice Agent credentials
  SARVAM_API_KEY: z.string().min(1, 'SARVAM_API_KEY is required for voice session proxy').optional(),
  SARVAM_BASE_URL: z.string().url().default('https://api.sarvam.ai'),
  SARVAM_ORG_ID: z.string().optional(),
  SARVAM_WORKSPACE_ID: z.string().optional(),
  SARVAM_APP_ID: z.string().optional(),

  // Supabase PostgreSQL & Auth
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),

  // Demo Access Control
  DEMO_ACCESS_PIN: z.string().default('1234'),
  DEMO_SESSION_SECRET: z.string().default('kuru-dental-demo-secret-key-change-in-production-2026'),

  // Active Clinic Identifier
  ACTIVE_CLINIC_KEY: z.string().default('kurus-dental'),

  // Vapi AI Voice Receptionist (Maya)
  NEXT_PUBLIC_VAPI_PUBLIC_KEY: z.string().optional(),
  NEXT_PUBLIC_VAPI_ASSISTANT_ID: z.string().default('61c2af86-4b22-4623-9bd7-5bc953ef654b'),

  // Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | null = null;

/**
 * Validates and returns environment variables.
 * Caches results after first read.
 */
export function getEnv(): Env {
  if (cachedEnv) {
    return cachedEnv;
  }

  const result = envSchema.safeParse({
    SARVAM_API_KEY: process.env.SARVAM_API_KEY,
    SARVAM_BASE_URL: process.env.SARVAM_BASE_URL || 'https://api.sarvam.ai',
    SARVAM_ORG_ID: process.env.SARVAM_ORG_ID,
    SARVAM_WORKSPACE_ID: process.env.SARVAM_WORKSPACE_ID,
    SARVAM_APP_ID: process.env.SARVAM_APP_ID,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    DEMO_ACCESS_PIN: process.env.DEMO_ACCESS_PIN || '1234',
    DEMO_SESSION_SECRET: process.env.DEMO_SESSION_SECRET || 'kuru-dental-demo-secret-key-change-in-production-2026',
    ACTIVE_CLINIC_KEY: process.env.ACTIVE_CLINIC_KEY || 'kurus-dental',
    NEXT_PUBLIC_VAPI_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY,
    NEXT_PUBLIC_VAPI_ASSISTANT_ID: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || '61c2af86-4b22-4623-9bd7-5bc953ef654b',
    NODE_ENV: process.env.NODE_ENV || 'development',
  });

  if (!result.success) {
    console.error('❌ Invalid environment variables:', result.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables configuration.');
  }

  cachedEnv = result.data;
  return cachedEnv;
}

/**
 * Check if real Vapi credentials are provisioned
 */
export function isVapiConfigured(): boolean {
  const key = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
  return Boolean(key && key !== 'your_vapi_public_key' && key.trim().length > 0);
}

/**
 * Retrieve Vapi client configuration safely
 */
export function getVapiClientConfig() {
  const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '';
  const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || '61c2af86-4b22-4623-9bd7-5bc953ef654b';
  const isConfigured = Boolean(
    publicKey && 
    publicKey !== 'your_vapi_public_key' && 
    publicKey.trim().length > 0 &&
    assistantId && 
    assistantId.trim().length > 0
  );

  return {
    publicKey,
    assistantId,
    isConfigured,
  };
}

/**
 * Check if real Sarvam credentials are fully provisioned
 */
export function isSarvamConfigured(): boolean {
  return Boolean(process.env.SARVAM_API_KEY && process.env.SARVAM_API_KEY.length > 0);
}

/**
 * Check if Supabase is fully provisioned
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
