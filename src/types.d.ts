export type Role = 'admin' | 'user';

export interface User { id: string; name: string; email: string; role: Role; token: string }

export interface Item { id: string; title: string; description: string; foundAt?: string; claimed?: boolean; reportedBy?: string }