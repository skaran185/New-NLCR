export interface Host {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  profileImageUrl: string | null;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  businessName: string | null;
  addressLine1: string | null;
  city: string | null;
  state: { id: string; stateCode: string; stateName: string; } | null;
  zipCode: string | null;
  country: { id: string; isoCode: string; countryName: string; dialCode: string; } | null;
  idProofStatus: string;
  idProofStatusId: string;
  isIdProofSubmitted: boolean;
  isContractSigned: boolean;
  approvalStatus: string;
  approvalStatusId: string;
  approvedAt: string;
  approvalRemarks: string | null;
  approvedByAdminUserId: string | null;
  idProofDocumentTypeValueId: string;
  idProofDocumentType: string;
  idProofDocumentUrl: string | null;
  activeSubscription: {
    planCode: string;
    planName: string;
    status: string;
    trialEndDate: string | null;
    billingEndDate: string | null;
    maxVehicleListings: number;
  } | null;
  billingAddressSameAsBusiness: boolean;
  billingAddressLine1: string | null;
  billingAddressLine2: string | null;
  billingCity: string | null;
  billingStateId: string | null;
  billingZipCode: string | null;
  billingCountryId: string | null;
  billingCountry: { id: string; isoCode: string; countryName: string; dialCode: string; } | null;
  billingState: { id: string; stateCode: string; stateName: string; } | null;
  isProfileComplete: boolean;
  completionPercentage: number;
  pendingSteps: string[];
  missingFields: Record<string, string[]>;
  createdAt: string;
  updatedAt: string;

  // kept for backward compatibility
  businessEmail?: string | null;
  contractStatus?: string | null;
  isProfileCompleted?: boolean;
}

export interface HostsResponse {
  success: boolean;
  message: string;
  data: Host[];
  pagination: Pagination;
}

export interface Pagination {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface HostsFilter {
  approvalStatus: string;
  idProofStatus: string;
  sortBy: string;
  pageNumber: number;
  pageSize: number;
  search?: string;
}

export interface LookupItem {
  id: string;
  code: string;
  name: string;
}

// host.model.ts — add this interface
export interface LookupResponse {
  success: boolean;
  data: LookupItem[];
  errors: null | any;
}