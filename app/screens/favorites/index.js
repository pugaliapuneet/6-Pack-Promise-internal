import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Header } from '../../components';
import { Strings } from '../../constants';
import styles from './styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../store/actions'
import Item from './Item'

const FavoritesScreen = ({ preDefinedShuffles, favoriteIds, updatePreDefinedShuffles }) => {
    useEffect(() => {
        updatePreDefinedShuffles({})
    }, []);
    return (
        <View style={styles().container}>
            <Header
                title={Strings.favorites}
                backWithText={Strings.home}
            />
            <View style={styles().container}>
                {!Boolean(favoriteIds.length) && <Text allowFontScaling={false} style={styles().note}>{Strings.notFavorites}</Text>}
                <FlatList
                    data={favoriteIds}
                    nestedScrollEnabled
                    renderItem={({ item, index }) => <Item
                        dayId={item}
                        shuffles={preDefinedShuffles}
                        fadeIndex={index % 2}
                    />}
                    keyExtractor={item => `${item}-list`}
                />
            </View>
        </View>
    );
};


const mapStateToProps = ({ user, workout, shuffle }) => {
    return {
        preDefinedShuffles: shuffle.preDefinedShuffles,
        favoriteIds: user.favoriteIds
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);
