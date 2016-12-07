import { EditorState } from 'draft-js';
import replaceText from './replaceText';

const changeCurrentBlockType = (editorState, type, text = '', blockMetadata = {}) => {
  const newEditorState = replaceText(editorState, text);
  const currentContent = newEditorState.getCurrentContent();
  const selection = editorState.getSelection();
  const key = selection.getStartKey();
  const blockMap = currentContent.getBlockMap();
  const block = blockMap.get(key);
  let data = block.getData();
  if (data && data.merge) {
    data = data.merge(blockMetadata);
  }
  const newBlock = block.merge({ type, data });
  const newSelection = selection.merge({
    anchorOffset: 0,
    focusOffset: 0,
  });
  const newContentState = currentContent.merge({
    blockMap: blockMap.set(key, newBlock),
    selectionAfter: newSelection,
  });
  return EditorState.push(
    newEditorState,
    newContentState,
    'change-block-type'
  );
};

export default changeCurrentBlockType;
