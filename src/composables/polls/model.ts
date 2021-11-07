import {
  object as zobject,
  string as zstring,
  infer as zinfer,
} from 'zod';

export interface Choice {
  name: string;
}
export interface Poll {
  _id: string;
  title: string;
  description: string;
  createdBy: string;
  choices: Choice[];
}

export const ChoicePayloadSchema = zobject({
  name: zstring({
    required_error: 'Choice name is required',
  }),
});

export const PollCreatePayloadSchema = zobject({
  title: zstring({
    required_error: 'Poll title is required',
  }),
  description: zstring({
    required_error: 'Poll description is required',
  }),
});

export const PollUpdatePayloadSchema = PollCreatePayloadSchema.partial();

export type CreatePollPayload = zinfer<typeof PollCreatePayloadSchema>;
export type PollUpdatePayload = zinfer<typeof PollUpdatePayloadSchema>;
export type ChoicePayload = zinfer<typeof ChoicePayloadSchema>;
