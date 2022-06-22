import React from "react";
import {View, StyleSheet, FlatList} from "react-native";
import {Card} from "react-native-elements";
import axios from "axios";
import {RFValue} from "react-native-responsive-fontsize";

export default class PopularMoviesScreen extends Component{
constructor(Props){
  super(Props);
  this.state = {
    data: []
  };
}

ComponentDidMount(){
  this.getData();
}

timeConvert(num){
  var hours = Math.floor(num/60);
  var minutes = num % 60;
  return `${hours} hrs ${minutes} mins`;
}
getData = () => {
  const url = "https://localhost:5000/popular-movies";
  axios
  .get(url)
  .then(async response => {
    this.setState({data: response.data.data});
  })
  .catch(error => {
    console.log(error.message);
  });
};

keyExtractor = (item, index) => index.toString();

renderItems = ({item, index}) => {
  return(
    <Card 
    key = {`Card-{index}`}
    image = {{uri: item.poster_link}}
    imageProps = {{resizeMode: "cover"}}
    featuredTitle = {item.title}
    containerStyle = {styles.cardContainer}
    featuredTitleStyle = {styles.title}
    featuredSubTitle = {item.release_date.split}
    
    />
  )
}

render(){
  const {data} = this.state;
  return(
    <View style= {styles.container}>
      <FlatList
       data= {data}
       keyExtractor = {this.keyExtractor}
       renderItems = {this.renderItems}
       />


    </View>
  );
}

}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#ffffff"
  },

  title:{
    color: "#ffffff",
    alignSelf: "flex-start",
    paddingLeft: RFValue(15),
    fontSize: RFValue(25),
    marginTop: RFValue(65)
  },

  subTitle:{
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: RFValue(15),
    fontSize: RFValue(25)
  },

  cardContainer:{
    flex:1,
    borderRadius: RFValue(10),
    justifyContent: "center",
    height: RFValue(110),
    marginBottom: RFValue(20),
  }

});