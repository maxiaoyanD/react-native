import React, { Component } from 'react'
import {StyleSheet,View,Text, Image,StatusBar, FlatList, ScrollView ,TouchableHighlight,AsyncStorage,Dimensions } from 'react-native';
import { Icon, Button } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
const {width} = Dimensions.get('window');
let list1=[
    {key:0,title:"账户管理",name:"setting"},
    {key:1,title:"收货地址",name:"environment"},
    {key:2,title:"我的信息",name:"idcard"},
    {key:3,title:"我的订单",name:"file-done"},
    {key:4,title:"我的二维码",name:"qrcode"},
    {key:5,title:"我的积分",name:"shop"},
    {key:6,title:"我的收藏",name:"star"}
];
let list2=[
    {key:0,title:"居家维修保养",name:"tool"},
    {key:1,title:"出行接送",name:"car"},
    {key:2,title:"我的受赠人",name:"user"},
    {key:3,title:"我的住宿优惠",name:"home"},
    {key:4,title:"我的活动",name:"flag"},
    {key:5,title:"我的发布",name:"form"},

];
// 配置参数
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

export default class Mine extends Component {
    // 拍照存储函数
    constructor(){
        super();
        this.state = {
            ImgUrl:require('../../assets/pic/touxiang.png')
        }
    }
    componentDidMount(){
        this.getData()
    }
    storeData = (data)=>{
        AsyncStorage.setItem('ok',JSON.stringify(data),
            ()=>{
                console.log(data,"storeData");
            }
        )
    }
    getData = ()=>{
        AsyncStorage.getItem('ok')
        .then((res)=>{
            console.log(res,"getItem");
            this.setState({ImgUrl: JSON.parse(res) || require('../../assets/pic/touxiang.png')})
        })
    }
    takephoto = ()=>{
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              return;
            } else if (response.error) {
              console.log('Error:', response.error);
            } else if (response.customButton) {
              console.log('custom:', response.customButton);
            } else {
                const source = { uri: response.uri };
                this.setState({
                    ImgUrl: source,
                });
                // console.log(response)
                this.storeData({"uri":response.uri});
            }
          });
    }
    back = ()=>{
        AsyncStorage.getItem("user")
        .then(res=>{
            if(res){
                AsyncStorage.removeItem("user")
                .then((error)=>console.log(error));
                Actions.login()
            }else{
                console.log("没有登录")
            }
        })
    }
    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.header}>
                        {/* 点击调用拍照功能 */}
                        <TouchableHighlight onPress={()=>{this.takephoto()}}>
                            <View style={{width:100,height:100}}>
                                <Image 
                                    style={{width:100,height:100,borderRadius:100}} 
                                    source={this.state.ImgUrl}
                                />
                            </View>
                        </TouchableHighlight>
                        {/* </Button> */}
                        <Text style={{fontSize:24,color:'#fff',marginTop:10}}>BINNU DHILLON</Text>
                    </View>  
                    <View style={styles.mine}>
                        <Icon name="user" size="lg"/>
                        <Text style={{fontSize:20,marginLeft:20,color:'#4f4e4e'}}>我的个人中心</Text>
                    </View>
                    <View style={{height:300,backgroundColor:'#fff'}}>
                        <FlatList
                            numColumns={3}
                            data={list1}
                            renderItem={({item})=>
                                <View style={styles.list1}>
                                    <Icon name={item.name} size="lg"/>
                                    <Text style={{marginTop:5,color:'#4f4e4e'}}>{item.title}</Text>
                                </View>
                            }
                        />
                    </View>
                    <View style={styles.cent}>
                        <Icon name="notification" size="lg"/>
                        <Text style={{fontSize:20,marginLeft:20,color:'#4f4e4e'}}>E族活动</Text>
                    </View>
                    <View style={{width:width,height:200,backgroundColor:'#fff'}}>
                        <FlatList
                            numColumns={3}
                            data={list2}
                            renderItem={({item})=> (item.key==5)?
                                <TouchableHighlight onPress={()=>Actions.publish()}>
                                    <View style={styles.list1}>
                                        <Icon name={item.name} size="lg"/>
                                        <Text style={{marginTop:5,color:'#4f4e4e'}}>{item.title}</Text>
                                    </View>
                                </TouchableHighlight>
                                :<TouchableHighlight>
                                    <View style={styles.list1}>
                                        <Icon name={item.name} size="lg"/>
                                        <Text style={{marginTop:5,color:'#4f4e4e'}}>{item.title}</Text>
                                    </View>
                                </TouchableHighlight>
                            }
                        />
                    </View>
                    <View style={{height:100,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:16,color:'#929191'}}>BINNU DHILLON</Text>
                        <Button 
                            style={{width:150,marginTop:10}}
                            onPress={()=>{this.back()}}
                        >
                            <Text>退出登录</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   header:{
       width:width,
       height:250,
       backgroundColor:'#f23030',
       justifyContent:'center',
       alignItems:'center'
   },
   mine:{
    height:80,
    backgroundColor:'#fff',
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:20,
    borderBottomColor:'#eee',
    borderBottomWidth:1
   },
   list1:{
    width:width/3,
    height:100,
    justifyContent:'center',
    alignItems:'center'
   },
   cent:{
    height:80,
    backgroundColor:'#fff',
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:20,
    borderBottomColor:'#eee',
    borderBottomWidth:1,
    marginTop:10
   },

})