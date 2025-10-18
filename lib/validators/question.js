import { z } from 'zod';

const BaseContentBlockSchema = z.object({
  language: z.string().optional(),
  level: z.number().optional(),
  items: z.array(z.string().min(1, 'List item cannot be empty')).optional(),
});

const ContentBlockSchema = z.lazy(() =>
  BaseContentBlockSchema.extend({
    type: z.enum(['paragraph', 'heading', 'code', 'example', 'list']),
    value: z.string().optional(),
    blocks: z.array(ContentBlockSchema).optional(),
  }).superRefine((data, ctx) => {
    if (
      ['paragraph', 'heading', 'code', 'example'].includes(data.type) &&
      (!data.value || data.value.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Value is required for this block type',
        path: ['value'],
      });
    }

    if (data.type === 'list') {
      if (!data.items || data.items.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'List must have at least one item',
          path: ['items'],
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

  difficulty: z
    .enum(['Easy', 'Medium', 'Hard'], {
      required_error: 'Difficulty level is required',
    })
    .default('Easy'),

  answerContent: z
    .array(ContentBlockSchema)
    .min(1, { message: 'Answer content must have at least one block' }),
});

export const UpdateQuestionValidationSchema =
  QuestionValidationSchema.partial();
