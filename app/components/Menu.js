// Note: this is not finished, only shows menu for now
//menu options not functional
import React, {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Component,
  PropTypes
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logOut } from '../actions/action_user';
import Button from 'react-native-button';


const window = Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});

class Menu extends Component {

  render() {
    const { user, logOut } = this.props;
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri }}/>
          {Object.keys(user).length > 1 ? <Text style={styles.name}>Hi,{user.name}!</Text>: <Text> Hi! </Text>}
        </View>


        <Text
          onPress={() => this.props.onItemSelected('Settings')}
          style={styles.item}>
          Settings
        </Text>

        <Button
          onPress={() => logOut()}
          style={styles.item}>
          Log Out
        </Button>

      </ScrollView>
    );
  }
};

Menu.propTypes = {
    onItemSelected: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps, {logOut})(Menu);
