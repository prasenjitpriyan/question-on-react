import { z } from 'zod';

const BaseContentBlockSchema = z.object({
  alt: z.string().optional(),
  caption: z.string().optional(),
  language: z.string().optional(),
  level: z.number().optional(),
});

const ContentBlockSchema = z.lazy(() =>
  BaseContentBlockSchema.extend({
    type: z.enum(['paragraph', 'heading', 'code', 'image', 'example']),
    value: z.string().optional(),
    blocks: z.array(ContentBlockSchema).optional(),
  }).superRefine((data, ctx) => {
    if (
      data.type !== 'image' &&
      (data.value === null || data.value === undefined || data.value === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Value is required for this block type',
        path: ['value'],
      });
    }
    if (data.type === 'image') {
      const urlCheck = z.string().url().safeParse(data.value);
      if (!urlCheck.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_string,
          validation: 'url',
          message: 'A valid image URL is required',
          path: ['value'],
        });
      }
    }
  })
);

export const QuestionValidationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: 'Title must be at least 3 characters long' }),

  slug: z
    .string()
    .trim()
    .min(3, { message: 'Slug must be at least 3 characters long' })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        'Slug must be lowercase and contain only letters, numbers, and hyphens',
    }),

  category: z.string().trim().min(1, { message: 'Category is required' }),

  tags: z.array(z.string().trim().min(1)).optional().default([]),

  answerContent: z
    .array(ContentBlockSchema)
    .min(1, { message: 'Answer content must have at least one block' }),

  mainImage: z
    .string()
    .url({ message: 'Main image must be a valid URL' })
    .optional(),
});

export const UpdateQuestionValidationSchema =
  QuestionValidationSchema.partial();
