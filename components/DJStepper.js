import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {FontAwesome} from '@expo/vector-icons'

export default function DJStepper ({ max, unit, step, value, onIncrement, onDecrement }) {
  return (
    <View>
	  <View>
		<TouchableOpacity onPress = {onIncrement}>
			<FontAwesome name = 'plus' size = {30} color = {'black'} />
		</TouchableOpacity>
		<TouchableOpacity onPress = {onDecrement}>
			<FontAwesome name = 'minus' size = {30} color = {'black'} />
		</TouchableOpacity>
	  </View>
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
		<Text>DJ</Text>
      </View>
    </View>
  )
}