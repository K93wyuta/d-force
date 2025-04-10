// スクロールで要素が表示されたかをチェック
function checkScroll() {
  // メインビジュアルのテキストを取得
  const mainVisualText = document.querySelector('.main_visual_text');
  // conceptクラスを追加する要素を取得
  const conceptText = document.querySelector('.concept');

  // 要素の位置を取得
  const mainVisualPosition = mainVisualText.getBoundingClientRect().top;
  const conceptPosition = conceptText.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  // main_visual_textが画面に表示されたタイミングでvisibleクラスを追加
  if (mainVisualPosition < windowHeight * 0.8) {
    mainVisualText.classList.add('visible');
  }

  // conceptが画面に表示されたタイミングでconceptクラスを追加
  if (conceptPosition < windowHeight * 0.8) {
    conceptText.classList.add('visible');
  }
}

// スクロールイベントでチェック
window.addEventListener('scroll', checkScroll);

// ページロード時に最初にチェック
checkScroll();

// 画像切り替えの処理を追加
document.querySelectorAll('.contents_element_list').forEach(item => {
  item.addEventListener('mouseenter', function() {
    const imageUrl = item.getAttribute('data-hover-image'); // data-hover-image 属性を取得
    const imageElement = document.getElementById('imageToChange'); // 画像要素を取得

    // 画像のフェードアウトのアニメーションを設定
    imageElement.style.transition = 'opacity 0.2s ease'; // フェードアウトを速く
    imageElement.style.opacity = '0'; // 最初にフェードアウト

    // 画像がフェードアウトした後に新しい画像に切り替え
    setTimeout(() => {
      imageElement.src = imageUrl; // 画像のソースを変更

      // 画像の表示を速くするため、フェードインを速く設定（0.3秒）
      imageElement.style.transition = 'opacity 0.3s ease';
      imageElement.style.opacity = '1'; // フェードイン
    }, 200); // フェードアウト後、すぐに画像切り替え
  });

  item.addEventListener('mouseleave', function() {
    const defaultImageUrl = 'assets/images/home/about.jpg'; // 元の画像に戻す
    const imageElement = document.getElementById('imageToChange');
    
    // 画像のフェードアウトのアニメーションを設定
    imageElement.style.transition = 'opacity 0.2s ease'; // フェードアウトを速く
    imageElement.style.opacity = '0'; // 最初にフェードアウト

    // 画像がフェードアウトした後に元の画像に戻す
    setTimeout(() => {
      imageElement.src = defaultImageUrl; // 元の画像に戻す

      // 画像の表示を速くするため、フェードインを速く設定（0.3秒）
      imageElement.style.transition = 'opacity 0.3s ease';
      imageElement.style.opacity = '1'; // フェードイン
    }, 200); // フェードアウト後、すぐに画像切り替え
  });
});