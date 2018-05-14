# react-native

## 调试篇

###  相关指令
``` shell
react-native init AwesomeProject  #  初始化一个项目
cd AwesomeProject                #  进入这个项目
npm install                   #  下载这个项目所依赖的包
react-native run-android       # 手机调试
adb shell input keyevent 82    ## 相当于手机摇一摇 reLoad
react-native upgrade  # 升级项目模板文件
react-native link  XXXX  # link 一下
react-native unlink  XXXX  # unlink 一下 逆操作
# 步骤例如:
  npm install react-native-vector-icons --save  # yarn add react-native-vector-icons
  yarn
  react-native link react-native-vector-icons
  react-native run-android
  # 使用即可
```

## 修改app配置篇

### 名字(应用名称)

1、找到读取app_name的地方

进入：android/app/src/main/AndroidManifest.xml,
找到 android:label=”@string/app_name”。这个对应的就是APP的名称。

@string类似于定义好的变量，直接调取即可。

2、修改app的名称

进入：android/app/src/main/res/valuse/strings.xml目录下

修改即可：
``` javascript
  <resources>
      <string name="app_name">你的APP名称</string>
  </resources>
```
### 图标(应用图标)

1、找到读取APP图标的地方

进入目录：：android/app/src/main/AndroidManifest.xml

找到： android:icon=”@mipmap/ic_launcher”
这里的ic_launcher就是我的图标。这里也是从其他地方引用的，因此需要在被引用的地方修改。

2、修改图标
进入目录：android/app/src/main/res/mipmap–xxx,
（PS：这里需要注意，可能是mipmap,也可能是drawable）,我这里是mipmap。这里只需要保持一致即可。

如果是：是mipmap，则android:icon=”@mipmap/ic_launcher”
如果是：是drawable，则android:icon=”@drawable/ic_launcher”。

目录结构： android/app/src/main/res/mipmap–xxx,

这里面的图标大小都不一样，但是名字是一样的。图标分为
48x48,72x72,96x96,144x144.适配安卓不同机型
我们替换的话，只需要替换这四个文件夹里面的图片即可。但是要把图片名字改为 ic_launcher。

### 启动页面

## 导航篇

### 使用:

``` shell
  yarn add react-navigation
  # or with npm
  # npm install --save react-navigation
```
### 引入:

```javascript
  import {
    StackNavigator,
  } from 'react-navigation';
```
### 定义:

``` javascript
  const RootStack = StackNavigator({
    Home: {   // 名字
      screen: HomeScreen,  // 对应组件
    },
    Details: {
      screen: DetailsScreen  // 对应组件
    },
    {
      initialRouteName: 'Home',  // 初始页面
    }
  });
  export default class App extends React.Component {
    render() {
      return <RootStack />;
    }
  }
```
### 总结:
``` text
  与Web浏览器一样，“React Native”不具有内置API进行导航。响应导航可为您提供此功能，以及iOS和Android手势和动画以在屏幕之间过渡。
  StackNavigator是一种使用路由配置对象和选项对象并返回反应组件的函数。路由配置对象中的密钥是路由名称，这些值是该路由的配置。配置上的唯一必需属性是屏幕（用于路由的组件）。
  要指定堆栈中的初始路由是什么，请在堆栈选项对象上提供初始路由(initialRouteName)。
```

### 屏幕之间的切换:
```javascript
  this.props.navigation.navigate('Details'); // 切换到屏幕 Details
  // this.props.navigation.navigate(‘RouteName’)将一个新的路径推送到StackNavigator。我们可以随心所欲地叫它多少次，它还会继续推进路线。
  this.props.navigation.goBack()  // 返回到上一页面
  // 标题栏将自动显示后退按钮，但您可以通过调用this.props.navigation.goBack（）以编程方式返回。在Android上，硬件后退按钮按预期工作。
```

