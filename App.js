import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { View, Text, Button, TextInput } from 'react-native'
import NetInfo from '@react-native-community/netinfo'

const App = () => {
  const [message, setMessage] = useState('')
  const [customMessage, setCustomMessage] = useState('')
  const [ip, setIp] = useState('')
  const [serverIp, setServerIp] = useState('')

  useEffect(() => {
    if (serverIp) {
      const socket = io(`http://${serverIp}:3000`)
      socket.on('message', (message) => {
        console.log(`Received message: ${message}`)
        setMessage(message)
      })
    }

    NetInfo.fetch('wifi').then(state => {
      setIp(state.details.ipAddress)
    })
  }, [serverIp])

  const sendMessage = () => {
    const socket = io(`http://${serverIp}:3000`)
    socket.emit('message', customMessage)
    setCustomMessage('')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>React Native Socket.io Example2</Text>
      <Text>Your IP address is: {ip}</Text>
      <TextInput
        value={serverIp}
        onChangeText={setServerIp}
        placeholder='Enter server IP address'
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        keyboardType='numeric'
      />
      <TextInput
        value={customMessage}
        onChangeText={setCustomMessage}
        placeholder='Enter custom message'
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        keyboardType='numeric'
      />
      <Button title='Send Message' onPress={sendMessage} />
      <Text>{message}</Text>
    </View>
  )
}

export default App
