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

## 组件篇

### 图标（icon）

#### 例如: react-native-vector-icons 组件

可前往 [react-native-vector-icons 组件github官网](https://github.com/oblador/react-native-vector-icons) 查看详细教程

- 1. 下载图标的包

``` shell
  npm install react-native-vector-icons --save   # yarn add react-native-vector-icons 下载依赖
  yarn
  react-native link react-native-vector-icons  # link 加载一下
  react-native run-android   # 运行打包
```
- 2. 使用图标：

``` javascript 
  import Icon from 'react-native-vector-icons/Ionicons';  // 引入 
  // 使用
  <Icon 
    name={'ios-search-outline'}
    style={styles.inputIcon}
    size={25} 
  />
```

### Toast (弹出框)

这里推荐两种组件:
  [react-native-easy-toast 组件](https://github.com/hikevinxu/react-native-easy-toast)
  [react-native-root-toast 组件](https://github.com/hikevinxu/react-native-root-toast)
可以自行选择。

#### 例如 react-native-easy-toast 组件

- 1.安装

``` shell
  npm i react-native-easy-toast --save

```

- 2.使用

``` jsx
    import Toast, {DURATION} from 'react-native-easy-toast'
    render() {
      return (
          <View style={styles.container}>
              <TouchableHighlight
                  style={{padding: 10}}
                  onPress={()=>{
                      this.refs.toast.show('hello world!',DURATION.LENGTH_LONG);
                  }}>
                  <Text>Press me</Text>
              </TouchableHighlight>
              <Toast
                  ref="toast"
                  style={{backgroundColor:'red'}}
                  position='top'
                  positionValue={200}
                  fadeInDuration={750}
                  fadeOutDuration={1000}
                  opacity={0.8}
                  textStyle={{color:'red'}}
              />
          </View>
      );
    }
```

### app全局储存数据（storage）

#### 例如: react-native-storage 组件

可前往 [react-native-storage 组件github官网](https://github.com/sunnylqm/react-native-storage/blob/master/README-CHN.md) 查看详细教程 <br />
[react-native-storage 封装](https://blog.csdn.net/zach_zhou/article/details/72654690)

- 1. 安装

``` shell
  npm install react-native-storage --save

```

- 2.导入

``` javascript
import Storage from 'react-native-storage';
// 请勿使用require('react-native-storage')语法, 否则在react native 0.16之后的版本中会报错.
```
- 3.初始化

``` javascript
  import Storage from 'react-native-storage';
  import { AsyncStorage } from 'react-native';

  var storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,
      
    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: 1000 * 3600 * 24,
      
    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,
      
    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是在任何时候，直接对storage.sync进行赋值修改
    // 或是写到另一个文件里，这里require引入
    sync: require('你可以另外写一个文件专门处理sync')  
      
  })  
    
  // 最好在全局范围内创建一个（且只有一个）storage实例，方便直接调用
    
  // 对于web
  // window.storage = storage;
    
  // 对于react native
  // global.storage = storage;

  // 这样，在此**之后**的任意位置即可以直接调用storage
  // 注意：全局变量一定是先声明，后使用
  // 如果你在某处调用storage报错未定义
  // 请检查global.storage = storage语句是否确实已经执行过了

```
不了解全局变量的使用？请点这里 [https://github.com/sunnylqm/react-native-storage/issues/29](https://github.com/sunnylqm/react-native-storage/issues/29)

- 4.保存、读取和删除

``` javascript
  // 使用key来保存数据（key-only）。这些数据一般是全局独有的，需要谨慎单独处理的数据
  // 批量数据请使用key和id来保存(key-id)，具体请往后看
  // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
  storage.save({
    key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
    data: { 
      from: 'some other site',
      userid: 'some userid',
      token: 'some token'
    },
    
    // 如果不指定过期时间，则会使用defaultExpires参数
    // 如果设为null，则永不过期
    expires: 1000 * 3600
  });
  
  // 读取
  storage.load({
    key: 'loginState',
    
    // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
    autoSync: true,
    
    // syncInBackground(默认为true)意味着如果数据过期，
    // 在调用sync方法的同时先返回已经过期的数据。
    // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
    syncInBackground: true,
    
    // 你还可以给sync方法传递额外的参数
    syncParams: {
	extraFetchOptions: {
	// 各种参数
	},
	someFlag: true,
    },
  }).then(ret => {
    // 如果找到数据，则在then方法中返回
    // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
    // 你只能在then这个方法内继续处理ret数据
    // 而不能在then以外处理
    // 也没有办法“变成”同步返回
    // 你也可以使用“看似”同步的async/await语法
    
    console.log(ret.userid);
    this.setState({ user: ret });
  }).catch(err => {
    //如果没有找到数据且没有sync方法，
    //或者有其他异常，则在catch中返回
	console.warn(err.message);
	switch (err.name) {
	    case 'NotFoundError':
	        // TODO;
	        break;
        case 'ExpiredError':
            // TODO
            break;
	}
  })
```
``` javascript
    // 使用key和id来保存数据，一般是保存同类别（key）的大量数据。
    // 所有这些"key-id"数据共有一个保存上限（无论是否相同key）
    // 即在初始化storage时传入的size参数。
    // 在默认上限参数下，第1001个数据会覆盖第1个数据。
    // 覆盖之后，再读取第1个数据，会返回catch或是相应的sync方法。
    var userA = {
      name: 'A',
      age: 20,
      tags: [
        'geek',
        'nerd',
        'otaku'
      ]
    };

    storage.save({
      key: 'user',  // 注意:请不要在key中使用_下划线符号!
      id: '1001',   // 注意:请不要在id中使用_下划线符号!
      data: userA,
      expires: 1000 * 60   
    });
    
    //load 读取
    storage.load({
      key: 'user',
      id: '1001'
    }).then(ret => {
      // 如果找到数据，则在then方法中返回
      console.log(ret.userid);
    }).catch(err => {
      // 如果没有找到数据且没有sync方法，
      // 或者有其他异常，则在catch中返回
    console.warn(err.message);
    switch (err.name) {
        case 'NotFoundError':
            // TODO;
            break;
          case 'ExpiredError':
              // TODO
              break;
    }
    })

    // --------------------------------------------------

    // 获取某个key下的所有id(仅key-id数据)
    storage.getIdsForKey('user').then(ids => {
        console.log(ids);
    });

    // 获取某个key下的所有数据(仅key-id数据)
    storage.getAllDataForKey('user').then(users => {
        console.log(users);
    });

    // !! 清除某个key下的所有数据(仅key-id数据)
    storage.clearMapForKey('user');

    // --------------------------------------------------  

    // 删除单个数据
    storage.remove({
      key: 'lastPage'
    });
    storage.remove({
      key: 'user',
      id: '1001'
    });

    // !! 清空map，移除所有"key-id"数据（但会保留只有key的数据）
    storage.clearMap();
```

- 5.同步远程数据（刷新）

``` javascript
    storage.sync = {
      // sync方法的名字必须和所存数据的key完全相同
      // 方法接受的参数为一整个object，所有参数从object中解构取出
      // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
      user(params){
        let { id, resolve, reject, syncParams: { extraFetchOptions, someFlag } } = params;
        fetch('user/', {
          method: 'GET',
          body: 'id=' + id,
          ...extraFetchOptions,
        }).then(response => {
          return response.json();
        }).then(json => {
          //console.log(json);
          if(json && json.user){
            storage.save({
              key: 'user',
              id,
              data: json.user
            });
            
            if (someFlag) {
              // 根据syncParams中的额外参数做对应处理
            }
            
            // 成功则调用resolve
            resolve && resolve(json.user);
          }
          else{
            // 失败则调用reject
            reject && reject(new Error('data parse error'));
          }
        }).catch(err => {
          console.warn(err);
          reject && reject(err);
        });
      }
    }
    //有了上面这个sync方法，以后再调用storage.load时，如果本地并没有存储相应的user，那么会自动触发storage.sync.user去远程取回数据并无缝返回。
    storage.load({
      key: 'user',
      id: '1002'
    }).then(...)
```

- 6.读取批量数据

``` javascript
  // 使用和load方法一样的参数读取批量数据，但是参数是以数组的方式提供。
  // 会在需要时分别调用相应的sync方法，最后统一返回一个有序数组。
  storage.getBatchData([
    { key: 'loginState' },
    { key: 'checkPoint', syncInBackground: false },
    { key: 'balance' },
    { key: 'user', id: '1009' }
  ])
  .then(results => {
    results.forEach( result => {
      console.log(result); 	
    })
  })
    
  //根据key和一个id数组来读取批量数据
  storage.getBatchDataWithIds({
    key: 'user', 
    ids: ['1001', '1002', '1003']
  })
  .then( ... )
```

这两个方法除了参数形式不同，还有个值得注意的差异。getBatchData会在数据缺失时挨个调用不同的sync方法(因为key不同)。但是getBatchDataWithIds却会把缺失的数据统计起来，将它们的id收集到一个数组中，然后一次传递给对应的sync方法(避免挨个查询导致同时发起大量请求)，所以你需要在服务端实现通过数组来查询返回，还要注意对应的sync方法的参数处理（因为id参数可能是一个字符串，也可能是一个数组的字符串）。

#### realm

- 1.安装

``` shell
  npm install --save realm
  react-native link realm
```

- 2.使用方法：

  [realm文档](https://realm.io/docs/javascript/latest)

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