### 通过路由传递参数:
```javascript
  this.props.navigation.navigate('Details', {
    itemId: 86,
    otherParam: 'anything you want here',
  });  // 切换到屏幕 Details,并向该页面传递参数
  //  react-navigation-props-mapper 也可以用这个包（以后了解）
```

### 读取参数:
```javascript
  const { params } = this.props.navigation.state;
  const itemId = params ? params.itemId : null;
  const otherParam = params ? params.otherParam : null;
  // 你可以从这里this.props.navigation.state读到这些参数。如果没有指定参数，则为空。
```

### 设置头部标题:
``` text
  屏幕组件可以有一个名为navigationOptions的静态属性，它是一个对象或一个返回包含各种配置选项的对象的函数。我们用于标题标题的是标题，如以下示例所示。
```
```javascript
  class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Home',  // 标题
    };

    /* render function, etc */
  }

  class DetailsScreen extends React.Component {
    static navigationOptions = {
      title: 'Details',   // 标题
    };

    /* render function, etc */
  }
  // StackNavigator默认使用平台约定，因此在iOS中标题将居中，在Android上它将左对齐。
  // 但是，当我们标题中要用到参数时：我们必须这样写：
  class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : 'A Nested Details Screen',
    }
  };
  /* render function, etc */
  // navigation  - 屏幕的导航支柱，屏幕的路由位于navigation.state处。
  // screenProps - 从导航器组件上方传递的道具
  // navigationOptions - 如果未提供新值，将使用的默认或先前选项
}
```
```javascript
  //  通常需要从挂载的屏幕组件本身更新活动屏幕的navigationOptions配置。我们可以使用this.props.navigation.setParams 来做到这一点
  this.props.navigation.setParams({otherParam: 'Updated!'})
```

### 自定义标题样式:
```javascript
  class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Home',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };

    /* render function, etc */
  }
  // headerStyle :整体头部样式
  // headerTintColor :后退按钮和标题都使用此属性作为其颜色
  // headerTitleStyle :自定义标题的样式
  // 这里有一些事情要注意：在iOS上，状态栏文本和图标是黑色的，这在黑色背景下看起来不太大。我们不在这里讨论它，但是您应该确保将状态栏配置为适合您的屏幕颜色，如状态栏指南中所述。我们设置的配置只适用于主屏幕；当导航到“详细信息”屏幕时，默认样式将返回。我们将介绍如何在屏幕之间共享导航选项。
```

### android 标题居中:
``` javascript
export default class LeaderboardScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '排行榜',
            headerStyle: {
              height: 40,
              backgroundColor: '#DD2219',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '400',
              color: '#fff',
              fontSize: 16,
              alignSelf: 'center',
              textAlign: 'center'
            },
            headerTitle: <Text style={{flex: 1,fontWeight: '400',color: '#fff',fontSize: 16,alignSelf: 'center',textAlign: 'center'}}>排行榜</Text>,
            headerRight: <View />
        }
    };
    render() {
        return (
            <View>
                <Text>LeaderboardScreen</Text>
            </View>
        );
    }
}
```

### 配置全局标题样式:
```javascript
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    /* No more header config here! */
  };

  /* render function, etc */
}

/* other code... */

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);
```

### 特殊标题设置
```javascript
  // 屏幕组件上指定的navigationOptions会与其父级StackNavigator的navigationOptions一起合并，屏幕组件上的选项优先。让我们使用这些知识来反转细节屏幕上的背景和色彩。
  class DetailsScreen extends React.Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
      const { params } = navigation.state;

      return {
        title: params ? params.otherParam : 'A Nested Details Screen',
        /* These values are used instead of the shared configuration! */
        headerStyle: {
          backgroundColor: navigationOptions.headerTintColor,
        },
        headerTintColor: navigationOptions.headerStyle.backgroundColor,
      };
    };

    /* render function, etc */
  }
```

