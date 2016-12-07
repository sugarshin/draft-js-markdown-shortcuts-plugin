import { EditorState, SelectionState, Modifier } from 'draft-js';

const replaceText = (editorState, text) => {
  const content = editorState.getCurrentContent();
  const startKey = editorState.getSelection().getStartKey();
  const block = content.getBlockMap().get(startKey);

  const key = block.getKey();
  const length = block.getLength();
  const rangeToReplace = new SelectionState({
    anchorKey: key,
    anchorOffset: 0,
    focusKey: key,
    focusOffset: length,
  });

  const newContent = Modifier.replaceText(
    content,
    rangeToReplace,
    text,
    editorState.getCurrentInlineStyle()
  );

  return EditorState.push(
    editorState,
    newContent,
    'replace-text'
  );
};

export default replaceText;
