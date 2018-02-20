var DefaultSection = {
  name: "default-section",
  props: {
    section: { type: Object, required: true },
    currentIndex: { type: Number, required: false, default: Infinity },
    updateCurrentIndex: { type: Function, required: true },
    searchInput: { type: String, required: false, default: "" },
    renderSuggestion: { type: Function, required: true },
    normalizeItemFunction: { type: Function, required: true }
  },
  computed: {
    list: function() {
      var ref = this.section;
      var limit = ref.limit;
      var data = ref.data;
      if (data.length < limit) {
        limit = data.length;
      }
      return data.slice(0, limit);
    },
    className: function() {
      return ("autosuggest__results_title autosuggest__results_title_" + (this.section.name));
    }
  },
  methods: {
    getItemIndex: function getItemIndex(i) {
      return this.section.start_index + i;
    },
    getItemByIndex: function getItemByIndex(i) {
      return this.section.data[i];
    },
    getLabelByIndex: function getLabelByIndex(i) {
      return this.section.data[i];
    },
    onMouseEnter: function onMouseEnter(event) {
      this.updateCurrentIndex(event.currentTarget.getAttribute("data-suggestion-index"));
    },
    onMouseLeave: function onMouseLeave() {
      this.updateCurrentIndex(null);
    }
  },
  // eslint-disable-next-line no-unused-vars
  render: function render(h) {
    var this$1 = this;

    var sectionTitle = this.section.label ? (
      h( 'li', { class: this.className }, this.section.label)
    ) : (
      ""
    );
    return h(
      "ul",
      {
        attrs: { role: "listbox", "aria-labelledby": "autosuggest" }
      },
      [
        sectionTitle,
        this.list.map(function (val, key) {
          var item = this$1.normalizeItemFunction(this$1.section.name, this$1.section.type, this$1.getLabelByIndex(key), val);
          return h(
            "li",
            {
              attrs: {
                role: "option",
                "data-suggestion-index": this$1.getItemIndex(key),
                "data-section-name": this$1.section.name,
                id: "autosuggest__results_item-" + this$1.getItemIndex(key)
              },
              key: this$1.getItemIndex(key),
              class: {
                "autosuggest__results_item-highlighted":
                  this$1.getItemIndex(key) == this$1.currentIndex,
                autosuggest__results_item: true
              },
              on: {
                mouseenter: this$1.onMouseEnter,
                mouseleave: this$1.onMouseLeave
              }
            },
            [this$1.renderSuggestion(item)]
          );
        })
      ]
    );
  }
};

/** DOM Utilities */
function hasClass(el, className) {
  return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
}

function addClass(el, className) {
  if (!hasClass(el, className)) { el.className += " " + className; }
}

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  }
}

function isDescendant(parent, child) {
     var node = child.parentNode;
     while (node != null) {
         if (node == parent) {
             return true;
         }
         node = node.parentNode;
     }
     return false;
}