### 自定义标题组件
```javascript
  // 有时候，你需要更多的控制，而不仅仅是改变标题的文本和样式--例如，你可能想用一个图像代替标题，或者把标题变成一个按钮。在这些情况下，您可以完全覆盖用于标题的组件，并提供您自己的组件。
  class LogoTitle extends React.Component {
    render() {
      return (
        <Image
          source={require('./spiro.png')}
          style={{ width: 30, height: 30 }}
        />
      );
    }
  }

  class HomeScreen extends React.Component {
    static navigationOptions = {
      // headerTitle instead of title
      headerTitle: <LogoTitle />,
    };
    // headerTitle默认为显示标题的Text组件。
    /* render function, etc */
  }
```

### 向标题添加一个按钮
```javascript
  class HomeScreen extends React.Component {
    static navigationOptions = {
      headerTitle: <LogoTitle />,
      headerRight: (
        <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="#fff"
        />
      ),
    };
  }
  // 每当用户可以从当前屏幕返回时，后退按钮将在StackNavigator中自动呈现-换句话说，当堆栈中有多个屏幕时，后退按钮将被呈现。 一般来说，这就是你想要的。但是，在某些情况下，您可能希望通过上面提到的选项来定制Back按钮，在这种情况下，您可以指定HeaderLeft，就像我们对Header Right那样，并且完全覆盖Back按钮.
  // 您可以通过导航选项中的HeaderLeft和Header Right属性在标头中设置按钮。 Back按钮完全可以用HeaderLeft进行定制，但是如果您只想更改标题或图像，还有其他导航选项--HeaderBackTitle、HeaderTruncatedBackTitle和Header BackImage。
```
### 打开一个全屏model

```javascript
  class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
      const params = navigation.state.params || {};

      return {
        headerLeft: (
          <Button
            onPress={() => navigation.navigate('MyModal')}
            title="Info"
            color="#fff"
          />
        ),
        /* the rest of this config is unchanged */
      };
    };

    /* render function, etc */
  }

  class ModalScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30 }}>This is a modal!</Text>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Dismiss"
          />
        </View>
      );
    }
  }

  const MainStack = StackNavigator(
    {
      Home: {
        screen: HomeScreen,
      },
      Details: {
        screen: DetailsScreen,
      },
    },
    {
      /* Same configuration as before */
    }
  );

  const RootStack = StackNavigator(
    {
      Main: {
        screen: MainStack,
      },
      MyModal: {
        screen: ModalScreen,
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
    }
  );
  // 若要更改StackNavigator上的转换类型，可以使用模式配置。当设置为模态时，所有屏幕从下到上都是动画的，而不是从右到左。这适用于整个StackNavigator，因此为了在其他屏幕上使用从右到左的转换，我们添加了另一个具有默认配置的导航堆栈。 导航遍历导航器树，找到一个可以处理导航操作的导航器。
```

## redux篇

### 下载所依赖的包
``` shell
  cnpm install --save react-redux
  cnpm install --save react-test-renderer
  cnpm install --save redux
  cnpm install --save redux-actions
  cnpm install --save redux-thunk
  yarn add react-redux redux redux-actions redux-thunk --dev
```

## Warning警告篇

### 'VirtualizedList: missing keys for items, make sure to specify a key property on each item or provide a custom keyExtractor.'

``` javascript
 // 解决办法：
 // 把这个属性添加到 <FloatList/> 里面
    keyExtractor = {this._extraUniqueKey}

    _extraUniqueKey(item ,index){
      return "index"+index;
    }
```

### 'componentWillMount is deprecated and will be removed in the next major version. Use componentDidMount instead. As a temporary workaround, you can rename to UNSAFE_componentWillMount.'

```javascript
  // componentWillMount 将在下一个版本弃用
  // 解决办法：
  可不必管他
```

## 组件篇

### 图标（icon）

#### 例如: react-native-vector-icons 组件

- 1. 下载图标的包

``` shell
  npm install react-native-vector-icons --save   # yarn add react-native-vector-icons 下载依赖
  yarn
  react-native link react-native-vector-icons  # link 加载一下
  react-native run-android   # 运行打包
```

