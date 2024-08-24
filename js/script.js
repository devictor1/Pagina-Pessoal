async function translateText(lang) {
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, span');

  for (const element of textElements) {
    const text = element.textContent;
    const translation = await translateWithGoogleAPI(text, lang);

    element.textContent = translation;
  }
}

async function translateWithGoogleAPI(text, lang) {
  const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY`, {
    method: 'POST',
    body: JSON.stringify({
      q: text,
      target: lang,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data.data.translations[0].translatedText;
}
