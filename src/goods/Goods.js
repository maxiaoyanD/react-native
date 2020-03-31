
import React,{Component} from 'react';


import {
  StyleSheet,
  View,//相当于div
  Text,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  box:{
    width:width,
    backgroundColor:'#eeeeee',
  },
  search:{
    width:width,
    height:60,
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'center',//水平居中
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:'#e8e8e8' 
  },
  inp:{
    width:0.9*width,
    height:40,
    backgroundColor:'#eeeeee',
    borderRadius:5,
    position:'relative',
  },
  list:{
    height:50,
    backgroundColor:'#fff'
  },
  first:{
    width:80,
    marginLeft:20,
    color:"red",
    fontSize:16,
    justifyContent:'center',
    marginTop:10
  },
  next:{
    width:80,
    marginLeft:20,
    fontSize:16,
    justifyContent:'center',
    marginTop:10
  },
  slide:{
    width:0.43 * width,
    height:0.55*width,
    backgroundColor:'#fff',
    marginLeft:20,
    marginTop:20,
  },
  tit:{
    fontSize:14,
    marginTop:width*0.08,
    marginLeft:10,
    color:'gray'
  },
  price:{
    fontSize:14,
    marginTop:10,
    color:'red',
    marginLeft:10,

  }
});
  let data = [];
  for(var i =0;i<6;i++){
    if(i%2 ===0){
      data.push({
        title:"Oishi/上好佳玉米卷20包膨化休闲食品Oisihi/上好佳",
        price:'36.00',
        source:'./assets/shj1.png',
        key:i});
    }else{
      data.push({
        title:"Oishi/上好佳玉米卷20包膨化休闲食品Oisihi/上好佳",
        price:'36.00',
        source:'./assets/shj2.png',
        key:i});
    }
      
  }
const LieBiao = () => {
  //实现Tabs
  return (
    <View>
        {/* 搜索框 */}
        <View style={styles.search}>
          <View style={styles.inp}>
            <TextInput 
              placeholder="请输入商品名称"
              placeholderTextColor="grey"
            />
            <Image style={{width:20,height:20,position:'absolute',top:10,right:10}} source={require('../../assets/search.png')}/>
          </View>
          </View>
        {/* 列表 */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.list}
        >
          <Text style={styles.first}>综合</Text>
          <Text style={styles.next}>销量</Text>
          <Text style={styles.next}>新品</Text>
          <Text style={styles.next}>综合</Text>
          <Text style={styles.next}>信用</Text>
        </ScrollView>
        
        <FlatList 
            data={data}
          ListFooterComponent={<View style={{height:150,width:width}}></View>}
          numColumns={2}
          renderItem={
            ({item})=>
            <View style={styles.slide}>
              <Image 
                style={{width:width*0.2,height:width*0.2,marginTop:width*0.08,marginLeft:width*0.08}} 
                source={
                  (item.key%2) ? require('../../assets/shj2.png'): require('../../assets/shj1.png')}/>
              <Text style={styles.tit}>{item.title}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          }
        />

    </View>
  );
};

export default LieBiao;
