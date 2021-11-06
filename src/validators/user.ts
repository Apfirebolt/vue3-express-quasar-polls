import { object as zobject, string as zstring, infer as zinfer } from 'zod';

export interface User {
  id: string;
  name: string;
  description: string;
}

export const ClientTypeCreatePayloadSchema = zobject({
  name: zstring({
    required_error: 'First Name is required',
  }),
  description: zstring({
    required_error: 'Description is required',
  }),
});

export const ClientTypeUpdatePayloadSchema = ClientTypeCreatePayloadSchema.partial();

export type ClientTypeCreatePayload = zinfer<typeof ClientTypeCreatePayloadSchema>;
export type ClientTypeUpdatePayload = zinfer<typeof ClientTypeUpdatePayloadSchema>;
