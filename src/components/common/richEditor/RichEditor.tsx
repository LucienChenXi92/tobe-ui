import "@wangeditor/editor/dist/css/style.css";

import { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import { useTranslation } from "react-i18next";

interface RichEditorProps {
  htmlValue: string;
  textValue: string;
  setHtmlValue: (value: string) => void;
  setTextValue: (value: string) => void;
}

function RichEditor(props: RichEditorProps) {
  const { t } = useTranslation();
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: [
      "bgColor",
      "fontSize",
      "fontFamily",
      "lineHeight",
      "group-video",
      "uploadImage",
      "fullScreen",
      "emotion",
    ],
  };

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: t("components.rich-editor.placeholder"),
  };

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.12)",
        borderRadius: "4px",
        zIndex: 100,
        margin: 0,
        width: "100%",
      }}
    >
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        style={{
          borderBottom: "1px solid rgba(0,0,0,0.12)",
          width: "100%",
          borderRadius: "4px",
        }}
      />
      <Editor
        defaultConfig={editorConfig}
        value={props.htmlValue}
        onCreated={setEditor}
        onChange={(editor) => {
          props.setHtmlValue(editor.getHtml());
          props.setTextValue(editor.getText());
        }}
        mode="default"
        style={{ height: "500px", overflowY: "hidden", width: "100%" }}
      />
    </div>
  );
}

export default RichEditor;
