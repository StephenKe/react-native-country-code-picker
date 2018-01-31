# react-native-country-code-picker

A react native country-code-picker plugin without any ios&android configuration

### Installation

`npm install react-native-country-code-picker --save` or
`yarn add react-native-country-code-picker --save`

### Example

![image](https://github.com/StephenKe/react-native-country-code-picker/blob/master/image/rnccpDemo.gif)

```javascript
import React, { Component } from 'react';
import CountryCodePicker from 'react-native-country-code-picker';

export default class Example extends Component {
  render() {
    return (
      <CountryCodePicker isShow={true} onPick={(res) => { setTimeout(() => { alert(res.phoneCode) }, 1000) }} />
    );
  }
}
```

### API

| Property | Type | Default | Description |
|-------------|----------|--------------|----------------------------------------------------------------|
| isShow | `Boolean` | `false` | Whether show or not |
| onPick   | `Function` |  | callback function after picked |
| animationType | `String` | `slide` | animation('slide', 'fade', 'none') when show and hide |

#### onPick response Object

| Property | Type | Description |
|-------------|----------|----------------------------------------------------------------|
| countryName | `String` | country name |
| countryPinyin   | `String` | country name spell in Chinese PinYin |
| phoneCode | `String` | area code |
| countryCode | `String` | country code |

### License

[MIT](LICENSE)
