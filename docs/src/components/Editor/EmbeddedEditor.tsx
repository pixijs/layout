import { Editor, type EditorProps } from './Editor';

export function EmbeddedEditor(props: EditorProps) {
    return <Editor height={400} width={700} viewType="preview" {...props} />;
}
