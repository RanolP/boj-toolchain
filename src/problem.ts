import { lstat, readdir, readFile } from './better-fs';
import { join, basename, parse } from 'path';
import { ROOT } from './constants';

const PROBLEM_NUMBER_REGEX = /^[0-9]+$/;

let problems: Problem[] | null = null;

export async function getProblemList(): Promise<Problem[]> {
  if (problems) {
    return problems;
  }
  const result = [];
  const fileList = await readdir(ROOT);
  for (const file of fileList) {
    const fetchedStat = await lstat(join(ROOT, file));
    if (fetchedStat.isFile()) {
      continue;
    }
    const folderBasename = basename(file);
    if (PROBLEM_NUMBER_REGEX.test(folderBasename)) {
      const problem = new Problem(Number(folderBasename));
      await problem.initialize();
      result.push(problem);
    }
  }
  problems = result;
  return result;
}

interface ProblemMeta {
  date: string;
  lastUpdate: string;
  status: 'solved' | 'in-progress' | 'dropped' | 'solved-timeout' | 'timeout';
  order: number;
}

export class Problem {
  private _meta: ProblemMeta | null = null;
  constructor(public readonly id: number) {}

  async initialize() {
    this._meta = JSON.parse(
      await readFile(join(ROOT, this.id.toString(), 'meta.json'), {
        encoding: 'utf-8',
      })
    ) as ProblemMeta;
    return this._meta;
  }

  async getSolutions(): Promise<string[]> {
    const result = [];
    const fileList = await readdir(join(ROOT, this.id.toString()));
    for (const file of fileList) {
      const fetchedStat = await lstat(join(ROOT, this.id.toString(), file));
      if (fetchedStat.isDirectory()) {
        continue;
      }
      const filename = parse(file).name;
      if (filename !== 'solution') {
        continue;
      }
      result.push(file);
    }
    return result;
  }

  get meta(): ProblemMeta {
    return this._meta!;
  }
}
