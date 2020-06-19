import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        datavhouer: false,
        lore: String(),
        projectnumb: Number(),
        projectId: String(),
        platedata: String(),
        platename: String(),
        areadata: Array(),
        newproject: {
            changer: false,
            asiadActive: 0,
            mainSwitch: true,
            mainSwitchText: '平台用户',
            mainJump: false,
            mainTree: {
                name: '平台名称',
                children: [{
                    name: '行业名称',
                    children: [{ name: '项目名称1' }]
                }]
            },
            mainBool: [true, false, false, false, false],
        },
    },
    mutations: {
        datavhouerfun(state) {
            state.datavhouer = !state.datavhouer
        },
        allrestate(state) {
            state.lore = String(),
                state.projectnumb = Number(),
                state.projectId = String(),
                state.platedata = String(),
                state.platename = String(),
                state.areadata = Array(),
                state.newproject = {
                    changer: false,
                    asiadActive: 0,
                    mainSwitch: true,
                    mainSwitchText: '平台用户',
                    mainJump: false,
                    mainTree: {
                        name: '平台名称',
                        children: [{
                            name: '行业名称',
                            children: [{ name: '项目名称1' }]
                        }]
                    },
                    mainBool: [true, false, false, false, false],
                }

        },
        mResState(state) {
            state.areadata = Array(),
                state.newproject = {
                    changer: false,
                    asiadActive: 0,
                    mainSwitch: true,
                    mainSwitchText: '平台用户',
                    mainJump: false,
                    mainTree: {
                        name: '平台名称',
                        children: [{
                            name: '行业名称',
                            children: [{ name: '项目名称1' }]
                        }]
                    },
                    mainBool: [true, false, false, false, false],
                }
        },
        addsontree(state, key) {
            state.newproject.changer = true;
            state.newproject.mainTree = {

                name: key.name,
                children: key.children
            }
        },
        addareadata(state, key) {
            state.areadata = key
        },
        addplatename(state, key) {
            state.platename = key
        },
        addplatedata(state, key) {
            state.platedata = key
        },
        addprojectId(state, key) {
            state.projectId = key
        },
        addstarlore(state, key) {
            state.lore = key
        },
        addpjecnum(state, key) {
            state.projectnumb = key
        },
        NasiadActive(state) {
            state.newproject.asiadActive += 1;
        },
        NSasiadActive(state, key) {
            state.newproject.asiadActive = key;
        },
        NSwitchT(state) {
            state.newproject.mainTree = {
                    name: '平台名称',
                    children: [{
                        name: '行业名称',
                        children: [{ name: '项目名称1' }]
                    }]
                },
                state.newproject.mainSwitch = true
        },
        NSwitchF(state) {
            state.newproject.mainTree = {
                    name: '个人',
                    children: [{
                        name: '项目名称',
                    }]
                },
                state.newproject.mainSwitch = false
        },
        NMBool(state) {
            state.newproject.mainBool[state.newproject.asiadActive - 1] = false;
            state.newproject.mainBool[state.newproject.asiadActive] = true;
        },
        NMSBool(state) {
            state.newproject.mainBool[0] = false;
            state.newproject.mainBool[state.newproject.asiadActive - 1] = false;
            state.newproject.mainBool[state.newproject.asiadActive] = true;
        },
        NMTree(state, key) {
            state.newproject.mainTree = key;
        },
        NMTreeName(state, key) {
            state.newproject.mainTree.name = key;
        },
        NMJump(state, key) {
            state.newproject.mainJump = key;
        },
        NMSwitchText(state, key) {
            state.newproject.mainSwitchText = key;
        },
        resstate(state) {
            state = Odata
        }
    },
    actions: {

    }
})
export default store