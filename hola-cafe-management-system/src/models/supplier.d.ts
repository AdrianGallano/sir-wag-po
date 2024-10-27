export interface Supplier {
  id: number;
  name: string;
  description: string;
  contact_person: string;
  phone_number: string;
  address: string;
  email: string;
  created_at: Date | string;
  updated_at: Date | string;
}
