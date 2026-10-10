import { ClinicConfig } from './types';
import { kurusDentalClinicConfig } from '@/config/clinics/kurus-dental';

const CLINIC_REGISTRY: Record<string, ClinicConfig> = {
  'kurus-dental': kurusDentalClinicConfig,
};

/**
 * Get configuration for a clinic by key.
 * Defaults to 'kurus-dental' if key is omitted or unknown.
 */
export function getClinicConfig(clinicKey?: string): ClinicConfig {
  if (clinicKey && CLINIC_REGISTRY[clinicKey]) {
    return CLINIC_REGISTRY[clinicKey];
  }

  // Fallback to active clinic environment variable or default
  const envKey = process.env.ACTIVE_CLINIC_KEY || 'kurus-dental';
  return CLINIC_REGISTRY[envKey] || kurusDentalClinicConfig;
}

/**
 * Register an additional clinic for multi-clinic extensibility
 */
export function registerClinic(config: ClinicConfig): void {
  CLINIC_REGISTRY[config.key] = config;
}

/**
 * List all available registered clinics
 */
export function getAllClinics(): ClinicConfig[] {
  return Object.values(CLINIC_REGISTRY);
}
