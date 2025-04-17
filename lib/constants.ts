export const ROLES = {
    REGISTRY: 'REGISTRY',
    COORDINATOR: 'COORDINATOR',
    LECTURER: 'LECTURER',
  } as const
  
  export type Role = keyof typeof ROLES