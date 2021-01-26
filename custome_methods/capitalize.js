export function capitalize(str) {
	const string = str.split(' ');
	let output = '';
	string.map((item, index) => {
		if (index == 0) {
			output = item.charAt(0).toUpperCase() + item.slice(1);
		} else {
			output += ' ';
			output += item.charAt(0).toUpperCase() + item.slice(1);
		}
	});
	return output;
}
