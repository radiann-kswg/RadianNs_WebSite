// https://www.tribeck.jp/column/opinion/production/20210726/ (改変済)
const customScrollComponent = {
	template: `
		<div class="block-scroll" v-bind:class="{'is-scrolling': scrollNow}">
			<div ref="scrollContent" class="scroll-content">
				<slot></slot>
			</div>
		</div>
	`,
	data() {
		return {
			scrollNow: false,
			timer: null,
		};
	},
	mounted() {
		if (this.$refs.scrollContent) {
			this.$refs.scrollContent.addEventListener("scroll", this.handleScroll, {
				passive: true,
			});
		}
	},
	beforeUnmount() {
		if (this.$refs.scrollContent) {
			this.$refs.scrollContent.removeEventListener("scroll", this.handleScroll);
		}

		if (this.timer) {
			clearTimeout(this.timer);
		}
	},
	methods: {
		handleScroll() {
			this.scrollNow = true;

			if (this.timer) {
				clearTimeout(this.timer);
			}

			this.timer = window.setTimeout(() => {
				this.scrollNow = false;
				this.timer = null;
			}, 2000);
		},
	},
};

document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("[data-custom-scroll-root]").forEach((element) => {
		Vue.createApp({
			components: {
				"custom-scroll": customScrollComponent,
			},
		}).mount(element);
	});
});