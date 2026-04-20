import { z } from 'zod';

export const settingSchema = z.object({
   shortcut: z.string().optional(),
   maxItem: z.number().min(10),
   openAtStartup: z.boolean(),
});
