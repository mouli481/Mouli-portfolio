import { z } from "zod";

export const MESSAGE_MAX_LENGTH = 2000;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z.email("Please enter a valid email address."),
  subject: z
    .string()
    .trim()
    .min(2, "Please add a short subject.")
    .max(150, "Subject must be 150 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(10, "Your message should be at least 10 characters.")
    .max(MESSAGE_MAX_LENGTH, `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer.`),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
