from xml.parsers.expat import ParserCreate
from urllib.request import urlopen
from urllib.parse import urlparse, urlsplit
import json
import os


ROOT_PATH = "packages/data-parser/data"
INDEX_PATH = f"{ROOT_PATH}/index.json"
CONTENTS_PATH = f"{ROOT_PATH}/contents.json"
FILE_PATH = lambda key: f"{ROOT_PATH}/{key}.json"


class MyParser:
	def __init__(self):
		self.items = []

	def __call__(self, value):
		_value = value.strip()
		if _value and _value.endswith(".html"):
			self.items.append(_value)


def get_all_pages():
	parser = ParserCreate()
	parser.CharacterDataHandler = MyParser()
	res = urlopen("https://www.perfect-english-grammar.com/B30YQJnY.xml").read()
	parser.Parse(res)
	return parser.CharacterDataHandler.items


def load_all_pages():
	pages = get_all_pages()
	json.dump(pages, open(INDEX_PATH, "w"), indent=4)


def get_page_title(url):
	_url = urlparse(url)
	root, file = os.path.split(_url.path)
	name, ext = os.path.splitext(file)
	return name


def get_page_data(url):
	res = urlopen(url).read()
	try:
		data = res.decode("utf-8")\
			.split('<script id="sourceData" type="application/json">')[1]\
			.split('</script>')[0]
		return json.loads(data)
	except:
		pass
	return None


def parse_tests():
	urls = json.load(open(INDEX_PATH))
	for url in urls:
		filename = get_page_title(url)
		data = get_page_data(url)
		if data:
			print(filename)
			json.dump(data, open(FILE_PATH(filename), "w"), indent=4)


def generate_contents():
	urls = json.load(open(INDEX_PATH))
	result = []
	for url in urls:
		filename = get_page_title(url)
		filepath = FILE_PATH(filename)
		if os.path.exists(filepath):
			data = json.load(open(filepath))
			result.append({
				"key": filename,
				"title": data["title"],
				"description": data["description"],
			})
	json.dump(result, open(CONTENTS_PATH, "w"), indent=4)

generate_contents()