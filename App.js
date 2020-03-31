import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Text, Image, BackHandler,ToastAndroid, AsyncStorage } from 'react-native';
import {Router, Overlay, Scene, Tabs, Drawer, Lightbox, Modal, Actions} from 'react-native-router-flux';

import {Icon } from '@ant-design/react-native';
import Home from './src/home/Home';
import Goods from './src/goods/Goods';
import Userinfor from './src/userinfor/Userinfor';
import Login from './src/common/Login';
import SwiperPage from './src/common/SwperPage'
import SplashScreen from 'react-native-splash-screen'
import Publish from './src/userinfor/Publish';
import Register from './src/common/Register';

// App logo : 将myApp\android\app\src\main\res下的文件夹下图片换成自己的 
// 启动画面 ：react-native-splash-screen
// 如果第一次安装，一般来说都有一个引导页（普通轮播图），注意本地存储记录下状态
// 看功能，是否需要先登录，如果需要先登录，登录完记录状态（用户信息）
// 再次进入的时候，也要从本地判断是否登录过

// react native中本地存储是异步的
// 

console.disableYellowBox = true;
const App = () => {
	let [isLogin,setLogin] = useState(false);
	let [isInstall,setInstall] = useState(true);
	let now = 0;
	let init = ()=>{
		// AsyncStorage.clear()
		AsyncStorage.getItem('isInstall')
		.then(res=>{
			if(res){
				setInstall(false)
			}
		})
		
		AsyncStorage.getItem('user')
		.then(res=>{
			let user = JSON.parse(res)
			// console.log(user)
			if(!user){
				// SplashScreen.hide();
				console.log("err")
			}
			if(user&&user.token){
				setLogin(true);
				SplashScreen.hide();
			}
		})
	}
	useEffect(()=>{
		SplashScreen.hide();
		init();
	},[])
	let afterstart = ()=>{
		console.log("after install")
		setInstall(false);
	}
	if(isInstall){
		return <View style={{flex:1}}>
			<SwiperPage afterInstall={afterstart}/>
		</View>
	}
	return (
		<Router
			backAndroidHandler={()=>{
				if(Actions.currentScene == 'login'){
					if(new Date().getTime()-now<2000){
						BackHandler.exitApp();
					}else{
						ToastAndroid.show('确定要退出吗',100);
						now = new Date().getTime();
						return true;
					}
				}else if(Actions.currentScene != 'home'){
					Actions.pop();
					return true;
				}else{
					if(new Date().getTime()-now<2000){
						BackHandler.exitApp();
					}else{
						ToastAndroid.show('确定要退出吗',100);
						now = new Date().getTime();
						return true;
					}
				}
			}}
		>
			<Overlay>
			<Modal key="modal" hideNavBar>
			{/* <Scene initial={true} key="login" component={Login}/> */}
				<Lightbox key="lightbox">
					<Drawer 
						key="drawer"
						contentComponent={()=><Text>drawer</Text>}
						drawerIcon={()=><Icon name="menu"/>}
						drawerWidth={400}
					>
						<Scene key="root">
							<Tabs 
								key='tabbar'
								hideNavBar
								activeTintColor="red"
								inactiveTintColor="blue"
								tabBarStyle={{backgroundColor:'#ccc'}}
							>
								{/* 首页 */}
								<Scene key='homePage'
									hideNavBar={true}
									title='首页'
									icon={
										({focused})=><Icon 
											color={focused?'red':'blue'} 
											name="home"
										/>
									}
								>
									<Scene key='home' component={Home}/>
								
								</Scene>
								{/* 商品类 */}
								<Scene key='goodsPage'
									title='商品分类'
									hideNavBar={true}
									icon={
										({focused})=><Icon 
											color={focused?'red':'blue'} 
											name="file"
										/>
									}
									
								>
									<Scene key="goods" component={Goods}/>
								</Scene>
								{/* 个人中心 */}
								<Scene 
									key='userPage'
									hideNavBar={true}
									hideDrawerButton
									icon={({focused})=>
										<Icon 
											color={focused?'red':'blue'} 
											name='file'/>
										}
									title="个人中心"
								>
									<Scene key="userinfor" component={Userinfor}/>
									<Scene 
										title="我的发布" 
										key="publish"
										hideTabBar
										hideNavBar={false}
										component={Publish}
										navigationBarStyle={{backgroundColor:'red'}}
										titleStyle={{flex:1,textAlign:'center',color:'#fff'}}
									/>
								</Scene>
								
							</Tabs>
						</Scene>
					</Drawer>
				</Lightbox>
				<Scene initial={!isLogin} key="login" component={Login}/>
				<Scene key="register" component={Register}/>
			</Modal>
			</Overlay>
		</Router>
	);
};

export default App;