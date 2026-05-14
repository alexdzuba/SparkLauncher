(function(){
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function showToast(message){
    let toast = $('.toast');
    if(!toast){
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(window.__sparkToastTimer);
    window.__sparkToastTimer = window.setTimeout(() => toast.classList.remove('show'), 3200);
  }

  function setActiveNav(){
    const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    $$('.nav-links a').forEach(link => {
      const href = (link.getAttribute('href') || '').split('#')[0].toLowerCase();
      if(href === current || (current === '' && href === 'index.html')) link.classList.add('active');
    });
  }

  function initMobileMenu(){
    const btn = $('[data-menu-toggle]');
    const menu = $('[data-menu]');
    if(!btn || !menu) return;
    btn.addEventListener('click', () => {
      menu.classList.toggle('open');
      btn.textContent = menu.classList.contains('open') ? 'Закрыть' : 'Меню';
    });
  }

  function initDemoButtons(){
    $$('[data-toast]').forEach(btn => {
      btn.addEventListener('click', () => showToast(btn.dataset.toast || 'Кнопка работает'));
    });

    $$('[data-download-toast]').forEach(link => {
      link.addEventListener('click', () => showToast('Скачивание демо-болванки Spark Launcher началось.'));
    });
  }

  function initLibraryFilters(){
    const buttons = $$('.filter-btn');
    const games = $$('.library-game');
    if(!buttons.length || !games.length) return;

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        buttons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        games.forEach(game => {
          const platform = game.dataset.platform;
          const visible = filter === 'all' || platform === filter;
          game.style.display = visible ? 'flex' : 'none';
        });
        showToast('Фильтр библиотеки применён: ' + button.textContent.trim());
      });
    });
  }

  function initFaq(){
    $$('.faq-q').forEach(button => {
      button.addEventListener('click', () => {
        const item = button.closest('.faq-item');
        item.classList.toggle('open');
      });
    });
  }

  function initSupportForm(){
    const form = $('[data-support-form]');
    if(!form) return;
    form.addEventListener('submit', event => {
      event.preventDefault();
      form.reset();
      showToast('Сообщение отправлено в демо-режиме. На реальном сайте тут будет заявка в поддержку.');
    });
  }

  function initCompatibility(){
    const button = $('[data-check-compat]');
    const result = $('[data-compat-result]');
    if(!button || !result) return;
    button.addEventListener('click', () => {
      const ua = navigator.userAgent;
      const isWindows = /Windows/i.test(ua);
      result.textContent = isWindows
        ? 'Совместимость: Windows обнаружен. Spark Launcher Demo подходит для показа на зачёте.'
        : 'Совместимость: сайт открыт не с Windows, но демо-файл всё равно можно скачать.';
      showToast('Проверка совместимости выполнена.');
    });
  }

  function initCopyButtons(){
    $$('[data-copy]').forEach(button => {
      button.addEventListener('click', async () => {
        const text = button.dataset.copy;
        try{
          await navigator.clipboard.writeText(text);
          showToast('Скопировано: ' + text);
        }catch(e){
          showToast('Текст для копирования: ' + text);
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    initMobileMenu();
    initDemoButtons();
    initLibraryFilters();
    initFaq();
    initSupportForm();
    initCompatibility();
    initCopyButtons();
  });
})();
