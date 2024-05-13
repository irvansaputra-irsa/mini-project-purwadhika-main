import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  description: z
    .string()
    .min(1, "Description cannot be empty")
    .max(400, "Description must be less than 400 characters"),
  location: z
    .string()
    .min(1, "Description cannot be empty")
    .max(50, "Location must be less than 400 characters"),
  imageUrl: z.string(),
  startDateTime: z
    .date()
    .refine((d) => d > new Date(), { message: "Please enter valid date" }),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});
