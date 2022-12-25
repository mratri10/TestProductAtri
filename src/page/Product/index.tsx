import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getDetailProduct, getListProduct} from '../../action';
import {ApplicationState} from '../../redux';

function ProductPage() {
  const dispatch: React.Dispatch<any> = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await dispatch(getListProduct());
  };

  const listProduct: ProductsListEntity = useSelector(
    (state: ApplicationState) => state.productReducer,
  );

  useEffect(() => {
    if (listProduct.data) {
      getDetail(listProduct.data[0].id);
    }
  }, [listProduct]);
  const getDetail = async (id: string) => {
    await dispatch(getDetailProduct(id));
  };
  if (listProduct.loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Loading ...</Text>
      </View>
    );
  }
  return (
    <View style={{marginLeft: 5}}>
      <FlatList
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        data={listProduct.data}
        renderItem={({item, index}) => {
          return <ItemProduct index={index} item={item} />;
        }}
      />
    </View>
  );
}

type TypeProduct = {
  item: Products;
  index: number;
};
const ItemProduct = ({index, item}: TypeProduct) => {
  const dispatch: React.Dispatch<any> = useDispatch();
  const getDetail = async (id: string) => {
    await dispatch(getDetailProduct(id));
  };
  return (
    <TouchableOpacity
      onPress={() => getDetail(item.id)}
      style={{
        marginRight: 5,
        flex: 1,
        flexDirection: 'column',
        marginBottom: 5,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        backgroundColor: item.isActive ? 'white' : '#ddd',
      }}>
      <Image
        key={index}
        source={{
          uri: item.picture,
        }}
        style={{width: 70, height: 70, borderRadius: 20}}
      />
      <Text style={{fontSize: 14, fontWeight: 'bold'}}>{item.name}</Text>
      <View style={styleW.weather}>
        <Text style={{fontSize: 14, fontWeight: '400'}}>{item.qty}</Text>
        <View style={{marginLeft: 10, flex: 1}}>
          <Text style={{fontSize: 10, fontWeight: 'bold', textAlign: 'right'}}>
            exp: {item.expiredAt.substring(0, 10)}
          </Text>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          borderRadius: 5,
          borderWidth: 2,
          padding: 5,
        }}>
        <Text style={{fontSize: 10, fontWeight: 'bold', color: 'green'}}>
          {item.id}
        </Text>
      </View>
      {item.isActive ? (
        <View />
      ) : (
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            borderRadius: 5,
            borderColor: 'red',
            borderWidth: 2,
            padding: 5,
          }}>
          <Text style={{fontSize: 10, fontWeight: 'bold', color: 'red'}}>
            Non-Active
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styleW = StyleSheet.create({
  headWeather: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  descWeather: {
    fontSize: 10,
    fontWeight: '400',
  },
  weather: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default ProductPage;
