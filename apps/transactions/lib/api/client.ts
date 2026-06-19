export const API_URL = process.env.API_URL ?? 'http://localhost:8080/api';

export class ApiUnavailableError extends Error {
  constructor() {
    super('A API não está disponível. Verifique se o servidor está em execução.');
    this.name = 'ApiUnavailableError';
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const isFormData = init?.body instanceof FormData;

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      cache: 'no-store',
      ...(!isFormData && { headers: { 'Content-Type': 'application/json' } }),
      ...init,
    });
  } catch {
    throw new ApiUnavailableError();
  }

  if (!res.ok) {
    const text = await res.text();
    try {
      const problem = JSON.parse(text);
      throw new Error(problem.detail ?? problem.title ?? `Erro ${res.status}`);
    } catch (parseErr) {
      if (parseErr instanceof Error) throw parseErr;
      throw new Error(`Erro ${res.status}`);
    }
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  postFile: <T>(path: string, formData: FormData) =>
    request<T>(path, { method: 'POST', body: formData }),
  putFile: <T>(path: string, formData: FormData) =>
    request<T>(path, { method: 'PUT', body: formData }),
  delete: (path: string) => request<void>(path, { method: 'DELETE' }),
};
