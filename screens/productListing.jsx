import { useContext } from "react";
import { Context } from "../context";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ProductListsItem from "../components/productListsItem";
import { useNavigation } from "@react-navigation/native";

function createRandonColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
export default function ProductListing() {
  const { loading, products } = useContext(Context);

  const navigation = useNavigation()

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} color={"red"} size={"large"} />
    );
  }
  const handleOnPress =(getId)=>{
    navigation.navigate('productDetails', {
        productId: getId,
    })
  }

  return (
    <View>
      <FlatList
        data={products}
        renderItem={(itemData) => (
          <ProductListsItem
            title={itemData.item.title}
            bgColor={createRandonColor()}
            onPress={()=>handleOnPress(itemData.item.id)}
          />
        )}
        keyExtractor={(itemData) => itemData.id}
        numColumns={2}
      />
      <Text>ProductListing</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
