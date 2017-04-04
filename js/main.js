window.onload = function () {
    // register a component, and setHTML tag as <v-selectbox>
    Vue.component('v-selectbox', vSelectBox);

    new Vue({
        el: '#app',
        data: {
            list: [
                {id:1,label:'option 1'},
                {id:2,label:'option 2'},
                {id:3,label:'option 3'},
                {id:4,label:'option 4'}],
            selectedVal: "1"
        }
    })
};