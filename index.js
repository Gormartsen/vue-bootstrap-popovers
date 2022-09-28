import { createVNode, render } from "vue";
import Component from "./src/PopoversView.vue";
var prepareProps = function(el, binding, originProps) {
  var props = {
    placement: "top",
    events: {
      start: 'click',
      end: 'click',
    },
    value: {}
  };
  if(originProps) {
    props = originProps
  }
  if (binding.modifiers.left) {
    props.placement = "left";
  }
  if (binding.modifiers.right) {
    props.placement = "right";
  }
  if (binding.modifiers.bottom) {
    props.placement = "bottom";
  }
  if (binding.modifiers.html) {
    props.html = true;
  }
  if (binding.modifiers.hover) {
    props.events.start = 'mouseover'
    props.events.end = 'mouseleave'
  }
  
  for(var i in binding.value) {
    props.value[i] = binding.value[i]
  }
  if(props.value.contentElement) {
    var matches = el.querySelectorAll('div[data-bs-content]');
    for(var i in matches) {
      if(matches[i].dataset && matches[i].dataset['bsContent'] == props.value.contentElement) {
        if(props.html) {
          props.value.content = matches[i].outerHTML
        } else {
          props.value.content = matches[i].textContent;
        }
        matches[i].parentNode.removeChild(matches[i])
      }
    }
  }
  return props;
}

export default {
  install: function (app) {
    app.directive("popover", {
      mounted: function(el, binding){
        el.tooltip = {
          props: prepareProps(el, binding)
        }
        el.tooltip.props.el = el
        el.addEventListener(el.tooltip.props.events.end, function(){
          if(!el.tooltip.enabled) {
            return
          }
          console.log("hide executed")
          el.tooltip.vm.component.ctx.hide()
          setTimeout(function(){
            el.tooltip.enabled = false;
            if(el.tooltip.node !== null) {
              el.tooltip.node.parentNode.removeChild(el.tooltip.node);
              el.tooltip.node = null
            }
          },300);
        });
        el.addEventListener(el.tooltip.props.events.start, function () {
          if( el.tooltip.enabled) {
            return
          }
          console.log("show executed")
          el.tooltip.enabled = true;
          var container = document.createElement("div");
          el.tooltip.vm = createVNode(Component, el.tooltip.props);
          render( el.tooltip.vm, container);
  
          el.tooltip.node = container.firstElementChild;
          document.body.appendChild(el.tooltip.node);
          el.tooltip.vm.component.ctx.show()
        });
        
      },
      beforeDestroy: function(el, binding){
        if(el.tooltip.node !== null) {
          el.tooltip.node.parentNode.removeChild(el.tooltip.node);
          el.tooltip.node = null
          delete el.tooltip.vm
        }
      },
      updated: function(el, binding){
        prepareProps(el, binding, el.tooltip.props)
        if(el.tooltip.vm ) {
          for(var i in el.tooltip.props) {
            el.tooltip.vm.component.props[i] = el.tooltip.props[i]
          }
        }
      }
    });
  },
};
