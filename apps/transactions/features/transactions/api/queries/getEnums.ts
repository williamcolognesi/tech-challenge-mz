import { api } from '@/lib/api/client';
import type { IEnums } from '../../dto/enums.dto';

export async function getEnums(): Promise<IEnums> {
  return api.get<IEnums>('/enums');
}
