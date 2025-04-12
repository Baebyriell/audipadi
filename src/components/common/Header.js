import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar,
  Platform 
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = ({ 
  title, 
  leftIcon, 
  rightIcon, 
  onLeftPress, 
  onRightPress,
  backgroundColor = COLORS.white,
  titleColor = COLORS.black,
  iconColor = COLORS.black,
  showStatusBar = true,
  style
}) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor,
          paddingTop: Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight,
        },
        style
      ]}
    >
      {showStatusBar && (
        <StatusBar
          backgroundColor={backgroundColor}
          barStyle={backgroundColor === COLORS.white ? 'dark-content' : 'light-content'}
        />
      )}
      
      <View style={styles.header}>
        {leftIcon ? (
          <TouchableOpacity 
            style={styles.leftButton} 
            onPress={onLeftPress}
          >
            <Icon 
              name={
                leftIcon === 'back' || leftIcon === 'arrow-back' 
                  ? 'arrow-left' 
                  : leftIcon
              } 
              size={24} 
              color={iconColor} 
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.leftPlaceholder} />
        )}
        
        <Text 
          style={[
            styles.title,
            { color: titleColor }
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        
        {rightIcon ? (
          <TouchableOpacity 
            style={styles.rightButton} 
            onPress={onRightPress}
          >
            <Icon name={rightIcon} size={24} color={iconColor} />
          </TouchableOpacity>
        ) : (
          <View style={styles.rightPlaceholder} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
  },
  leftButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftPlaceholder: {
    width: 40,
  },
  rightPlaceholder: {
    width: 40,
  },
  title: {
    ...FONTS.h3,
    flex: 1,
    textAlign: 'center',
  },
});

export default Header;
