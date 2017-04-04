/*! Copyright (c) 2017 Axiu (http://axiu.me)
 * Licensed Under MIT (http://opensource.org/licenses/MIT)
 *
 * Vue Select box - Version@1.0.0
 *
 */
var vSelectBox = Vue.extend({
    template: '<div v-click-outside="clickedOutside">' +
    '<div @click="toggleDropdown" class="dropdown-toggle" v-bind:class="{open:open}">{{selected}}</div>' +
    '<ul  v-if="open">' +
    '<li v-for="item in parsedDataList" @click="setVal(item)" v-bind:class="{selected:selected == item.name}">{{item.name}}</li>' +
    '</ul></div>',
    props: ['options', 'dataDefault','dataKeyName','dataValName'],
    data: function () {
        return {
            selected: '',       // selected name
            optionName:'name', // Option tag label, 'name' for default
            optionId:'id',      // Option tag id, 'name' for id
            open: false,        // Whether option list is open
            parsedDataList:[]  // Parsed Options from options
        }
    },
    mounted: function () {
        // set key & value name for options
        if (typeof this.dataKeyName != "undefined" && typeof this.dataValName != "undefined"){
            this.optionName = this.dataKeyName;
            this.optionId = this.dataValName;
        }
        this.parseData(this.options);
        if (typeof this.dataDefault != 'undefined') {
            this.updateValue("");
            this.selected = this.dataDefault;
        } else {
            this.updateValue(this.parsedDataList[0]);
        }
    },
    methods: {
        setVal: function (val) {
            this.updateValue(val);
            this.toggleDropdown();
        },
        updateValue: function (data) {
            this.selected = data.name;
            this.$emit('input', data.id);
        },
        toggleDropdown: function () {
            this.open = !this.open;
        },
        parseData: function(dataList) {
            if(dataList.length == 0){
                return;
            }else{
                var retDataList = [];
                for(var index in Object.keys(dataList))
                {
                    var item = dataList[index];
                    var key = this.optionName, val = this.optionId;
                    retDataList.push({name:item[key],id: item[val]});
                }
                this.parsedDataList = retDataList;
            }
        },
        clickedOutside: function () {
            this.open = false;
        }
    },
    directives:{
        // Click-outside from BosNaufal: https://github.com/BosNaufal/vue-click-outside
        'click-outside':{
            bind: function (el, binding, vNode) {
                // Provided expression must evaluate to a function.
                if (typeof binding.value !== 'function') {
                    var compName = vNode.context.name;
                    var warn = '[Vue-click-outside:] provided expression ' + binding.expression + ' is not a function, but has to be';
                    if (compName) {
                        warn += 'Found in component ' + compName;
                    }
                    console.warn(warn);
                }
                // Define Handler and cache it on the element
                var bubble = binding.modifiers.bubble;
                var handler = function(e) {
                    if (bubble || (!el.contains(e.target) && el !== e.target)) {
                        binding.value(e)
                    }
                };
                el.__vueClickOutside__ = handler;
                // add Event Listeners
                document.addEventListener('click', handler)
            },
            unbind: function (el, binding) {
                // Remove Event Listeners
                document.removeEventListener('click', el.__vueClickOutside__);
                el.__vueClickOutside__ = null
            }
        }
    }
});