import "@wangeditor/editor/dist/css/style.css";

import { useState, useEffect } from "react";
import { Editor } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig } from "@wangeditor/editor";

interface RichEditorReaderProps {
  htmlValue: string;
}

function RichReader(props: RichEditorReaderProps) {
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  const editorConfig: Partial<IEditorConfig> = {
    readOnly: true
  };

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <Editor
      value={props.htmlValue}
      defaultConfig={editorConfig}
      mode="default"
      style={{ margin: "0px", padding: "0px", width: "100%"  }}
    />
  );
}

export default RichReader;