var VueAutosuggest = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":_vm.component_attr_id_autosuggest}},[_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.searchInput),expression:"searchInput"}],staticClass:"form-control",class:[_vm.isOpen ? 'autosuggest__input-open' : '', _vm.inputProps['class']],attrs:{"name":"q","type":"text","autocomplete":"off","role":"combobox","aria-autocomplete":"list","aria-owns":"autosuggest__results","aria-activedescendant":_vm.isOpen && _vm.currentIndex !== null ? ("autosuggest__results_item-" + (_vm.currentIndex)) : '',"aria-haspopup":_vm.isOpen ? 'true' : 'false',"aria-expanded":_vm.isOpen ? 'true' : 'false'},domProps:{"value":(_vm.searchInput)},on:{"keydown":_vm.handleKeyStroke,"click":_vm.onClick,"input":function($event){if($event.target.composing){ return; }_vm.searchInput=$event.target.value;}}},'input',_vm.inputProps,false)),_vm._v(" "),_c('div',{class:_vm.component_attr_class_autosuggest__results_container},[(_vm.getSize() > 0 && !_vm.loading)?_c('div',{class:_vm.component_attr_class_autosuggest__results,attrs:{"aria-labelledby":_vm.component_attr_id_autosuggest}},_vm._l((this.computedSections),function(cs,key){return _c(cs.type,{key:_vm.getSectionRef(key),ref:_vm.getSectionRef(key),refInFor:true,tag:"component",attrs:{"normalizeItemFunction":_vm.normalizeItem,"renderSuggestion":_vm.renderSuggestion,"section":cs,"updateCurrentIndex":_vm.updateCurrentIndex,"searchInput":_vm.searchInput}})})):_vm._e()])])},staticRenderFns: [],
  name: "autosuggest",
  components: {
    DefaultSection: DefaultSection
  },
  props: {
    inputProps: {
      type: Object,
      required: true,
      default: function() {
        return {
          id: {
            type: String,
            default: "autosuggest__input"
          },
          onInputChange: {
            type: Function,
            required: true
          },
          initialValue: {
            type: String,
            required: false
          },
          onClick: {
            type: Function,
            required: false
          }
        };
      }
    },
    limit: {
      type: Number,
      required: false,
      default: Infinity
    },
    suggestions: {
      type: Array,
      required: true,
      default: []
    },
    renderSuggestion: {
      type: Function,
      required: false,
      default: function (suggestion) {
        return suggestion.item;
      }
    },
    getSuggestionValue: {
      type: Function,
      required: false,
      default: function (suggestion) {
        var item = suggestion.item;
        if (typeof item === "object" && item.hasOwnProperty("name")) {
          return item.name;
        } else {
          return item;
        }
      }
    },
    shouldRenderSuggestions: {
      type: Function,
      required: false,
      default: function () {
        return true;
      }
    },
    sectionConfigs: {
      type: Object,
      required: false,
      default: function () {
        return {
          default: {
            onSelected: null
          }
        };
      }
    },
    onSelected: {
      type: Function,
      required: false,
      default: null
    }
  },
  data: function () { return ({
    component_attr_id_autosuggest: "autosuggest",
    component_attr_class_autosuggest__results_container: "autosuggest__results-container",
    component_attr_class_autosuggest__results: "autosuggest__results",
    searchInput: "",
    searchInputOriginal: null,
    currentIndex: null,
    currentItem: null,
    loading: false /** Helps with making sure the dropdown doesn't stay open after certain actions */,
    didSelectFromOptions: false,
    computedSections: [],
    computedSize: 0,
    internal_inputProps: {}, // Nest default prop values don't work currently in Vue
    defaultInputProps: {
      initialValue: "",
      onClick: function () {}
    },
    defaultSectionConfig: {
      name: "default",
      type: "default-section"
    }
  }); },
  computed: {
    isOpen: function isOpen() {
      return this.getSize() > 0 && this.shouldRenderSuggestions() && !this.loading;
    }
  },
  methods: {
    _onSelected: function _onSelected() {
      if (
        this.currentItem &&
        this.sectionConfigs[this.currentItem.name] &&
        this.sectionConfigs[this.currentItem.name].onSelected
      ) {
        this.sectionConfigs[this.currentItem.name].onSelected(
          this.currentItem,
          this.searchInputOriginal
        );
      } else if (this.sectionConfigs["default"].onSelected) {
        this.sectionConfigs["default"].onSelected(null, this.searchInputOriginal);
      } else {
        this.onSelected && this.onSelected(this.currentItem);
      }
    },
    getSectionRef: function getSectionRef(i) {
      return "computed_section_" + i;
    },
    getSize: function getSize() {
      return this.computedSize;
    },
    getItemByIndex: function getItemByIndex(index) {
      var this$1 = this;

      var obj = false;
      if (index === null) { return obj; }
      for (var i = 0; i < this.computedSections.length; i++) {
        if (
          index >= this$1.computedSections[i].start_index &&
          index <= this$1.computedSections[i].end_index
        ) {
          var trueIndex = index - this$1.computedSections[i].start_index;
          var childSection = this$1.$refs["computed_section_" + i][0];
          if (childSection) {
            obj = this$1.normalizeItem(this$1.computedSections[i].name, this$1.computedSections[i].type, childSection.getLabelByIndex(trueIndex), childSection.getItemByIndex(trueIndex));
            break;
          }
        }
      }

      return obj;
    },
    handleKeyStroke: function handleKeyStroke(e) {
      var this$1 = this;

      var keyCode = e.keyCode;

      var ignoredKeyCodes = [
        16, // Shift
        9, // Tab
        18, // alt/option
        91, // OS Key
        93 // Right OS Key
      ];

      if (ignoredKeyCodes.indexOf(keyCode) > -1) {
        return;
      }

      this.loading = false;
      this.didSelectFromOptions = false;
      switch (keyCode) {
        case 40: // ArrowDown
        case 38: // ArrowUp
          e.preventDefault();
          if (this.isOpen) {
            if (keyCode === 38 && this.currentIndex === null) {
              break;
            }
            // Determine direction of arrow up/down and determine new currentIndex
            var direction = keyCode === 40 ? 1 : -1;
            var newIndex = parseInt(this.currentIndex) + direction;

            this.setCurrentIndex(newIndex, this.getSize(), direction);
            this.didSelectFromOptions = true;
            if (this.getSize() > 0 && this.currentIndex >= 0) {
              this.setChangeItem(this.getItemByIndex(this.currentIndex));
              this.didSelectFromOptions = true;
            } else if (this.currentIndex == -1) {
              this.currentIndex = null;
              this.searchInput = this.searchInputOriginal;
              e.preventDefault();
            }
          }
          break;
        case 13: // Enter
          e.preventDefault();
          if (keyCode === 229) {
            // https://github.com/moroshko/react-autosuggest/pull/388
            break;
          }
          this.$nextTick(function () {
            if (this$1.getSize() > 0 && this$1.currentIndex >= 0) {
              this$1.setChangeItem(this$1.getItemByIndex(this$1.currentIndex), true);
              this$1.didSelectFromOptions = true;
            }
            this$1.loading = true;
            this$1.$nextTick(function () {
              this$1._onSelected(this$1.didSelectFromOptions);
            });
          });
          break;
        case 27: // Escape
          if (this.isOpen) {
            /* For 'search' input type, make sure the browser doesn't clear the input when Escape is pressed. */
            this.loading = true;
            this.currentIndex = null;
            this.searchInput = this.searchInputOriginal;
            e.preventDefault();
          }
          break;
      }
    },
    setChangeItem: function setChangeItem(item, overrideOriginalInput) {
      if ( overrideOriginalInput === void 0 ) overrideOriginalInput = false;

      if (this.currentIndex === null) {
        this.currentItem = null;
      } else if (item) {
        this.searchInput = this.getSuggestionValue(item);
        this.currentItem = item;
        if (overrideOriginalInput) {
          this.searchInputOriginal = this.getSuggestionValue(item);
        }
        this.ensureItemVisible(item, this.currentIndex);
      }
    },
    normalizeItem: function normalizeItem(name, type, label, item) {
      return {
        name: name,
        type: type,
        label: label,
        item: item
      };
    },
    ensureItemVisible: function ensureItemVisible(item, index) {
      var resultsScrollElement = document.querySelector(
        ("." + (this.component_attr_class_autosuggest__results))
      );

      if (!item || (!index && index !== 0) || !resultsScrollElement) {
        return;
      }

      var itemElement = document.querySelector(("#autosuggest__results_item-" + index));
      if (!itemElement) {
        return;
      }

      var resultsScrollWindowHeight = resultsScrollElement.clientHeight;
      var resultsScrollScrollTop = resultsScrollElement.scrollTop;

      var itemHeight = itemElement.clientHeight;
      var currentItemScrollOffset = itemElement.offsetTop;

      if (
        itemHeight + currentItemScrollOffset >=
        resultsScrollScrollTop + resultsScrollWindowHeight
      ) {
        /** Current item goes below visible scroll window */
        resultsScrollElement.scrollTo(
          0,
          itemHeight + currentItemScrollOffset - resultsScrollWindowHeight
        );
      } else if (currentItemScrollOffset < resultsScrollScrollTop && resultsScrollScrollTop > 0) {
        /** Current item goes above visible scroll window */
        resultsScrollElement.scrollTo(0, currentItemScrollOffset);
      }
    },
    updateCurrentIndex: function updateCurrentIndex(index) {
      this.currentIndex = index;
    },
    onDocumentMouseUp: function onDocumentMouseUp(e) {
      var this$1 = this;

      
      /** Do not re-render list on input click */
      var isChild = isDescendant(this.$el, e.target);
      if (isChild && e.target.tagName === 'INPUT') {
        return;
      }

      /** Clicks outside of dropdown to exit */
      if (this.currentIndex === null || !this.isOpen) {
        this.loading = this.shouldRenderSuggestions();
        return;
      }

      /** Selects an item in the dropdown */
      this.loading = true;
      this.didSelectFromOptions = true;
      this.setChangeItem(this.getItemByIndex(this.currentIndex), true);
      this.$nextTick(function () {
        this$1._onSelected(true);
      });
    },
    setCurrentIndex: function setCurrentIndex(newIndex, limit, direction) {
      if ( limit === void 0 ) limit = -1;

      var adjustedValue = newIndex;

      // if we hit the lower limit then stop iterating the index
      if (this.currentIndex === null) {
        adjustedValue = 0;
      }

      if (this.currentIndex < 0 && direction === 1) {
        adjustedValue = 0;
      }

      // if we hit the upper limit then just stop iterating the index
      if (newIndex >= limit) {
        adjustedValue = 0;
      }

      this.currentIndex = adjustedValue;

      var element = document.getElementById(("autosuggest__results_item-" + (this.currentIndex)));
      var hoverClass = "autosuggest__results_item-highlighted";
      if (document.querySelector(("." + hoverClass))) {
        removeClass(document.querySelector(("." + hoverClass)), hoverClass);
      }
      if (element) {
        addClass(element, hoverClass);
      }
    },
    onClick: function onClick() {
      var this$1 = this;

      this.loading = false;
      this.internal_inputProps.onClick(this.currentItem);

      this.$nextTick(function () {
        this$1.ensureItemVisible(this$1.currentItem, this$1.currentIndex);
      });
    }
  },
  mounted: function mounted() {
    /** Take care of nested input props */
    Object.assign(this.internal_inputProps, this.defaultInputProps, this.inputProps);
    Object.assign(this.sectionConfigs);

    document.addEventListener("mouseup", this.onDocumentMouseUp);

    this.searchInput = this.internal_inputProps.initialValue; // set default query, e.g. loaded server side.
    this.loading = true;
  },
  watch: {
    searchInput: function searchInput(newValue) {
      this.value = newValue;
      if (!this.didSelectFromOptions) {
        this.searchInputOriginal = this.value;
        this.currentIndex = null;
        this.internal_inputProps.onInputChange(newValue);
      }
    },
    suggestions: {
      immediate: true,
      handler: function handler() {
        var this$1 = this;

        this.computedSections = [];
        this.computedSize = 0;

        this.suggestions.forEach(function (section) {
          if (!section.data) { return; }

          var name = section.name ? section.name : this$1.defaultSectionConfig.name;

          var ref = this$1.sectionConfigs[name];
          var type = ref.type;
          var limit = ref.limit;
          var label = ref.label;

          /** Set defaults for section configs. */
          type = type ? type : this$1.defaultSectionConfig.type;

          limit = limit ? limit : Infinity;
          limit = section.data.length < limit ? section.data.length : limit;

          label = label ? label : section.label;

          var computedSection = {
            name: name,
            label: label,
            type: type,
            limit: limit,
            data: section.data,
            start_index: this$1.computedSize,
            end_index: this$1.computedSize + limit - 1
          };
          this$1.computedSections.push(computedSection);
          this$1.computedSize += limit;
        }, this);
      }
    }
  }
};

var VueAutosuggestPlugin = {
  install: function install(Vue) {
    Vue.component("vue-autosuggest-default-section", DefaultSection);
    Vue.component("vue-autosuggest", VueAutosuggest);
  }
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(VueAutosuggestPlugin);
}

export { VueAutosuggest, DefaultSection };export default VueAutosuggestPlugin;
