
import { useContext } from "react";
import {Text , View, StyleSheet, FlatList} from "react-native";
import FavoriteItem from "../components/favoriteItem";
import { Context } from "../context";
export default function Favorite(){

    const {favoriteItems} = useContext(Context)

    console.log(favoriteItems)

    if(!favoriteItems.length)
        {
            return (
                <View style = {styles.noFavorite}>
                    <Text style = {styles.noFavoriteText}>
                        There are no Favorite items Present :D
                    </Text>
                </View>
            )
        }

    return (
        <View>
            <FlatList
            data = {favoriteItems}
            renderItem={(itemData)=> ( <FavoriteItem
            title={itemData.item.title}
            reason = { itemData.item.reason}
            
            />)}
            keyExtractor={(itemData)=> itemData.id}

            />
        </View>
    )
}

const styles = StyleSheet.create(
    {
        noFavorite : {
            padding: 20,
            alignItems: "center"
        },
        noFavoriteText: {
            fontWeight: "bold",
            fontSize: 20,
            color : "#000"
        }
    }
)