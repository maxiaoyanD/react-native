import React, { Component } from 'react'
import { Text, View,StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper';
import Button from 'react-native-button'
export default class SwperPage extends Component {
    start = ()=>{
        console.log("start")
        AsyncStorage.setItem('isInstall','true',()=>{
            console.log("store end")
        })
        this.props.afterInstall();
    }
    render() {
        return (

                <Swiper showsButtons={true}>
                    <View style={styles.slide1}>
                        <Image style={styles.img} source={require('../../assets/3.jpg')}/>
                    </View>
                    <View style={styles.slide1}>
                        <Image style={styles.img} source={require('../../assets/4.jpg')}/>
                    </View>
                    <View style={styles.slide1}>
                        <Image style={styles.img} source={require('../../assets/5.jpg')}/>
                        <TouchableOpacity onPress={this.start} style={styles.start}>
                            <Text style={{color:'#fff'}}>开始体验</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>
        )
    }
}
const styles = StyleSheet.create({
    slide1:{
        flex:1,
        alignItems:'center',
    },
    img:{
        width:'100%',
        height:'100%'
    },
    start:{
        position:'absolute',
        bottom:80,
        width:100,
        height:40,
        backgroundColor:'#f0f',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        // textAlignVertical:'center',
        borderRadius:20
        
    }
})