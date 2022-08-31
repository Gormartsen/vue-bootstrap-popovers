<style lang="scss" scoped></style>
<template>
  <slot name="target"></slot>
  <div
    class="popover"
    :class="popoverClasses"
    :data-popper-placement="placement"
    :role="getRole"
    :hidden="hidden"
    ref="popover"
  >
    <h3 class="popover-header" v-if="title">{{title}}</h3>
    <div class="popover-body">
      <slot name="content"></slot>
    </div>
    <div class="popover-arrow" data-popper-arrow="true"></div>
    
  </div>
</template>
<script>
import { createPopper } from "@popperjs/core";
var allowedPopoversPositions = [
  "auto",
  "auto-end",
  "auto-start",
  "bottom",
  "bottom-end",
  "bottom-start",
  "left",
  "left-end",
  "left-start",
  "right",
  "right-end",
  "right-start",
  "top",
  "top-end",
  "top-start",
  ];

var converToClass = function(placement){
  var className = 'bs-popover-top'
  if(['bottom', 'bottom-end', 'bottom-start'].indexOf(placement) !== -1) {
    className = 'bs-popover-bottom'
  }
  if(['left', 'left-end', 'left-start'].indexOf(placement) !== -1) {
    className = 'bs-popover-start'
  }
  if(['right', 'right-end', 'right-start'].indexOf(placement) !== -1) {
    className = 'bs-popover-end'
  }
  return className;
}
export default {
  data() {
    return {
      isShow: false,
      customStyle: "visibility: hidden;",
      myPosition: 0,
      hidden: false,
      popup: false,
      _offsetOptions: {offset: [0, 8]}
    };
  },
  emits: [
    "hideBsPopover",
    "hiddenBsPopover",
    "showBsPopover",
    "shownBsPopover",
  ],
  props: ["placement", "title", "showOnMount", "offsetOptions"],
  watch: {
    isShow: function (newValue) {
      if (newValue) {
        this.$emit("shownBsPopover");

        this.hidden = false;
        return;
      }
      var self = this;
      setTimeout(function () {
        self.hidden = true;
        self.$emit("hiddenBsPopover");
      }, 500);
    },
  },
  computed: {
    checkedPlacement: function(){
      var placement = "start";
      if (
        this.placement &&
        allowedPopoversPositions.indexOf(this.placement) !== -1
      ) {
        placement = this.placement;
      }
      return placement;
    },
    getRole: function () {
      if (this.isShow) {
        return "tooltip";
      }
      return;
    },
    popoverClasses: function () {
      var result = ['fade'];
      if (this.isShow) {
        result.push("show");
      }
      result.push(converToClass(this.checkedPlacement));
      return result.join(" ");
    },
  },
  methods: {
    clickHide: function (e) {
      if (this.$refs["root"] && this.$refs["root"] == e.target) {
        this.hide();
      }
    },
    hide: function () {
      if(!this.isShow) {
        return
      }
      this.isShow = false;
      this.$emit("hideBsPopover");
    },

    show: function () {
      if(this.isShow) {
        return;
      }
      var self = this;
      
      setTimeout(function () {
        self.isShow = true;
        self.$emit("showBsPopover");
      }, 100);
    },
  },
  unmounted() {
    this.popup.destroy();
  },
  mounted() {
    if(this["offsetOptions"]) {
      this._offsetOptions = options
    }
    if(this["showOnMount"]) {
      this.show();
    }
    var self = this;
    var target = self.$slots.target();
    if(target.length) {
      var targetElement = target[0].el;
      targetElement.addEventListener("mouseover", function(){
        self.show();
      })
      targetElement.addEventListener("mouseleave", function(){
        self.hide();
      })
      this.popup = createPopper(targetElement, self.$refs['popover'], {
        placement: self.checkedPlacement,
        modifiers: [
          {
            name: 'offset',
            options: this._offsetOptions,
          },
        ],
      });
    }
  },
};
</script>
