// お問い合わせフォームコンポーネント
const contactFormComponent = {
  template: `
    <div class="contact-form-container">
      <div class="form-security-notice">
        <p>このフォームはセキュリティ強化されており、SSL暗号化通信で安全に送信されます。</p>
        <p>お客様の個人情報は適切に保護され、第三者と共有されることはありません。</p>
      </div>

      <form @submit.prevent="handleSubmit" class="contact-form" :class="{ 'form-loading': isLoading }">
      <div class="form-row">
        <div class="form-group">
          <label for="name" class="form-label">お名前 <span class="required">*</span></label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="form-input"
            :class="{ 'error': errors.name }"
            required
            maxlength="50"
            placeholder="柏木主税"
          />
          <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
        </div>

        <div class="form-group">
          <label for="email" class="form-label">メールアドレス <span class="required">*</span></label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="form-input"
            :class="{ 'error': errors.email }"
            required
            maxlength="100"
            placeholder="your@email.com"
          />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="subject" class="form-label">件名 <span class="required">*</span></label>
        <select
          id="subject"
          v-model="form.subject"
          class="form-select"
          :class="{ 'error': errors.subject }"
          required
        >
          <option value="">ご用件の概要をどうぞ</option>
          <option value="work-inquiry">ご依頼・コミッションについて</option>
          <option value="collaboration">コラボ企画について</option>
          <option value="question">「百花繚乱研究所」および創作作品について</option>
          <option value="tarot-recruitment">「運命線探偵78」公式タロットカードの募集について</option>
          <option value="fan-message">ファンレターを送りたい</option>
          <option value="other">その他のお問い合わせ</option>
        </select>
        <span v-if="errors.subject" class="error-message">{{ errors.subject }}</span>
      </div>

      <div class="form-group">
        <label for="message" class="form-label">メッセージ <span class="required">*</span></label>
        <textarea
          id="message"
          v-model="form.message"
          class="form-textarea"
          :class="{ 'error': errors.message }"
          required
          maxlength="1000"
          rows="6"
          placeholder="どのようなご用件/ご伝言でしょうか？詳細にお聞きします。"
        ></textarea>
        <div class="char-count">{{ form.message.length }}/1000文字</div>
        <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
      </div>

      <div class="form-group checkbox-group">
        <label class="checkbox-label">
          <input
            type="checkbox"
            v-model="form.privacyAccepted"
            class="form-checkbox"
            :class="{ 'error': errors.privacyAccepted }"
            required
          />
          <span class="checkmark"></span>
          <a href="#" @click.prevent="showPrivacyPolicy = true" class="privacy-link">
            プライバシーポリシー
          </a>に同意する <span class="required">*</span>
        </label>
        <span v-if="errors.privacyAccepted" class="error-message">{{ errors.privacyAccepted }}</span>
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-btn" :disabled="isLoading">
          <span v-if="!isLoading">送信する</span>
          <span v-else class="loading-text">
            <span class="spinner"></span>
            送信中...
          </span>
        </button>
      </div>

      <!-- 送信完了メッセージ -->
      <div v-if="showSuccess" class="success-message">
        <div class="success-icon">✓</div>
        <h3>お問い合わせありがとうございます！</h3>
        <p>メッセージを受信いたしました。内容を確認の上、できるだけ早くご返信いたします。</p>
      </div>

      <!-- エラーメッセージ -->
      <div v-if="showError" class="error-alert">
        <div class="error-icon">⚠</div>
        <h3>送信エラー</h3>
        <p>{{ errorMessage }}</p>
        <button @click="showError = false" class="close-btn">✕</button>
      </div>
    </form>

    <!-- プライバシーポリシーモーダル -->
    <div v-if="showPrivacyPolicy" class="modal-overlay" @click="showPrivacyPolicy = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>プライバシーポリシー</h3>
          <button @click="showPrivacyPolicy = false" class="modal-close">✕</button>
        </div>
        <div class="modal-body">
          <h4>個人情報の取り扱いについて</h4>
          <p>お問い合わせフォームでご入力いただいた個人情報は、以下の目的でのみ使用いたします：</p>
          <ul>
            <li>お問い合わせへの回答</li>
            <li>必要に応じた追加のご連絡</li>
            <li>倫理的トラブル発生時の行政機関による仲裁</li>
          </ul>
          <p>ご提供いただいた個人情報は適切に管理し、法令順守の下で第三者に提供することはありません。ただし、お問い合わせにより万が一倫理的トラブルの恐れがある場合に限り、行政機関へ共有することがあります。</p>
          <h4>お問い合わせ内容の保存期間</h4>
          <p>お問い合わせ内容は回答後1年保存し、その後 個人情報にあたる箇所を削除いたします。</p>
        </div>
      </div>
    </div>`,
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: '',
        privacyAccepted: false
      },
      errors: {},
      isLoading: false,
      showSuccess: false,
      showError: false,
      showPrivacyPolicy: false,
      errorMessage: ''
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.form.name.trim()) {
        this.errors.name = 'お名前は必須です';
      } else if (this.form.name.length > 50) {
        this.errors.name = 'お名前は50文字以内で入力してください';
      }

      if (!this.form.email.trim()) {
        this.errors.email = 'メールアドレスは必須です';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        this.errors.email = '有効なメールアドレスを入力してください';
      }

      if (!this.form.subject) {
        this.errors.subject = '件名を選択してください';
      }

      if (!this.form.message.trim()) {
        this.errors.message = 'メッセージは必須です';
      } else if (this.form.message.length > 1000) {
        this.errors.message = 'メッセージは1000文字以内で入力してください';
      }

      if (!this.form.privacyAccepted) {
        this.errors.privacyAccepted = 'プライバシーポリシーに同意してください';
      }

      return Object.keys(this.errors).length === 0;
    },

    async handleSubmit() {
      if (!this.validateForm()) {
        return;
      }

      this.isLoading = true;
      this.showError = false;

      try {
        // フォーム送信の処理（設定ファイルで指定されたエンドポイントを使用）
        const response = await this.submitForm();

        if (response.success) {
          this.showSuccess = true;
          this.resetForm();
        } else {
          throw new Error(response.error || '送信に失敗しました');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        this.showError = true;
        this.errorMessage = error.message || 'ネットワークエラーが発生しました。しばらく後で再度お試しください。';
      } finally {
        this.isLoading = false;
      }
    },

    async submitForm() {
      // セキュリティ強化されたフォーム送信処理
      const sanitizedForm = {
        name: this.sanitizeInput(this.form.name),
        email: this.sanitizeInput(this.form.email),
        subject: this.sanitizeInput(this.form.subject),
        message: this.sanitizeInput(this.form.message),
        timestamp: new Date().toISOString(),
        origin: window.location.origin
      };

      const response = await fetch('https://formspree.io/f/mzznvbdl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        mode: 'cors',
        credentials: 'omit',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: JSON.stringify(sanitizedForm)
      });

		if (response.ok) {
			return { success: true };
		} else {
			throw new Error('送信に失敗しました');
		}
    },

    resetForm() {
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: '',
        privacyAccepted: false
      };
      this.errors = {};
    },

    sanitizeInput(input) {
      if (typeof input !== 'string') return input;
      // XSS対策のための基本的なサニタイゼーション
      return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    }
  },

  mounted() {
    // フォーム設定の読み込み（実際の実装では外部ファイルから読み込み）
    console.log('Contact form initialized');
  }
};

// Vue アプリケーションの初期化
const { createApp } = Vue;

createApp({
  components: {
    'contact-form': contactFormComponent
  }
}).mount('#app-contact');