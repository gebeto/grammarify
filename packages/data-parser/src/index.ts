import { ContentsResponse, QuizPage } from './types';


export const files = import.meta.glob(`../data/*.json`);

export async function getJson<T extends unknown>(url: string) {
	const key = `../data/${url}`;
	console.log(" >>> SSS", key, files);
	const loadFile = files[key];
	return await loadFile().then(res => res.default) as T;
}

export const fetchQuizPage = (key: string) => getJson<QuizPage>(`${key}.json`);
export const fetchContents = () => getJson<ContentsResponse>('contents.json');
