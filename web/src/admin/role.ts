export enum RoleType {
  SuperAdmin = 1,
  Admin = 2
}

export function getRoleName(role: RoleType): string {
  return role === RoleType.SuperAdmin ? '超级管理员' : '管理员'
}

export function isSuperAdmin(role: RoleType): boolean {
  return role === RoleType.SuperAdmin
}