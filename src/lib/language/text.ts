import { Language, LanguageId } from '.';

const TextLanguage: Language = {
  id: LanguageId.Text,
  name: 'Text',
  fileExtension: '.txt',
  bojRuntimes: [
    {
      name: 'Text',
      compileCommand: `fromdos Main.txt`,
      executeCommand: `cat Main.txt`,
      version: `cat (GNU coreutils) 8.25`,
    },
  ],
};

export default TextLanguage;
