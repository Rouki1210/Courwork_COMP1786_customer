import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import TabBarButton from './TabBarButton';



export function TabBar({ state, descriptors, navigation } : BottomTabBarProps) {

    const [dimensions, setDimensions] = useState({ width: 20, height: 100 });

    const buttonWidth = dimensions.width / state.routes.length;

    useEffect(() => {
        tabPositionX.value = withTiming(buttonWidth * state.index, {
            duration: 200,
        });
    }, [state.index]);

    const onTabBarLayout = (e: LayoutChangeEvent) => {
        setDimensions({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
        });
    }

    const tabPositionX = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: tabPositionX.value }],
        };
    });

    return (
        <View onLayout={onTabBarLayout} style={styles.tabbar}>
            <Animated.View style={[ animatedStyle, { position: 'absolute', top: 0, left: 20, height: 2, width: buttonWidth/2, backgroundColor: Colors.primary }]} />
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabBarButton
                        key={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        label={label}
                        routeName={route.name}
                    />
                );
            })}
        </View>
    );

}

export default TabBar;

const styles = StyleSheet.create({
    tabbar:{
        flexDirection: 'row',
        paddingTop: 16,
        paddingBottom: 40,
        backgroundColor: '#121212', // dark background
    }
});