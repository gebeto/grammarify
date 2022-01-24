import { ContentsResponse, QuizPage } from './types';


export async function getJson<T extends unknown>(url: string) {
	const response = await fetch(url);
	const json = await response.json() as T;
	return json;
}


export const fetchQuizPage = (key: string) =>
	getJson<QuizPage>(`https://raw.githubusercontent.com/gebeto/grammarify/main/data/${key}.json`);


export const fetchContents = () =>
	getJson<ContentsResponse>("https://raw.githubusercontent.com/gebeto/grammarify/main/data/contents.json");
