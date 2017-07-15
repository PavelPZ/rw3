//https://github.com/d-a-n/react-native-modal-picker
//https://stackoverflow.com/questions/41181683/react-native-ios-picker-is-always-open

import React, { Component } from 'react';
import { Text, View, TextInput, Button, Picker } from 'react-native';

<Picker
  selectedValue={this.state.language}
  onValueChange={(itemValue, itemIndex) => alert(itemValue)}>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker>

