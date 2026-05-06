export interface LookupType {
  id: string;
  code: string;
  label: string;
  description?: string;
  values: any[],
  name:string;
}

export interface LookupValue {
  id: string;
  code: string;
  label: string;
  description?: string;
  displayOrder: number;
  isDefault: boolean;
  isActive: boolean;
  name:string;
}