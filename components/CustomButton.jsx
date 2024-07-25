import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        className={`bg-secondary-100 rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${ isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}
    >
      <Text className={`text-xl text-primary font-psemibold ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton