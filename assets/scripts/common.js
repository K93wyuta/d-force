// ヘッダーを挿入する関数
function loadHeader() {
  // 'header.html'を取得
  fetch('/common/header.html')
    // レスポンスをテキストとして取得
    .then(response => response.text())

    // 取得したHTMLデータを<header>タグに挿入
    .then(data => {
      const headerElement = document.querySelector('header');
      headerElement.innerHTML = data;

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
      const closeBtn = document.querySelector('.header_nav_close'); // 閉じるボタン

      // ハンバーガーメニューを開閉
      if (toggle && spNav) {
        toggle.addEventListener('click', () => {
          spNav.classList.toggle('active');

          // メニューが開いている間はスクロールを無効にする
          if (spNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = '';
          }
        });
      }

      // メニューを閉じる処理
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          spNav.classList.remove('active'); // メニューを非表示にする

          // スクロールを再び有効にする
          document.body.style.overflow = '';
        });
      }
    })

    // エラーが発生した場合に、コンソールにエラーメッセージを表示
    .catch(error => console.error('Error loading header:', error));
}

// フッターを挿入する関数
function loadFooter() {
  // 'footer.html'を取得
  fetch('/common/footer.html')
    // レスポンスをテキストとして取得
    .then(response => response.text())

    // 取得したHTMLデータを<footer>タグに挿入
    .then(data => {
      document.querySelector('footer').innerHTML = data;
    })

    // エラーが発生した場合に、コンソールにエラーメッセージを表示
    .catch(error => console.error('Error loading footer:', error));
}

// ページがロードされた後に実行
document.addEventListener('DOMContentLoaded', () => {
  loadHeader();  // ヘッダーを挿入
  loadFooter();  // フッターを挿入
});
