import React, { useEffect } from 'react'
import { FlatList, GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './action';
import { ApplicationState } from './redux';

function MyApp() {
    const dispatch: React.Dispatch<any> = useDispatch();
    useEffect(() =>{
        showProducts()
    },[]);

    const showProducts = async ()=>{
        await dispatch(getProducts())
    }

    return <View style={{flex:1}}>
         <View style={{margin:20, padding:20, borderRadius:10, borderWidth:2}}>
                <HeaderDetail title='Name' value='Atri Ariska Alfa'/>
                <HeaderDetail title='Alamat' value='Jln. Kemang Raya No 63, RT/RW 002/002, Pondok Gede, Jawa Barat'/>
                <HeaderDetail title='Negara' value='Indonesia'/>
                <HeaderDetail title='Pekerjaan' value='Mobile Developer'/>

                <TouchableOpacity 
                    onPress={() => showProducts()} 
                    style={{backgroundColor:'teal', padding:10, borderRadius:10}}>
                    <Text style={{textAlign:'center', color:'white'}}>Refresh</Text>
                </TouchableOpacity>
            </View>

            <BodyView />

    </View>
}
type HeaderParams={title:string, value:string}
const HeaderDetail = (v : HeaderParams)=>{
   return <View style={{flexDirection:'row', alignItems:'center', marginBottom:10, paddingBottom:3, borderBottomWidth:1}}>
        <Text style={{width:70}}>{v.title}</Text>
        <Text >:</Text>
        <Text style={{flex:1, textAlign:'right'}}>{v.value}</Text>
    </View>
}
const BodyView = ()=>{
    const productData: ProductEntity = useSelector(
        (state: ApplicationState) => state.productReducer);
    
    if(productData.loading){
        return <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                <Text>Loading ...</Text>
            </View>
    }else if(productData.product.length == 0){
        <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                <Text>Product Still Empty</Text>
            </View>
    }
    else{
        return <View style={{flex:1}}>
           
            <FlatList data={productData.product} renderItem={({item, index})=> {
                return <View style={{marginBottom:20, marginHorizontal:20, padding:20, borderRadius:10, borderWidth:2}}>
                    <Text style={{color:'teal', fontWeight:'bold', fontSize:18}}>{item.name}</Text>
                    <Text>{item.description}</Text>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <Text style={{color:'lime', fontWeight:'bold'}}>${item.price}</Text>
                        <View style={{
                            backgroundColor:
                                item.quantity< 10? 'gainsboro': 
                                item.quantity< 30? "gray": 
                                item.quantity< 50? "gainsboro":"honeydew",
                            width:50,
                            height:30,
                            justifyContent:'center',
                            alignItems:'center',
                            borderRadius:2,
                            borderWidth:1,
                        }}>
                        <Text style={{
                            color: 
                                item.quantity< 10? 'maroon': 
                                item.quantity< 30? "yellow": 
                                item.quantity< 50? "lightseagreen":"royalblue",
                            
                            }}>{item.quantity}</Text>
                        </View>
                    </View>
                </View>
            }}/>
        </View>
    }
}

export default MyApp