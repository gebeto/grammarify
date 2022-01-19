from xml.parsers.expat import ParserCreate
from urllib.request import urlopen
from urllib.parse import urlparse, urlsplit
import json
import os


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
	json.dump(pages, open("tests/index.json", "w"), indent=4)


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
	urls = json.load(open("tests/index.json"))
	for url in urls:
		filename = get_page_title(url)
		data = get_page_data(url)
		if data:
			print(filename)
			json.dump(data, open(f"tests/{filename}.json", "w"), indent=4)


parse_tests()