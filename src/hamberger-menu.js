// https://qiita.com/helloworld193/items/9aed3870be1e739c3ad2 (改変済)

Vue.createApp({})
	.component("hamberger-menu", {
		template: `<!--ハンバーガーメニューのボタン-->
		<div class="hamburger_btn" v-on:click='ActiveBtn=!ActiveBtn'>
			<h2>リンク一覧
				<div class="hamburger_icon">
					<span class="line line_01" v-bind:class="{'btn_line01':ActiveBtn}"></span>
					<span class="line line_02" v-bind:class="{'btn_line02':ActiveBtn}"></span>
					<span class="line line_03" v-bind:class="{'btn_line03':ActiveBtn}"></span>
				</div>
			</h2>
		</div>
		<!--サイドバー-->
		<transition name="menu">
			<div class="menu" v-show="ActiveBtn">
				<ul>
					<li><a href="/index.html">サイトトップ</a></li>
					<li><a href="https://database.numbertales-radiann.net/">創作データベース/Creation Databases</a></li>
					<li><a href="https://www.numbertales-radiann.com/">ナンバーテールズ公式サイト/NumberTales Official</a></li>
					<li><a href="https://github.com/radiann-kswg">GitHub</a></li>
					<li><a href="https://www.pixiv.net/users/44375569/">pixiv</a></li>
					<li><a href="https://radiann-kswg.fanbox.cc/">pixivFANBOX</a></li>
					<li><a href="https://radiann-kswg.booth.pm/">BOOTH</a></li>
					<li><a href="https://www.skport.com/profile?id=8931867451568">SKPORT</a></li>
				</ul>
			</div>
		</transition>`,
		data() {
			return {
				ActiveBtn: false,
			};
		},
	})
	.mount("#app-menu");
