import { Rule } from '..';
import { getProblemList } from '../../../lib/problem';
import dedent from 'dedent';
import { parse } from 'path';
import { Languages } from '../../../util/language';

const ExtensionLanguageNameMap: Record<string, string> = Object.fromEntries(
  Languages.map(({ name, fileExtension }) => [fileExtension, name]),
);

export const LanguageUsageRule: Rule = {
  name: 'language-usage',
  type: 'root',
  isBlock: true,
  async execute(): Promise<string> {
    const problemList = await getProblemList();
    const solutions = (
      await Promise.all(
        problemList
          .filter((problem) => problem.isSolved)
          .map((problem) => problem.getSolutionList()),
      )
    ).flat();
    const ratio = solutions
      .map((solutionPath) => parse(solutionPath).ext)
      .reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: curr in acc ? acc[curr] + 1 : 1,
        }),
        {} as Record<string, number>,
      );

    return [
      dedent`
        | 언어 | 사용 비율 |
        | ---- | --------- |
      `,
    ]
      .concat(
        Object.entries(ratio).map(
          ([ext, count]) => dedent`
        | ${
          ExtensionLanguageNameMap[ext] || 'Unknown'
        } (${ext}) | ${count} of ${solutions.length} (${(
            (count / solutions.length) *
            100
          ).toFixed(2)}%) |
      `,
        ),
      )
      .join('\n');
  },
};
