export function generateDocId() {
  return new Date().toISOString();
}

export function filterLocaleDocs(docs, locale) {
  return docs.filter(doc => {
    const files = Object.entries(doc._attachments);
    for (const file of files) {
      if (isMarkdown(file) && matchesLocale(file, locale)) return true;
    }
    return false;
  });
}

export function hasAudio(doc, locale) {
  const files = Object.entries(doc._attachments);
  for (const file of files) {
    if (isAudio(file) && matchesLocale(file, locale)) return true;
  }
  return false;
}

export function processAttachments(attachments, locale) {
  const files = Object.entries(attachments);
  let md;
  let audio;
  const others = [];
  files.forEach(file => {
    if (isMarkdown(file)) {
      if (!md && matchesLocale(file, locale)) {
        md = file[0];
      }
    } else if (isAudio) {
      if (!audio && matchesLocale(file, locale)) {
        audio = file[0];
      }
    } else {
      others.push(file[0]);
    }
  });

  return {
    md,
    audio,
    others
  };
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
