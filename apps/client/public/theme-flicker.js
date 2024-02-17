const setTheme = () => {
  let theme = localStorage.getItem('theme');

  if (!theme || theme == 'device')
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  if (theme == 'dark')
    document.querySelector('html').style.backgroundColor = '#1a1a1a';

  document.documentElement.classList.toggle('dark', theme == 'dark');
};
setTheme();
