'use client';

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  Pilcrow,
  Quote,
  Code,
  List,
  ListOrdered,
  Undo,
  Redo,
  Image as ImageIcon,
  Table as TableIcon,
} from 'lucide-react';

type ToolbarButtonProps = {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
};

function ToolbarButton({ onClick, active, disabled, title, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onClick={onClick}
      className={`p-2 rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35] disabled:opacity-40 ${
        active ? 'bg-[rgba(22,22,22,0.10)] text-[#161616]' : 'text-[#6F6A61] hover:bg-white hover:text-[#161616]'
      }`}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-5 bg-[rgba(22,22,22,0.08)] mx-0.5" aria-hidden />;
}

const RichTextEditor = ({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
}) => {
  const [inTable, setInTable] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({ inline: true, allowBase64: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
      setInTable(ed.isActive('table'));
    },
    onSelectionUpdate: ({ editor: ed }) => {
      setInTable(ed.isActive('table'));
    },
    editorProps: {
      attributes: {
        class:
          'admin-editor-prose max-w-[720px] mx-auto focus:outline-none w-full px-6 py-5 font-sans text-[16px] text-[#161616] min-h-[520px]',
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="rounded-xl border border-[rgba(22,22,22,0.10)] overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#FF6B35]/20 focus-within:border-[#FF6B35]/40 transition-shadow">
      <div className="flex flex-wrap items-center gap-0.5 p-2 bg-[#F0EBE0] border-b border-[rgba(22,22,22,0.06)]">
        <ToolbarButton
          title="Heading 2"
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 size={17} />
        </ToolbarButton>
        <ToolbarButton
          title="Heading 3"
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 size={17} />
        </ToolbarButton>
        <ToolbarButton
          title="Paragraph"
          active={editor.isActive('paragraph')}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <Pilcrow size={17} />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          title="Bold"
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={17} />
        </ToolbarButton>
        <ToolbarButton
          title="Italic"
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={17} />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          title="Bullet list"
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={17} />
        </ToolbarButton>
        <ToolbarButton
          title="Numbered list"
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={17} />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          title="Blockquote"
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote size={17} />
        </ToolbarButton>
        <ToolbarButton
          title="Code block"
          active={editor.isActive('codeBlock')}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code size={17} />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          title="Insert image URL"
          onClick={() => {
            const url = window.prompt('Insert image URL');
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
        >
          <ImageIcon size={17} />
        </ToolbarButton>
        {!inTable && (
          <ToolbarButton
            title="Insert table"
            onClick={() =>
              editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
            }
          >
            <TableIcon size={17} />
          </ToolbarButton>
        )}

        <div className="flex-1" />

        <ToolbarButton
          title="Undo"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo size={17} />
        </ToolbarButton>
        <ToolbarButton
          title="Redo"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo size={17} />
        </ToolbarButton>
      </div>

      {inTable && (
        <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 bg-[#F7F3EA] border-b border-[rgba(22,22,22,0.06)]">
          <span className="font-sans text-[12px] text-[#9A9489] mr-2">Table</span>
          {[
            { label: 'Add column left', run: () => editor.chain().focus().addColumnBefore().run() },
            { label: 'Add column right', run: () => editor.chain().focus().addColumnAfter().run() },
            { label: 'Delete column', run: () => editor.chain().focus().deleteColumn().run(), danger: true },
            { label: 'Add row above', run: () => editor.chain().focus().addRowBefore().run() },
            { label: 'Add row below', run: () => editor.chain().focus().addRowAfter().run() },
            { label: 'Delete row', run: () => editor.chain().focus().deleteRow().run(), danger: true },
            { label: 'Delete table', run: () => editor.chain().focus().deleteTable().run(), danger: true },
          ].map((action) => (
            <button
              key={action.label}
              type="button"
              title={action.label}
              aria-label={action.label}
              onClick={action.run}
              className={`px-2 py-1 rounded font-sans text-[12px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35] ${
                action.danger
                  ? 'text-red-600 hover:bg-red-50'
                  : 'text-[#6F6A61] hover:bg-white hover:text-[#161616]'
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      <div className="admin-editor-content">
        <EditorContent editor={editor} />
      </div>

      <style>{`
        .admin-editor-content .ProseMirror { outline: none; }
        .admin-editor-content .ProseMirror p { margin: 0.65em 0; line-height: 1.75; }
        .admin-editor-content .ProseMirror h2 { font-family: var(--font-heading), var(--font-sans), sans-serif; font-size: 1.5rem; margin: 1.25em 0 0.5em; font-weight: 500; line-height: 1.25; }
        .admin-editor-content .ProseMirror h3 { font-family: var(--font-heading), var(--font-sans), sans-serif; font-size: 1.25rem; margin: 1.1em 0 0.4em; font-weight: 500; line-height: 1.3; }
        .admin-editor-content .ProseMirror blockquote { border-left: 3px solid rgba(22,22,22,0.12); padding-left: 1rem; color: #6F6A61; font-style: italic; margin: 1em 0; }
        .admin-editor-content .ProseMirror pre { background: #F0EBE0; padding: 1rem; border-radius: 8px; font-family: var(--font-mono); font-size: 0.9em; overflow-x: auto; border: 1px solid rgba(22,22,22,0.06); }
        .admin-editor-content .ProseMirror img { max-width: 100%; height: auto; border-radius: 8px; border: 1px solid rgba(22,22,22,0.10); }
        .admin-editor-content .ProseMirror table { border-collapse: collapse; table-layout: fixed; width: 100%; margin: 1em 0; overflow: hidden; border: 1px solid rgba(22,22,22,0.10); border-radius: 8px; }
        .admin-editor-content .ProseMirror table td, .admin-editor-content .ProseMirror table th { min-width: 1em; border: 1px solid rgba(22,22,22,0.10); padding: 8px 12px; vertical-align: top; }
        .admin-editor-content .ProseMirror table th { background-color: #F0EBE0; font-weight: 500; text-align: left; }
        .admin-editor-content .ProseMirror .column-resize-handle { position: absolute; right: -2px; top: 0; bottom: -2px; width: 4px; background-color: #FF6B35; pointer-events: none; }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
