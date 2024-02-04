
export interface TreeNode {
  dataElementId: string;
  name: string;
  externalId: string;
  groupId: string;
  Groups?: TreeNode[];
  dataPartitions?: {};
  dataPartitionId?: null | string;
  dataPartition?: null;
  dataElementAttributes: DataElementAttribute[];
  showAttributes: boolean;
  readKey: null;
  writeKey: null;
  readAccess: boolean;
  writeAccess: boolean;
  execAccess: boolean;
}


export interface Groups {
  name: string;
  externalId?: string | null;
  groupId: string;
}

export interface Channels {
  name: string;
  externalId?: string | null;
  groupId: string;
  dataPartitions?: {};
  dataPartitionId?: null | string;
  dataPartition?: null;
  dataModel?: number;
}

export interface DialogState {
  isAddDialogOpen: boolean;
  isRenameDialogOpen: boolean;
  parentNode: TreeNode | null;
}

export interface DataElementAttribute {

  text: string;
  dataElementAttributeId: string;
  name: string;
  dataElementId: string;
  kind: string;
  mevisMeanType: number;
  city : string;
  street : string;
  postalCode : string;
  latitude: number;
  longitude: number;
}


 export type User = {
  userId: string;
  roles: string;
  email: string;
};
