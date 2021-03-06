import React, {Component} from 'react'
import { View,TouchableOpacity,Text } from 'react-native'
import { getMetricMetaInfo,timeToString,getDailyReminderValue } from '../utils/helpers'
import DJStepper from './DJStepper'
import DJSlider from './DJSlider'
import DateHeader from './DateHeader'
import TextButton from './TextButton'
import { Ionicons } from '@expo/vector-icons'
import {submitEntry, resetEntry} from '../utils/Djapi'
import { connect } from 'react-redux'
import { addEntry } from '../actions'

function SubmitBtn({onPress})
	{
		return(
		<TouchableOpacity
		onPress = {onPress}>
		<Text>Submit</Text> 
		</TouchableOpacity>
		)
	}	
	

class AddEntry extends Component {
	
	state = {
		run: 0,
		bike: 0,
		swim: 0,
		sleep: 0,
		eat: 0
	}
	
	increment = (metric) => {
		const {step, max} = getMetricMetaInfo(metric)
		
		this.setState((state) => {
			const count = state[metric] + step
		
		return {
		... state,
		[metric] : count > max ? max : count
		}
	})
	}
	decrement = (metric) => {
		const {step} = getMetricMetaInfo(metric)
		
		this.setState((state) => {
			const count = state[metric] - step
		
		return {
		... state,
		[metric] : count < 0 ? 0 : count
		}
	})
	}
	slide = (metric,value) => {
		this.setState(() => ({
			[metric] : value
		})
		)
	}
	
	submit = () => {
		const key = timeToString()
		const entry = this.state
		
		this.props.dispatch(addEntry({
		[key] : entry
		}))
		
		this.setState(() => ({
		run: 0,
		bike: 0,
		swim: 0,
		sleep: 0,
		eat: 0
		}))
		
		submitEntry({ key,entry })
		

	}

	onreset = () => {
		const key = timeToString()
		this.props.dispatch(addEntry({
			[key] : getDailyReminderValue()
		}))
	}
	
	render(){
		
		const metainfo = getMetricMetaInfo()
		
		
		if(this.props.alreadyLogged){
			return(
			<View>
				<Ionicons
				name = 'ios-happy-outline'
				size = {100}
				/>
				<TextButton onPress = {this.onreset}>
				Reset
				</TextButton>
				<Text> You already entered the info for today </Text>
			</View>
			)
			
		}
		
		return (
			<View>
			<DateHeader date = {(new Date()).toLocaleDateString()} />

			{Object.keys(metainfo).map(key => {
				
			const {getIcon,type, ...rest} = metainfo[key]

			const value = this.state[key]
			
				return(
					<View key = {key}>
					{getIcon()}	
					{type === 'slider'?
					<DJSlider 
					value = {value}
					onChange = {(value) => this.slide(key,value)}
					{...rest}/> :
					<DJStepper
					value = {value}
					onIncrement = {() => this.increment(key)}
					onDecrement = {() => this.decrement(key)}
					{...rest}/>}
					</View>
				)
			})

			}
			<SubmitBtn onPress = {this.submit} />
			</View>
		)
	}
}
function mapStateToProps(state) {
	const key = timeToString()
	return{
		alreadyLogged : state[key] && typeof state[key].today === 'undefined'
	}
}
export default connect(mapStateToProps)(AddEntry)
