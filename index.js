(async () => {
  try {
    const data = await page.evaluate(() => ({
      title: document.title,
      h1: document.querySelector('h1')?.innerText || ''
    }));

    let name = (data.h1 || data.title).split('|')[0].split('-')[0].trim();
    if (name.length < 3 || name.length > 50) {
      name = url.replace('https://', '').replace('http://', '');
    }

    const slug = url.replace(/https?:\/\/(www\.)?/, '').split('/')[0].replace(/[^a-zA-Z0-9]/g, '-');

    fs.writeFileSync(path.join(__dirname, slug + '.json'), JSON.stringify({ name, ...data }, null, 2));
    console.log('SAVED', slug + '.json', 'as', name);

  } catch (e) {
    console.log('FAIL', url, e.message);
  }

  await browser.close();
  console.log('DONE');
})();

