// 必須項目の確認
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");

  form.addEventListener("submit", (e) => {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    // メールアドレスのバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 必須項目の確認
    if (!name || !email || !phone) {
      alert("お名前・メールアドレス・電話番号のいずれかの項目が未入力です");
      e.preventDefault();
      return;
    }

    // メールアドレスの形式が正しいかチェック
    if (!emailRegex.test(email)) {
      alert("正しいメールアドレスを入力してください");
      e.preventDefault();
      return;
    }

    // もし必要なら、電話番号の形式もチェックできます（任意）
    const phoneRegex = /^[0-9]{10,11}$/; // 日本の電話番号形式に合わせた簡単なチェック
    if (phone && !phoneRegex.test(phone)) {
      alert("正しい電話番号を入力してください");
      e.preventDefault();
      return;
    }
  });
});
