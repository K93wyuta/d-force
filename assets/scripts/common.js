// ディレクトリ階層をカウント
const pathDepth = location.pathname
  .split('/')
  .filter(segment => segment && !segment.includes('.html'))
  .length;

// ベースパスの作成
const basePath = '../'.repeat(pathDepth);

// ヘッダーを挿入する関数
function loadHeader() {
  // 'header.html'を取得
  fetch(`${basePath}common/header.html`)
    .then(response => response.text())
    .then(data => {
      const headerElement = document.querySelector('header');
      headerElement.innerHTML = data;

      // ▼ src/href のパスを補正（画像・リンク用）
      headerElement.querySelectorAll('[src], [href]').forEach(el => {
        if (el.hasAttribute('src')) {
          const src = el.getAttribute('src');
          if (!src.startsWith('http') && !src.startsWith('/') && !src.startsWith(basePath)) {
            el.setAttribute('src', basePath + src);
          }
        }
        if (el.hasAttribute('href')) {
          const href = el.getAttribute('href');
          if (!href.startsWith('http') && !href.startsWith('/') && !href.startsWith(basePath)) {
            el.setAttribute('href', basePath + href);
          }
        }
      });

      // ヘッダー表示/非表示の処理（スクロールによる制御）
      let lastScrollY = window.scrollY;

      window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY) {
          headerElement.classList.add('hidden'); // 下スクロールで非表示
        } else {
          headerElement.classList.remove('hidden'); // 上スクロールで表示
        }
        lastScrollY = window.scrollY;
      });

      // ハンバーガーメニューの開閉処理
      const toggle = document.querySelector('.header_nav_toggle');
      const spNav = document.querySelector('.header_nav');
      const closeBtn = document.querySelector('.header_nav_close');

      if (toggle && spNav) {
        toggle.addEventListener('click', () => {
          spNav.classList.toggle('active');
          document.body.style.overflow = spNav.classList.contains('active') ? 'hidden' : '';
        });
      }

      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          spNav.classList.remove('active');
          document.body.style.overflow = '';
        });
      }
    })
    .catch(error => console.error('Error loading header:', error));
}

// フッターを挿入する関数
function loadFooter() {
  fetch(`${basePath}common/footer.html`)
    .then(response => response.text())
    .then(data => {
      const footerElement = document.querySelector('footer');
      footerElement.innerHTML = data;

      // フッター内の src/href も補正
      footerElement.querySelectorAll('[src], [href]').forEach(el => {
        if (el.hasAttribute('src')) {
          const src = el.getAttribute('src');
          if (!src.startsWith('http') && !src.startsWith('/') && !src.startsWith(basePath)) {
            el.setAttribute('src', basePath + src);
          }
        }
        if (el.hasAttribute('href')) {
          const href = el.getAttribute('href');
          if (!href.startsWith('http') && !href.startsWith('/') && !href.startsWith(basePath)) {
            el.setAttribute('href', basePath + href);
          }
        }
      });
    })
    .catch(error => console.error('Error loading footer:', error));
}

// ページがロードされた後に実行
document.addEventListener('DOMContentLoaded', () => {
  loadHeader();  // ヘッダーを挿入
  loadFooter();  // フッターを挿入
});
