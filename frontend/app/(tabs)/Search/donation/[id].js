import { FontAwesome, Ionicons } from "@expo/vector-icons"
import React, { useEffect, useState } from 'react'
import { Button, Dimensions, Pressable, ScrollView, Text, View } from 'react-native'
import { DateTime } from "luxon";
import { Stack, router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { ScreenHeaderBtn } from "../../../../components";
import { COLORS, icons } from "../../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Donation = () => {
    let params = useLocalSearchParams()
    console.log({ params });
    const [org, setOrg] = useState()
    const [availableTimeSlots,setAvailableTimeSlots]=useState()

    const getOrgDetails =async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            const data = await axios.get("http://192.168.1.3:8000/users/getOrg/" + params.id, {
                'headers':{
                    'Authorization' : `Bearer ${token}`
                  }
            })
            console.log({ data: data.data });
            setOrg(data.data.organizations)
        } catch (error) {
            console.log({error});
        }
    }
    const getAvailableSlots = async () => {
        
        try {
            const token = await AsyncStorage.getItem('access_token');
            console.log("hi");
            const data = await axios.get("http://192.168.1.3:8000/users/available-time-slots/" + params.id, {
                'headers':{
                    'Authorization' : `Bearer ${token}`
                  }
            })
            console.log({ getAvailableSlots: data.data });
            setAvailableTimeSlots(data.data)
        } catch (error) {
            console.log({error});
        }
    }
    
    const gettoken = async () => {
        try {
          const token = await AsyncStorage.getItem('access_token');
          console.log('Access Token:', token);
          setToken(token);
        } catch (error) {
          console.log('Error retrieving token:', error);
        }
    };
    
    useEffect(() => {
        getOrgDetails()
        getAvailableSlots()
        gettoken()
    }, [])
    
    const [selected, setSelected] = useState("about")
    const [showCalendar, setShowCalendar] = useState(false)
    const [time, setTime] = useState("")
    const [date, setDate] = useState("")
    const [selectedActivity,setSelectedActivity]=useState()
    const [token, setToken] = useState("")     
 

    const pickAppointment = async () => {

        try {
            let user = await AsyncStorage.getItem('user');
            user = JSON.parse(user)
            console.log({ token });
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                data: {
                    timeSlot: selectedActivity?._id,
                    organization: params?.id,
                    user : user?._id
                }
            };
            const data = await axios.post("http://192.168.1.3:8000/users/appointments", config)
            console.log({ pickAppointment: data.data });
            // setAvailableTimeSlots(data.data)
        } catch (error) {
            console.log({error});
        }
    }

    return (
        <ScrollView style={{ backgroundColor: "white", padding: 20, flex: 1 }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerTitle: "",
                }}
            />
            <View style={{
                flexDirection: 'row',
                backgroundColor: "white",
                marginVertical: 20,
                padding: 5,
                borderRadius: 10,
                justifyContent: 'space-between',
                elevation:5

            }}>
                <FontAwesome
                    name="users"
                    size={40}
                    color={"#259CD5"}
                />
                <Text style={{ fontSize: 30, color: "#259CD5" }}>
                    {"SOS CHILDREN'S \n VILLAGES \n LEBANON"}
                </Text>
            </View>

            <Text style={{ color: "#000", alignSelf: 'center', marginVertical: 20, fontSize: 40 }}>{org?.name} LEBANON</Text>


            <View style={{
                paddingHorizontal: 20,
                alignSelf: 'center',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 50,
                flexDirection: 'row',
                backgroundColor: "white",
                width: Dimensions.get("window").width * 0.8,
                paddingVertical: 10,
                marginBottom: 10,
                elevation: 5,
                borderWidth:1
            }}>
                <Pressable onPress={() => setSelected("about")} style={{ backgroundColor: selected == "about" ? "#259CD5" : "white", borderRadius: 20 }}>
                    <Text style={{ color: selected == "about" ? "white" : "#259CD5", paddingHorizontal: 5, }}>ABOUT</Text>
                </Pressable>
                <Pressable onPress={() => setSelected("activity")} style={{ backgroundColor: selected == "activity" ? "#259CD5" : "white", borderRadius: 20 }}>
                    <Text style={{ color: selected == "activity" ? "white" : "#259CD5", paddingHorizontal: 5 }}>Activity</Text>
                </Pressable>

            </View>

            {selected == "about" && showCalendar == false ?
                <View>
                    <View style={{
                        backgroundColor: "white",
                        marginHorizontal: 20,
                        padding: 20,
                        borderRadius: 20
                    }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Bio</Text>
                        <Text style={{ alignSelf: 'center', textAlign: 'center', }} >{org?.description ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt voluptas officia eaque odit placeat, amet iure veniam accusantium voluptatibus  fuga voluptatum vitae distinctio et laborum nam cupiditate exercitationem impedit dolore, deserunt animi autem reprehenderit porro. Dignissimos ducimus enim commodi."}</Text>
                    </View>
                </View>
                : selected == "activity" && showCalendar == false ?
                    <View style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: Dimensions.get("window").width * 0.7,
                        flexDirection: 'row',
                        alignSelf: 'center',
                        height: 300
                    }}>
                        <Pressable style={{ justifyContent: 'center', alignItems: 'center' }} >
                            <FontAwesome name="credit-card" size={70} color="#259CD5" />
                            <Text>Donate</Text>
                        </Pressable>
                        <Pressable style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => setShowCalendar(true)}>
                            <Ionicons name="ios-earth" size={70} color="#259CD5" />
                            <Text>Help Out</Text>
                        </Pressable>
                    </View>
                    :
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width:"100%",
                        alignSelf: 'center',
                        paddingHorizontal:20
                    }}>
                        <ScrollView style={{ alignSelf:'flex-start',marginBottom:20,width:"100%"}}>
                            {availableTimeSlots && availableTimeSlots?.map((item) => {
                                let day = DateTime.fromISO(item.startTime).setZone("Asia/Beirut").toFormat('yyyy-MM-dd') 
                                let startTime = DateTime.fromISO(item.startTime).setZone("Asia/Beirut").toFormat("HH:mm a") 
                                let endTime = DateTime.fromISO(item.endTime).setZone("Asia/Beirut").toFormat("HH:mm a") 
                                return (
                                    <Pressable onPress={() => {
                                        setDate(day)
                                        setTime(startTime)
                                        setSelectedActivity(item)
                                    }} key={item._id} style={{padding:5,backgroundColor: selectedActivity?.startTime == item.startTime ?"#259cd5": "white",borderRadius:10,marginBottom:10,elevation:5,}}>
                                        <Text style={{paddingHorizontal:10,marginBottom:5,color:selectedActivity?.startTime != item.startTime ?"#259cd5":"white"}}><Text style={{color:"#000"}}>Title :</Text>{item.titleOfActivity }</Text>
                                        <Text style={{paddingHorizontal:10,marginBottom:5,color:selectedActivity?.startTime != item.startTime ?"#259cd5":"white"}}><Text style={{color:"#000"}}>Day : </Text>{day}</Text>
                                        <Text style={{paddingHorizontal:10,marginBottom:5,}}>From : <Text style={{color:selectedActivity?.startTime != item.startTime ?"#259cd5":"white"}}>{startTime}</Text> <Text style={{marginLeft:10}}> To : <Text style={{color:selectedActivity?.startTime != item.startTime ?"#259cd5":"white"}}>{endTime} </Text> </Text></Text>
                                        
                                    </Pressable>
                                )
                            })}
                        </ScrollView>

                        {time.length!=0 && date.length!=0 &&<Button onPress={pickAppointment} title={`Pick Your Meeting at ${time} on ${date}`}/>}
                    </View>
            }

        </ScrollView>
    )
}

export default Donation