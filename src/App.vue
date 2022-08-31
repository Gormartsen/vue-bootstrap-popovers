<style lang="scss">
#app {
  padding: 2rem;
  font-weight: normal;
  width: 100%;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }
}
.root {
  position: relative;
  padding: 2em 0;
  margin-top: 2em;
  margin-bottom: 2em;
  border-bottom: 1px solid #ccc;
}
.root::before {
  content: "";
  position: absolute;
  top: 0;
  left: 18px;
  height: 100%;
  width: 2px;
  background: #d7e4ed;
}

@media (min-width: 992px) {
  .bd-sidebar {
    position: -webkit-sticky;
    position: sticky;
    top: 5rem;
    display: block !important;
    height: calc(100vh - 6rem);
    padding-left: 0.25rem;
    margin-left: -0.25rem;
    overflow-y: auto;
  }
}

@media (min-width: 992px) {
  .bd-layout {
    display: grid;
    grid-template-areas: "sidebar main";
    grid-template-columns: 1fr 4fr;
    gap: 0.5rem;
  }
}

@media (max-width: 991.98px) {
  .bd-main {
    max-width: 760px;
    margin-inline: auto;
  }
}

@media (min-width: 768px) {
  .bd-main {
    display: grid;
    grid-template-areas: "intro" "content";
    grid-template-rows: auto auto 1fr;
    gap: inherit;
  }
}

@media (min-width: 992px) {
  .bd-main {
    grid-template-areas: "intro" "content";
    grid-template-rows: auto 1fr;
  }
}
</style>
<template>
  <div class="container">
    <PopoversView 
      title="Popover Title" 
      placement="right" 
      >
      <template v-slot:target>
        <button
          type="button"
          class="btn btn-primary"
        >Test</button>
      </template>
      <template v-slot:content>
        pop over content
      </template>
    </PopoversView>
    <br>
    <PopoversView 
      placement="bottom" 
      :show-on-mount="true">
      <template v-slot:target>
        <button
          type="button"
          class="btn btn-primary"
        >Test bottom</button>
      </template>
      <template v-slot:content>
        pop over content
      </template>
    </PopoversView>

  </div>
</template>
<script>
export default {
  data() {
    var self = this;
    return {
      isOffCanvas: false,
      placement: "start",
      backdrop: true,
      scroll: false,
      result: "",
    };
  },
  watch: {},
  computed: {
    DataBsBackdrop: function () {
      if (this.backdrop === false) {
        return false;
      }
      return;
    },
    DataBsScroll: function () {
      if (this.scroll === true) {
        return true;
      }
      return;
    },
  },
  methods: {
    showStandard: function () {
      this.$refs["standard"].show();
    },
    hideCanvas: function () {
      console.log("canvas", this.$refs["offcanvas"]);
      this.$refs["offcanvas"].hide();
    },
    showOffCanvas: function (placement, backdrop, scroll) {
      console.log("showOffCanvas clicked");
      if (this.isOffCanvas) {
        this.isOffCanvas = false;
        //this.$refs['offcanvas'].hide();
      }
      this.placement = placement;

      console.log("backdrop", backdrop);
      this.backdrop = true;
      if (backdrop === false) {
        this.backdrop = false;
      }
      this.scroll = false;
      if (scroll === true) {
        this.scroll = true;
      }
      this.isOffCanvas = true;
      var self = this;
      setTimeout(function () {
        self.$refs["offcanvas"].show();
      }, 300);
    },
    eventReceived: function (name) {
      console.log("canvas", this.$refs["offcanvas"]);
      console.log("eventReceived", name);
    },
    hiddenReceived: function (e, type) {
      console.log("hiddenReceived", e, type);
      this.isOffCanvas = false;
    },
    hideReceived: function (e, type) {
      console.log("hideReceived", e, type);
    },
  },
  mounted() {},
};
</script>
