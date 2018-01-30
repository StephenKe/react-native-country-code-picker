import React from 'react';
import {View, Text, StyleSheet, TextInput, SectionList, ListView, TouchableHighlight, Modal} from "react-native";
import Button from "react-native-button";
import PropTypes from 'prop-types';

const countryCodeSession = require('./lib/countryCode.json');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    container1: {
        flex: 1,
        backgroundColor: '#aaa',
        flexDirection: 'row',
        padding: 8,
    },
    container2: {
        flex: 11,
        flexDirection: 'row',
        paddingRight: 15,
        // backgroundColor: '#000'
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        height: 40,
        paddingLeft: 10,
        marginTop: 3,
    },
    sessionList: {
        flex: 1
    },
    rightBar: {
        position: 'absolute',
        width: 15,
        right: 0,
        top: 70,
    },
    rightBarText: {
        color: 'blue',
        textAlign: 'center',
        lineHeight: 20
    },
    sessionListItemContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 8,
        paddingLeft: 0,
        // borderBottomWidth: 0.6,
        // borderBottomColor: '#eee'
    },
    sessionListItem1: {
        flex: 1
    },
    sessionListItem2: {
        flex: 1,
        textAlign: 'right',
        color: '#999'
    },
    sessionHeader: {
        backgroundColor: '#eee'
    },
    itemSeparator: {
        flex: 1,
        height: 1,
        backgroundColor: '#eee'
    },
    cancelBtn: {
        height: 40,
        lineHeight: 40,
        paddingLeft: 5,
    },
});

export default class extends React.Component {
    static propTypes= {
        isShow: PropTypes.bool,
        onPick: PropTypes.func,
        // onCancel: PropTypes.func
    };
    sectionlist: SectionList;
    constructor(props) {
        super(props);
        this.state = {
            fullList: true,
            matchItem: new Set(),
            matchSection: new Set(),
            hideRightBar: false,
            isShow: this.props.isShow
        };
        this.handleRightBarPress = this.handleRightBarPress.bind(this);
        this.searchList = this.searchList.bind(this);
    };
    handleRightBarPress (itemIndex) {
        this.sectionlist.scrollToLocation({itemIndex: itemIndex})
    };
    searchList (text) {
        this.setState({fullList: false});
        if (!text) {
            this.setState({fullList: true});
            return
        }
        if (~text.indexOf(' ')) {
            this.setState({fullList: false});
            return
        }
        let matchItem = new Set();
        let matchSection = new Set();
        for (let i = 0; i < countryCodeSession.length; i++) {
            for (let j = 0; j < countryCodeSession[i].data.length; j++) {
                if (countryCodeSession[i].data[j].phoneCode.toString().match(text) || countryCodeSession[i].data[j].countryName.match(text)) {
                    matchItem.add(countryCodeSession[i].data[j].countryCode);
                    !matchSection.has(countryCodeSession[i].key) && matchSection.add(countryCodeSession[i].key);
                }
            }
        }
        if (matchItem.size) {
            this.setState({matchItem, matchSection})
        } else {
            this.setState({matchItem, matchSection}, () => {
                this.setState({fullList: false})
            })
        }
    };
    phoneCodeSelected (item) {
        this.props.onPick(item)
        this.setState({isShow: false})
    };
    render(){
        const title = this.props.title || 'No Title';
        const data = this.props.data || 'No Data';
        const sectionMapArr = [
            ['A', -1],
            ['B', 20],
            ['C', 47],
            ['D', 51],
            ['E', 59],
            ['F', 64],
            ['G', 78],
            ['H', 93],
            ['I', 104],
            ['J', 106],
            ['K', 119],
            ['L', 132],
            ['M', 146],
            ['N', 176],
            ['O', 191],
            ['P', 193],
            ['Q', 198],
            ['R', 200],
            ['S', 205],
            ['T', 233],
            ['U', 247],
            ['V', 249],
            ['W', 251],
            ['X', 262],
            ['Y', 272],
            ['Z', 288]
        ];
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (
            <Modal visible={this.state.isShow} animationType={'slide'} transparent={false}>
                <View style={styles.container}>
                    <View style={[styles.container1]}>
                        <TextInput
                            style={[styles.searchInput]}
                            placeholder='请输入国家或地区'
                            onChangeText={(text) => this.searchList(text)}
                            onFocus={() => this.setState({hideRightBar: true})}
                        />
                        <Button　style={[styles.cancelBtn]} onPress={() => this.setState({isShow: false})}>X</Button>
                    </View>
                    <View style={[styles.container2]}>
                        <SectionList
                            ref={w => this.sectionlist = w}
                            initialNumToRender={300}
                            style={[styles.sessionList]}
                            renderItem={({item}) => (this.state.matchItem.has(item.countryCode) || this.state.fullList) ? <TouchableHighlight onPress={() => this.phoneCodeSelected(item)}><View style={[styles.sessionListItemContainer]} ><Text style={[styles.sessionListItem1]}>{item.countryName}</Text><Text style={[styles.sessionListItem2]}>+{item.phoneCode}</Text></View></TouchableHighlight>: <View></View>}
                            renderSectionHeader={({section, index}) => (this.state.matchSection.has(section.key) || this.state.fullList) ? <View><Text style={[styles.sessionHeader]}>{section.key}</Text></View> : <View></View>}
                            sections={countryCodeSession}
                            ItemSeparatorComponent={() => this.state.fullList ? <View style={[styles.itemSeparator]}></View> : <View></View>}
                        />
                    </View>
                    <View style={[styles.rightBar]}>
                        {this.state.hideRightBar ? <View></View> : <ListView
                            dataSource={ds.cloneWithRows(sectionMapArr)}
                            renderRow={(rowData) => <Text style={[styles.rightBarText]} onPress={() => this.handleRightBarPress(rowData[1])}>{rowData[0]}</Text>}
                        />}
                    </View>
                </View>
            </Modal>
        );
    }
}
