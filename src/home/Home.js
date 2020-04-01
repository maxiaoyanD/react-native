import React, { Component } from 'react'
import {StyleSheet,View,Text, Image,ScrollView,TextInput, StatusBar,Dimensions } from 'react-native';
import { Icon } from '@ant-design/react-native';
import Button from 'react-native-button';
import Swiper from 'react-native-swiper';
console.disableYellowBox = true;
const {width} = Dimensions.get('window');
export default class Home extends Component {

	render() {
		return (
			<View>
				
				<StatusBar backgroundColor='red'/>
				<View style={styles.header}>
					<View style={{flexDirection:'row',height:60,justifyContent:'center',alignItems:'center'}}>
							<View style={styles.search}>
								<View style={{position:'absolute',left:10}}>
									<Icon name="search" color="#fff"/>
								</View>
								<TextInput 
									style={{height:40,width:width*0.8,backgroundColor:'#fff',opacity:0.8,borderRadius:50,paddingLeft:40}}
									placeholderTextColor='grey'
									placeholder="请输入您要搜索的关键字"
								/>
							</View>
							<Icon name="search" color="#fff"/>
					</View>  
				</View>
				<ScrollView>
				<View style={styles.wiper}>
					<Swiper 
						height={200}
						autoplay
						autoplayTimeout={1}
					>
						<View style={styles.slide}>
							<Image style={{width:width,height:200}} source={require('../../assets/pic/carousel1.jpg')}/>
						</View>
						<View style={styles.slide}>
							<Image style={{width:width,height:200}} source={require('../../assets/pic/carousel2.jpg')}/>
						</View>
					</Swiper>
				</View>
				
				<View style={{width:width,height:550,backgroundColor:'#f5f5f5'}}>
					<View style={styles.list}>
						<Image 
							style={{width:40,height:40,marginLeft:20}}
							source={require('../../assets/pic/repair.jpg')}/>
						<Text style={{marginLeft:15,fontSize:16,marginRight:width*0.53}}>居家维修</Text>
						<Icon name="right" color="#cecece"/>
					</View>
					<View style={styles.list}>
						<Image 
							style={{width:40,height:40,marginLeft:20}}
							source={require('../../assets/pic/flag.jpg')}/>
						<Text style={{marginLeft:15,fontSize:16,marginRight:width*0.53}}>住宿优惠</Text>
						<Icon name="right" color="#cecece"/>
					</View>
					<View style={styles.list}>
						<Image 
							style={{width:40,height:40,marginLeft:20}}
							source={require('../../assets/pic/jiesong.jpg')}/>
						<Text style={{marginLeft:15,fontSize:16,marginRight:width*0.53}}>出租接送</Text>
						<Icon name="right" color="#cecece"/>
					</View>
					<View style={styles.list}>
						<Image 
							style={{width:40,height:40,marginLeft:20}}
							source={require('../../assets/pic/gift.jpg')}/>
						<Text style={{marginLeft:15,fontSize:16,marginRight:width*0.53}}>E族活动</Text>
						<Icon name="right" color="#cecece"/>
					</View>

					<View style={{height:40,flexDirection:'row',justifyContent:'center',marginTop:20}}>
						<Button style={styles.btn}>发布需求</Button>
					</View>
					<View style={styles.font}>
						<Text style={{fontSize:16,color:'#929191'}}>©E族之家 版权所有</Text>
					</View>
				</View>
				</ScrollView>
			</View>
		)
	}
}

const  styles = StyleSheet.create({
	header:{
		height:60,
		backgroundColor:'#f23030'
	},
	search:{
		width:width*0.8,
		height:60,
		color:'#fff',
		marginRight:20,
		flexDirection:'row',
		alignItems:'center',
		position:'relative'
	},
	wiper:{
		height:200,
		backgroundColor:'red'
	},
	slide:{
		width: width,
		height: 200,
		justifyContent: 'center',
		alignItems: 'center'
	},
	list:{
		width:width,
		height:80,
		backgroundColor:'#fff',
		flexDirection:'row',
		marginTop:10,
		alignItems:'center'
	},
	btn:{
		width:width*0.8,
		height:40,
		borderRadius:10,
		backgroundColor:'#f23030',
		color:'#fff',
		paddingTop:10
	},
	font:{
		width:width,
		height:20,
		flexDirection:'row',
		justifyContent:'center',
		marginBottom:20,
		marginTop:20,
	}
})