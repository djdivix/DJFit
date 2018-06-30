import React from 'react'
import { View,Text } from 'react-native'

export default class DateHeader extends React.Component {
  render() {
    return (
		<Text>{this.props.date}</Text>

    )
  }
}