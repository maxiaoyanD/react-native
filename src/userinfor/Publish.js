import React, { Component } from 'react'
import { Text, View, ScrollView, ToastAndroid,Dimensions } from 'react-native'
import { Button } from '@ant-design/react-native';
const {width} = Dimensions.get('window');
export default class Publish extends Component {
    constructor(){
        super();
        this.state={
            data:[],
            num:1,//第几页
            reply:["已回复","待回复"],
            arr:[],
            isloading:false
        }
    }
    componentDidMount(){
        this.setState({isloading:true})
        fetch('https://cnodejs.org/api/v1/topics?limit=10&page='+this.state.num)
        .then(res=>res.json())
        .then(res=>{
            this.setState({isloading:false})
            this.random();
            this.getData(res)
        })
    }
    componentDidUpdate(){
        fetch('https://cnodejs.org/api/v1/topics?limit=10&page='+this.state.num)
        .then(res=>res.json())
        .then(res=>{
           this.getData(res)    
        })
    }
    getData = (res)=>{
        let title = [];
        for(var i = 0;i<res.data.length;i++){
            let tit = res.data[i].title+'',
                date = res.data[i].create_at.slice(0,10);
            if(tit.length>=15){
                title.push({id:i,title:tit.slice(0,14)+'...', create_at:date})
            }else{
                title.push({id:i,title:tit, create_at:date})
            }
        }
        this.setState({
            data:title
        })
    }
    random = ()=>{
        let brr = []
        for(var i=0;i<10;i++){
            let hh = this.state.reply[parseInt(Math.random()*2)];
            brr.push({"rep":hh})
        }
        this.setState({arr:brr})
    }
    setUp = ()=>{
        let num = this.state.num;
        if(this.state.num == 1){
            this.setState({num:num})
        }else{
            this.random();
            this.setState({
                num:num-1
            })
        }
    }
    setDown = ()=>{
        let num = this.state.num;
        this.random();
        this.setState({
            num:num+1,
        })
    }
    render() {
        return (
            <View style={{backgroundColor:'#fff'}}>
                <ScrollView >
                    {
                        this.state.data.map((item,idx)=>(
                            <View style={{width:width,height:50,marginTop:10,borderBottomColor:'#f5f5f5',borderBottomWidth:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{fontSize:14,width:width*0.6,marginLeft:10}}>{item.title}</Text>
                                <Text style={{fontSize:14}}>{item.create_at}</Text>
                                <Text style={{fontSize:14,marginLeft:10}}>
                                    {
                                        this.state.arr[idx].rep=='已回复' 
                                        ?<Text>{this.state.arr[idx].rep}</Text>
                                        :<Text style={{color:'red'}}>{this.state.arr[idx].rep}</Text>
                                    }
                                </Text>
                            </View>
                        ))
                    }
                    {
                        this.state.isloading
                        ?<View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>正在加载.....</Text></View>
                        :null
                    }
                    <View style={{
                        height:60,
                        color:'#fff',
                        flexDirection:'row',
                        justifyContent:'center',
                        alignItems:'center'
                        }}>
                        
                        <Button 
                            style={{width:100,height:50,borderRadius:30,backgroundColor:'red',marginRight:20}}
                            onPress={()=>{
                                this.state.num==1
                                ?ToastAndroid.showWithGravity(
                                    "这是第1页",
                                    ToastAndroid.SHORT,
                                    ToastAndroid.CENTER
                                  )
                                :this.setUp()}}
                        ><Text style={{color:'#fff'}}>上一页</Text></Button>
                        <Text>第{this.state.num}页</Text>
                        <Button 
                            style={{
                                width:100,
                                height:50,
                                borderRadius:30,
                                backgroundColor:'red',
                                marginLeft:20
                            }}
                            onPress={()=>{this.setDown()}}
                        ><Text style={{color:'#fff'}}>下一页</Text></Button>
                    
                    </View>
                </ScrollView>
               
            </View>
        )
    }
}
