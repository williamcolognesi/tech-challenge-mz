import { API_URL } from '@/lib/api/client';
import type { IEnums } from '../../dto/enums.dto';

export async function getEnums(): Promise<IEnums> {
  const res = await fetch(`${API_URL}/enums`, { cache: 'force-cache' });
  if (!res.ok) throw new Error('Falha ao carregar enums');
  return res.json();
}
