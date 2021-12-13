export function decodeJwt(token) {
	try {
		var base64Payload = token.split('.')[1];
		var payload = Buffer.from(base64Payload, 'base64');
		return JSON.parse(payload.toString());
	} catch (e) {
		return null;
	}
};
export function getField(formRef, keys) {
	if (keys instanceof Array) {
		return keys.reduce((acc, key) => ({ ...acc, [key]:formRef.current[key].value }), {});
	}
	return formRef.current[keys].value;
}