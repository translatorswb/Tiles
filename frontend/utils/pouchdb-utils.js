export function getDatabaseName(location, campId, dbName) {
	if (!location || !dbName) return null;
	if (dbName === "recordings") {
		if (location === "local") {
			return `${dbName}`;
		} else if (location === "remote") {
			return `${process.env.databaseBaseUrl}/${dbName}`;
		}
	}
	if (!campId) return null;
	if (location === "local") {
		return `${campId}_${dbName}`;
	} else if (location === "remote") {
		return `${process.env.databaseBaseUrl}/${campId}_${dbName}`;
	}
}

export function generateDocId() {
	return new Date().toISOString();
}

export function filterLocaleDocs(docs, locale) {
	// Since we clone the databases we get the design docs as well
	const noDesignDocs = docs.filter(doc => {
		return !doc._id.includes("_design") ? doc : NaN;
	});
	return noDesignDocs.filter(doc => {
		return !!doc.title[locale];
	});
}

export function hasAudio(doc, locale) {
	const files = Object.entries(doc._attachments);
	for (const file of files) {
		if (isAudio(file) && matchesLocale(file, locale)) return file[0];
	}
	return false;
}

export function getAudio(doc, locale) {
	const files = Object.entries(doc._attachments);
	for (const file of files) {
		if (isAudio(file) && matchesLocale(file, locale)) return file[1].data;
	}
	return null;
}

export function getAuthorImage(doc) {
	const files = Object.entries(doc._attachments);
	for (const file of files) {
		if (file[0].split(".")[0] === "author") return file[1].data;
	}
	return null;
}

export function getAssets(doc) {
	const files = Object.entries(doc._attachments);
	const assets = {};
	files.forEach(file => {
		if (!isMarkdown(file) && !isAudio(file)) {
			assets[file[0]] = file[1];
		}
	});
	return assets;
}

function isMarkdown(file) {
	return file[1].content_type.startsWith("text/markdown");
}

function isAudio(file) {
	return file[1].content_type.startsWith("audio/");
}

function matchesLocale(file, locale) {
	return file[0].split(".")[0] === locale;
}
