import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { Bold, Italic, Heading3, Quote, Code, List, ListOrdered, Undo, Redo, Image as ImageIcon, Table as TableIcon } from 'lucide-react';
import { t } from '@/lib/design';

const RichTextEditor = ({ content, onChange }: { content: string, onChange: (html: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true, allowBase64: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none w-full p-6 font-sans text-ink min-h-[400px]',
        style: 'color: #1c1916; font-family: var(--font-sans), sans-serif; line-height: 1.8;',
      },
    },
  });

  // Keep editor content in sync if changed from outside (e.g. switching docs)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div style={{ border: `1px solid ${t.border}`, borderRadius: 12, overflow: 'hidden', background: t.bgSurface }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 4, padding: 8, background: t.bgMuted, borderBottom: `1px solid ${t.borderFaint}` }}>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          style={{ padding: 8, background: editor.isActive('heading', { level: 3 }) ? t.border : 'transparent', border: 'none', color: t.ink, cursor: 'pointer', borderRadius: 6 }}
        ><Heading3 size={16}/></button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
          style={{ padding: 8, background: editor.isActive('bold') ? t.border : 'transparent', border: 'none', color: t.ink, cursor: 'pointer', borderRadius: 6 }}
        ><Bold size={16}/></button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          style={{ padding: 8, background: editor.isActive('italic') ? t.border : 'transparent', border: 'none', color: t.ink, cursor: 'pointer', borderRadius: 6 }}
        ><Italic size={16}/></button>
        <div style={{ width: 1, height: 20, background: t.borderFaint, margin: '0 4px' }} />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          style={{ padding: 8, background: editor.isActive('bulletList') ? t.border : 'transparent', border: 'none', color: t.ink, cursor: 'pointer', borderRadius: 6 }}
        ><List size={16}/></button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
          style={{ padding: 8, background: editor.isActive('orderedList') ? t.border : 'transparent', border: 'none', color: t.ink, cursor: 'pointer', borderRadius: 6 }}
        ><ListOrdered size={16}/></button>
        <div style={{ width: 1, height: 20, background: t.borderFaint, margin: '0 4px' }} />
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
          style={{ padding: 8, background: editor.isActive('blockquote') ? t.border : 'transparent', border: 'none', color: t.ink, cursor: 'pointer', borderRadius: 6 }}
        ><Quote size={16}/></button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
          style={{ padding: 8, background: editor.isActive('codeBlock') ? t.border : 'transparent', border: 'none', color: t.ink, cursor: 'pointer', borderRadius: 6 }}
        ><Code size={16}/></button>
        <div style={{ width: 1, height: 20, background: t.borderFaint, margin: '0 4px' }} />
        
        /* Table Controls */
        {editor.isActive('table') ? (
          <>
            <button onClick={() => editor.chain().focus().addColumnBefore().run()} style={{ padding: 6, fontSize: 11, fontFamily: t.mono, background: 'transparent', border: 'none', color: t.ink, cursor: 'pointer' }}>+ Col L</button>
            <button onClick={() => editor.chain().focus().addColumnAfter().run()} style={{ padding: 6, fontSize: 11, fontFamily: t.mono, background: 'transparent', border: 'none', color: t.ink, cursor: 'pointer' }}>+ Col R</button>
            <button onClick={() => editor.chain().focus().deleteColumn().run()} style={{ padding: 6, fontSize: 11, fontFamily: t.mono, background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>- Col</button>
            <div style={{ width: 1, height: 16, background: t.borderFaint, margin: '0 4px' }} />
            <button onClick={() => editor.chain().focus().addRowBefore().run()} style={{ padding: 6, fontSize: 11, fontFamily: t.mono, background: 'transparent', border: 'none', color: t.ink, cursor: 'pointer' }}>+ Row U</button>
            <button onClick={() => editor.chain().focus().addRowAfter().run()} style={{ padding: 6, fontSize: 11, fontFamily: t.mono, background: 'transparent', border: 'none', color: t.ink, cursor: 'pointer' }}>+ Row D</button>
            <button onClick={() => editor.chain().focus().deleteRow().run()} style={{ padding: 6, fontSize: 11, fontFamily: t.mono, background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>- Row</button>
            <div style={{ width: 1, height: 16, background: t.borderFaint, margin: '0 4px' }} />
            <button onClick={() => editor.chain().focus().deleteTable().run()} style={{ padding: 6, fontSize: 11, fontFamily: t.mono, background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>Del Table</button>
          </>
        ) : (
          <button
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            style={{ padding: 8, background: 'transparent', border: 'none', color: t.ink, cursor: 'pointer', borderRadius: 6 }}
            title="Insert Table"
          ><TableIcon size={16}/></button>
        )}

        {/* Image Upload (Basic URL Prompt for now, can be wired to actual upload) */}
        <button
          onClick={() => {
            const url = window.prompt('URL');
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          style={{ padding: 8, background: 'transparent', border: 'none', color: t.ink, cursor: 'pointer', borderRadius: 6 }}
          title="Insert Image URL"
        ><ImageIcon size={16}/></button>

        <div style={{ flex: 1 }} />
        <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} style={{ padding: 8, background: 'transparent', border: 'none', color: editor.can().undo() ? t.ink : t.inkFaint, cursor: editor.can().undo() ? 'pointer' : 'default', borderRadius: 6 }}><Undo size={16}/></button>
        <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} style={{ padding: 8, background: 'transparent', border: 'none', color: editor.can().redo() ? t.ink : t.inkFaint, cursor: editor.can().redo() ? 'pointer' : 'default', borderRadius: 6 }}><Redo size={16}/></button>
      </div>

      <div className="admin-editor-content">
        <EditorContent editor={editor} />
      </div>

      <style>{`
        /* Minimal styling for the editor content specifically */
        .admin-editor-content .ProseMirror { outline: none; }
        .admin-editor-content .ProseMirror p { margin-top: 0.5em; margin-bottom: 0.5em; }
        .admin-editor-content .ProseMirror h3 { font-family: var(--font-serif); font-size: 1.5rem; margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 500; }
        .admin-editor-content .ProseMirror blockquote { border-left: 3px solid var(--border); padding-left: 1rem; color: var(--ink-muted); font-style: italic; }
        .admin-editor-content .ProseMirror pre { background: var(--bg-muted); padding: 1rem; border-radius: 8px; font-family: var(--font-mono); font-size: 0.9em; overflow-x: auto; }
        .admin-editor-content .ProseMirror img { max-width: 100%; height: auto; border-radius: 8px; border: 1px solid var(--border); }
        .admin-editor-content .ProseMirror table { border-collapse: collapse; table-layout: fixed; width: 100%; margin: 0; overflow: hidden; border: 1px solid var(--border); border-radius: 8px; }
        .admin-editor-content .ProseMirror table td, .admin-editor-content .ProseMirror table th { min-width: 1em; border: 1px solid var(--border); padding: 8px 12px; vertical-align: top; box-sizing: border-box; position: relative; }
        .admin-editor-content .ProseMirror table th { background-color: var(--bg-muted); font-weight: 500; text-align: left; }
        .admin-editor-content .ProseMirror .column-resize-handle { position: absolute; right: -2px; top: 0; bottom: -2px; width: 4px; background-color: var(--accent); pointer-events: none; }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
