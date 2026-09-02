export type InquiryRecord = Record<string, unknown> & {
  name?: string;
  phone?: string;
  email?: string;
  problem?: string;
  date?: string;
  createdAt?: string;
};

export const normalizeInquiries = (payload: unknown): InquiryRecord[] => {
  if (Array.isArray(payload)) {
    return payload as InquiryRecord[];
  }

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;

    if (Array.isArray(record.inquiries)) {
      return record.inquiries as InquiryRecord[];
    }

    if (Array.isArray(record.data)) {
      return record.data as InquiryRecord[];
    }

    if (Array.isArray(record.items)) {
      return record.items as InquiryRecord[];
    }
  }

  return [];
};
