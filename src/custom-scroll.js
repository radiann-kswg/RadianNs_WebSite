// https://www.tribeck.jp/column/opinion/production/20210726/
window.onload = function () {
	Vue.createApp({
		el: "#custom-scroll",
		data() {
			return {
				scrollNow: false, // スクロール実行中フラグ
				timer: false,
			};
		},
		mounted() {
			document
				.querySelector(".block")
				.addEventListener("scroll", this.handleScroll);
		},
		methods: {
			/**
			 * スクロールイベント
			 */
			handleScroll: function () {
				this.scrollNow = true; // スクロールバーを表示
				_this = this;

				// 2秒後にスクロールバーを非表示
				if (this.timer != false) clearTimeout(this.timer);
				this.timer = setTimeout(function () {
					_this.scrollNow = false;
				}, 2000);
			},
		},
	});
};