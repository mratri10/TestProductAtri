import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteProduct, getListProduct, resetDetailProduct} from '../../action';
import {ApplicationState} from '../../redux';
import ProductPage from '../Product';

function DetailProduct({item, index, update}: TypeDetail) {
  const dispatch: React.Dispatch<any> = useDispatch();
  const detailProduct: ProductsDetailEntity = useSelector(
    (state: ApplicationState) => state.detailReducer,
  );
  const deleteProductResult: ProductsDeleteEntity = useSelector(
    (state: ApplicationState) => state.deleteReducer,
  );
  const deleteData = async () => {
    await dispatch(deleteProduct(item.id));
  };

  useEffect(() => {
    if (deleteProductResult.isDelete) {
      resetDetail();
    }
  }, [deleteData]);

  const resetDetail = async () => {
    await dispatch(resetDetailProduct());
    await dispatch(getListProduct());
  };

  if (detailProduct.loading || deleteProductResult.loading) {
    return (
      <View
        style={{
          flexDirection: 'column',
          borderRadius: 10,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'grey',
          padding: 10,
          marginHorizontal: 20,
          marginTop: 20,
          backgroundColor: item.isActive ? 'white' : '#ddd',
        }}>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flexDirection: 'column',
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: item.isActive ? 'white' : '#ddd',
      }}>
      <Image
        key={index}
        source={{
          uri: item.picture,
        }}
        style={{width: 100, height: 100, borderRadius: 20}}
      />
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.name}</Text>
      <View style={styleApp.weather}>
        <Text style={{fontSize: 16, fontWeight: '400'}}>qty: {item.qty}</Text>
        <View style={{marginLeft: 10, flex: 1}}>
          <Text style={{fontSize: 12, fontWeight: 'bold', textAlign: 'right'}}>
            exp: {item.expiredAt.substring(0, 10)}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <TouchableOpacity
          onPress={update}
          style={[styleApp.buttonApp, {backgroundColor: 'blue'}]}>
          <Text style={styleApp.textButton}>Update</Text>
        </TouchableOpacity>
        <View style={{width: 20}} />
        <TouchableOpacity
          onPress={deleteData}
          style={[styleApp.buttonApp, {backgroundColor: 'red'}]}>
          <Text style={styleApp.textButton}>Delete</Text>
        </TouchableOpacity>
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
    </View>
  );
}

const styleApp = StyleSheet.create({
  app: {
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  txtDashTitle: {
    fontSize: 14,
  },
  txtDashDesc: {
    fontSize: 12,
    fontWeight: '300',
  },
  txtDashMain: {
    fontSize: 26,
  },
  txtDashItem: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  dashItem: {
    alignItems: 'center',
  },
  weather: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonApp: {
    flex: 1,
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DetailProduct;
