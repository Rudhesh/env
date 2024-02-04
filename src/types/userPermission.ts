export interface UserPermission {
  userPermissionId: string;
  localIdentityUserId: string;
  accessObjectId: string;
  readAccess: boolean;
  writeAccess: boolean;
  execAccess: boolean;
}

export interface UserWithPermission {
  userPermissions: UserPermission[];
  userId: string;
  email: string;
}
