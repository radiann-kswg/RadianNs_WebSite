Vue.createApp({})
  .component("footer-credit", {
    template: `<a href="/index.html" class="a-link">TOPに戻る</a>
		<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://misskey.numbertales-radiann.net/@official">100BeautiesLab.(百花繚乱研究所) Primary Works/Creations</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://misskey.io/@RadianN_kswg@misskey.numbertales-radiann.net">RadianN_kswg(ラジアン/柏木主税)</a> is licensed under <a href="http://creativecommons.org/licenses/by-nc/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"></a></p><p>百花繚乱研究所（©ラジアン(柏木主税) 2021-{{nowYear}}） お問い合わせ：radiann.kswg6631＠gmail.com</p>
		<p><a class="a-p" href="
		https://misskey.numbertales-radiann.net/@official/pages/creation_guideline">創作ガイドライン(日本語)</a>/<a class="a-p" href="
		https://misskey.numbertales-radiann.net/@official/pages/creation_guideline_EN">Creation Guidelines(English)</a></p><p>
			スペシャルサンクス：<a class="a-p" href="https://okauni.connpass.com/">岡山Unity勉強会</a>(2021-2022), <a class="a-p" href="https://sanuki-gamen.connpass.com/">讃岐GameN</a>(2022-2024), <a class="a-p" href="https://misskey.io/">Misskey.io</a>(2022-2024),<br /><a href="https://kiuxiyu.myportfolio.com/">喜雨(kiu/xiyu)</a>さん(2023-), および制作活動に関わっていただきましたフォロワーのみなさん
		</p>`,
    // https://qiita.com/ron-Qiita/items/17af311a506d08b7bf14
    data: function () {
      return {
        nowYear: 2022,
      };
    },
    mounted: function () {
      var date = new Date();
      this.nowYear = date.getFullYear();
    },
  })
  .mount("#app-credit");
