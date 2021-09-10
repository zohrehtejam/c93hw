import * as React from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Header, SearchBar} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import db from '../config'
import { RFValue } from 'react-native-responsive-fontsize';

export default class SearchScreen extends React.Component{

    constructor()
    {
        super();
        this.state = {
            searchedText: '',
            allDetails: [],
            lastVisibleDetail: null
        }
    }

    searchTransaction = async (text) => {
        var enteredText = text;
        
            const transactions = await db.collection('details').where("bankName", "==", enteredText).get();
            transactions.docs.map((doc)=>{
                this.setState({
                    allDetails: [...this.state.allDetails, doc.data()],
                    lastVisibleDetail: doc
                })
            })

            const transaction = await db.collection('details').where("accountNo", "==", enteredText).get();
            transaction.docs.map((doc)=>{
                this.setState({
                    allDetails: [...this.state.allDetails, doc.data()],
                    lastVisibleDetail: doc
                })
            })
        
  
            }
    

    render()
    {
        return(
            <SafeAreaProvider>
                <View>
                    <Header
                        backgroundColor = {''}
                        centerComponent = 
                        {{
                            text: 'Details',
                            style: { color: '#fff', fontSize: 20 },
                        }}
                    />

                    <SearchBar 
                    style = {styles.bar}
                    placeholder = "Search Details..."
                    onChangeText = {(text) => {
                        this.setState({
                            searchedText: text
                        })
                    }}
                    value = {this.state.searchedText}
                    />

                    <TouchableOpacity
                    style = {styles.searchButton}
                    onPress = {() => {
                        this.searchTransaction(this.state.searchedText)
                    }}
                    >
                        <Text>Search</Text>
                    </TouchableOpacity>

                    <View>
                        <ScrollView>
                            {this.state.allDetails.map((detail, index)=> {
                               return(
                                   <View key = {index} style = {{borderBottomWidth: 2}}>
                                       <Text> {"BankName: " + detail.bankName} </Text>
                                       <Text> {"AccountNo: " + detail.accountNo} </Text>
                                       <Text> {"BankCode :" + detail.bankCode}</Text>
                                   </View>
                               ) 
                            })
                            }
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bar: {
        borderWidth: 2,
        height: 30,
        width: 300,
        paddingLeft: 10,
    },
    searchButton: {
        
        width: RFValue(250),
        height: RFValue(50),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(30),
        backgroundColor: "rgb(32, 137, 220)",
        padding:20,
        margin:50,  
        

        
    },
})