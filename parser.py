from xml.parsers.expat import ParserCreate
from urllib.request import urlopen


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


pages = get_all_pages()
print(pages[0])