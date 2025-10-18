'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn, slugify } from '@/lib/utils';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const ContentBlockInputs = ({ block, index, onChange }) => {
  const handleChange = (e) => {
    onChange(index, e.target.name, e.target.value);
  };

  switch (block.type) {
    case 'heading':
      return (
        <Input
          name="value"
          value={block.value || ''}
          onChange={handleChange}
          placeholder="Heading text..."
          className="input-glass text-white text-lg font-semibold"
        />
      );
    case 'code':
      return (
        <div className="space-y-2">
          <Input
            name="language"
            value={block.language || ''}
            onChange={handleChange}
            placeholder="Language (e.g., javascript)"
            className="input-glass text-white w-full md:w-1/3"
          />
          <textarea
            name="value"
            value={block.value || ''}
            onChange={handleChange}
            placeholder="Your code snippet..."
            className="input-glass text-white min-h-[150px] resize-y w-full font-mono text-sm"
          />
        </div>
      );
    case 'list': {
      const handleItemChange = (itemIndex, newValue) => {
        const newItems = [...(block.items || [])];
        newItems[itemIndex] = newValue;
        onChange(index, 'items', newItems);
      };

      const addItem = () => {
        const newItems = [...(block.items || []), ''];
        onChange(index, 'items', newItems);
      };

      const removeItem = (itemIndex) => {
        if (!block.items || block.items.length <= 1) return;
        const newItems = block.items.filter((_, i) => i !== itemIndex);
        onChange(index, 'items', newItems);
      };

      return (
        <div className="space-y-2">
          {(block.items || []).map((item, itemIndex) => (
            <div key={itemIndex} className="flex items-center gap-2">
              <span className="text-white/80 pl-2"> • </span>
              <Input
                name="item"
                value={item}
                onChange={(e) => handleItemChange(itemIndex, e.target.value)}
                placeholder="List item..."
                className="input-glass text-white flex-grow"
              />
              {block.items && block.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(itemIndex)}
                  className="text-red-500 hover:text-red-400 p-1 rounded-full flex-shrink-0">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="btn-glass flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/90 hover:text-white cursor-pointer hover:scale-105 active:scale-95 text-sm">
            <Plus size={14} /> Add List Item
          </button>
        </div>
      );
    }

    case 'paragraph':
    default:
      return (
        <textarea
          name="value"
          value={block.value || ''}
          onChange={handleChange}
          placeholder="Paragraph text..."
          className="input-glass text-white min-h-[120px] resize-y w-full"
        />
      );
  }
};

export default function QuestionForm({
  question,
  onSubmit,
  onCancel,
  isSubmitting,
}) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    difficulty: 'Easy',
    answerContent: [{ type: 'paragraph', value: '' }],
    tags: '',
  });

  useEffect(() => {
    if (question) {
      setFormData({
        title: question.title || '',
        slug: question.slug || '',
        category: question.category || '',
        difficulty: question.difficulty || 'Easy',
        answerContent:
          question.answerContent?.length > 0
            ? question.answerContent
            : [{ type: 'paragraph', value: '' }],
        tags: question.tags?.join(', ') || '',
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        category: '',
        difficulty: 'Easy',
        answerContent: [{ type: 'paragraph', value: '' }],
        tags: '',
      });
    }
  }, [question]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug: slugify(newTitle),
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleBlockChange = (index, fieldName, fieldValue) => {
    const newAnswerContent = [...formData.answerContent];
    newAnswerContent[index] = {
      ...newAnswerContent[index],
      [fieldName]: fieldValue,
    };
    setFormData((prev) => ({ ...prev, answerContent: newAnswerContent }));
  };

  const addBlock = (type) => {
    let newBlock;
    switch (type) {
      case 'code':
        newBlock = { type: 'code', value: '', language: 'javascript' };
        break;
      case 'list':
        newBlock = { type: 'list', items: [''] };
        break;
      case 'heading':
        newBlock = { type: 'heading', value: '' };
        break;
      case 'paragraph':
      default:
        newBlock = { type: 'paragraph', value: '' };
    }
    setFormData((prev) => ({
      ...prev,
      answerContent: [...prev.answerContent, newBlock],
    }));
  };

  const deleteBlock = (index) => {
    if (formData.answerContent.length <= 1) return;
    const newAnswerContent = formData.answerContent.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({ ...prev, answerContent: newAnswerContent }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const tagsArray = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    onSubmit({
      ...formData,
      tags: tagsArray,
    });
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="glass-card rounded-2xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white mb-2">
        {question ? 'Edit Question' : 'Add New Question'}
      </h2>
      <LabelInputContainer>
        <Label className="text-white/90" htmlFor="title">
          Title
        </Label>
        <Input
          id="title"
          type="text"
          value={formData.title}
          onChange={handleTitleChange}
          required
          className="input-glass text-white"
        />
      </LabelInputContainer>
      <LabelInputContainer>
        <Label className="text-white/90" htmlFor="slug">
          Slug (URL)
        </Label>
        <Input
          id="slug"
          type="text"
          value={formData.slug}
          onChange={handleChange}
          required
          className="input-glass text-white"
        />
      </LabelInputContainer>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LabelInputContainer>
          <Label className="text-white/90" htmlFor="category">
            Category
          </Label>
          <Input
            id="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            required
            className="input-glass text-white"
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label className="text-white/90" htmlFor="difficulty">
            Difficulty
          </Label>
          <select
            id="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
            className="input-glass pl-3 text-white h-11 rounded-lg">
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </LabelInputContainer>
        <LabelInputContainer>
          <Label className="text-white/90" htmlFor="tags">
            Tags (comma separated)
          </Label>
          <Input
            id="tags"
            type="text"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., react, hooks"
            className="input-glass text-white"
          />
        </LabelInputContainer>
      </div>
      <div>
        <Label className="block text-lg font-medium text-white/90 mb-3">
          Answer Content
        </Label>
        <div className="space-y-6">
          {formData.answerContent.map((block, index) => (
            <div
              key={index}
              className="glass-card rounded-lg p-4 border border-white/10 relative pt-6">
              <Label className="absolute top-1 left-3 text-white/60 text-xs uppercase font-semibold tracking-wider">
                {block.type}
              </Label>
              <ContentBlockInputs
                block={block}
                index={index}
                onChange={handleBlockChange}
              />
              {formData.answerContent.length > 1 && (
                <button
                  type="button"
                  onClick={() => deleteBlock(index)}
                  className="absolute -top-3 -right-3 p-1.5 bg-red-600 rounded-full text-white hover:bg-red-500 transition-all shadow-md"
                  aria-label="Delete block">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            type="button"
            onClick={() => addBlock('paragraph')}
            className="btn-glass flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/90 hover:text-white cursor-pointer hover:scale-105 active:scale-95 text-sm">
            <Plus size={14} /> Paragraph
          </button>
          <button
            type="button"
            onClick={() => addBlock('heading')}
            className="btn-glass flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/90 hover:text-white cursor-pointer hover:scale-105 active:scale-95 text-sm">
            <Plus size={14} /> Heading
          </button>
          <button
            type="button"
            onClick={() => addBlock('code')}
            className="btn-glass flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/90 hover:text-white cursor-pointer hover:scale-105 active:scale-95 text-sm">
            <Plus size={14} /> Code
          </button>
          <button
            type="button"
            onClick={() => addBlock('list')}
            className="btn-glass flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/90 hover:text-white cursor-pointer hover:scale-105 active:scale-95 text-sm">
            <Plus size={14} /> List
          </button>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/10 mt-6">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-white/10 hover:bg-white/20 border border-white/20 h-10 px-6 rounded-lg text-white font-medium cursor-pointer transition-all">
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-white/10 hover:bg-white/20 border border-white/20 h-10 px-6 rounded-lg text-white font-medium cursor-pointer transition-all">
          {' '}
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}{' '}
          {isSubmitting
            ? 'Submitting...'
            : question
            ? 'Update Question'
            : 'Add Question'}
        </button>
      </div>
    </form>
  );
}

const LabelInputContainer = ({ children, className }) => (
  <div className={cn('flex w-full flex-col space-y-2', className)}>
    {children}
  </div>
);
