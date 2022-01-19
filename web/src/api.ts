import { QuizPage } from './types';

async function getJson<T extends unknown>(url: string) {
	const response = await fetch(url);
	const json = await response.json() as T;
	return json;
}


export const fetchQuizPage = () =>
	getJson<QuizPage>("https://raw.githubusercontent.com/gebeto/grammarify/main/tests/articles-exercise-1.json?token=GHSAT0AAAAAABQDMZOXJCTM6O6EVGGBNP42YPRXUFA");
