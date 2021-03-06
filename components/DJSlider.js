import React from 'react'
import { View, Slider, Text } from 'react-native'

export default function DJSlider ({ max, unit, step, value, onChange }) {
  return (
    <View>
      <Slider
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      />
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
		<Text>DJ</Text>
      </View>
    </View>
  )
}