import { ContentsResponse, QuizPage } from './types';


async function getJson<T extends unknown>(url: string) {
	const response = await fetch(url);
	const json = await response.json() as T;
	return json;
}


export const fetchQuizPage = () =>
	getJson<QuizPage>("https://raw.githubusercontent.com/gebeto/grammarify/main/data/a-little-a-few-exercise-1.json?token=GHSAT0AAAAAABQDMZOXFXTQYDEFTIRR7AZQYPWXEIA");


export const fetchContents = () =>
	getJson<ContentsResponse>("https://raw.githubusercontent.com/gebeto/grammarify/main/data/contents.json?token=GHSAT0AAAAAABQDMZOX4MVU3STCTFXNPB7SYPWXFEQ");
