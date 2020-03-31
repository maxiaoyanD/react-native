import React, { Component } from 'react'
import { Text, View,TouchableOpacity,TextInput, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { Icon, Button } from '@ant-design/react-native';
import {myFetch} from '../utils'
export default class Register extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:''
        }
    }
   
    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }
    register = ()=>{
        myFetch.post('/register',{
            username:this.state.username,
            pwd:this.state.pwd
        }).then(
            res=>{
                if(res.data.tag == "00000"){
                    Alert.alert("已注册");
                }else if(res.data.tag == "11111"){
                    Alert.alert("用户名已存在")
                }else{
                    Alert.alert("注册成功");
                    Actions.login();
                }
            }
        )
    }
    render() {
        return (
            <View style={{flex: 1,justifyContent: 'center'}}>
                <View
                    style={{ alignItems: 'center'}}>
                    <View style={{width:'80%',height:80,flexDirection:'row'}}>
                        <TouchableOpacity 
                            style={{
                            width:50,
                            height:80,
                            flexDirection:'row',
                            alignItems:'center'
                            }}
                            onPress={()=>Actions.login()}
                        >
                        <Text 
                        style={{
                            fontSize:20,
                            }}>登录/</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={{
                            width:80,
                            height:80,
                            flexDirection:'row',
                            // justifyContent:'center',
                            alignItems:'center'
                        }}
                        onPress={()=>Actions.register()}
                        ><Text
                        style={{
                        fontSize:20,
                        }}
                        >注册</Text></TouchableOpacity>
                    </View>
                    <View
                        style={{
                        width: '80%',
                        marginRight: 10,
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 20,
                        }}>
                        <Icon name="user" color="red"/>
                        <TextInput placeholder="请输入用户名" 
                            onChangeText={this.userhandle}
                        />
                    </View>
                    <View
                        style={{
                        width: '80%',
                        marginRight: 10,
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 20,
                        }}>
                        <Icon name="user" color="red"/>
                        <TextInput 
                            onChangeText={this.pwdhandle}
                            placeholder="请输入密码" 
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity 
                        style={{
                            width: '80%',
                            height: 40,
                            backgroundColor: '#ccc',
                            marginTop: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={this.register}>
                        <Text>注册</Text>
                    </TouchableOpacity>
                </View>
          </View>
        )
    }
}
