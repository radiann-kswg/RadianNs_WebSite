const listComponent = {
  components: {
  },
  props: {
    wideStyle: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  template: `<div class="list1">
		<div class="list2">
		<h3 v-bind:class="{'h3-wide': titleStyleIsWide}"><slot name="title">(Non Title)</slot></h3><br />
		<slot name="images"></slot><br /><p><slot></slot></p>
		</div>
	</div>`,
  data() {
    return {
      titleStyleIsWide: this.wideStyle,
    };
  },
};
const characterListComponent = {
  components: {
	"list-component":  listComponent,
  },
  props: {
    wideStyle: {
      type: Boolean,
      required: false,
      default: false,
    },
    smallStyle: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  template: `<div v-bind:class="{'character-list1-small': contentsStyleIsSmall, 'character-list1': !contentsStyleIsSmall}">
		<div class="character-list2">
		<h3 v-bind:class="{'h3-wide': titleStyleIsWide}"><slot name="title">(Non Title)</slot></h3><br /><p><slot></slot></p>
		</div>
	</div>`,
  data() {
    return {
      titleStyleIsWide: this.wideStyle,
      contentsStyleIsSmall: this.smallStyle,
    };
  },
};

Vue.createApp({
  components: {
	  "character-list-comp": characterListComponent,
	  "list-comp": listComponent,
  },
}).mount("#app-list-comp");
