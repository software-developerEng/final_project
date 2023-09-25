//@ts-check
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Stack, useGlobalSearchParams, usePathname, useRouter,  } from 'expo-router'
import { Text, SafeAreaView } from 'react-native'
import axios from 'axios'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS, SIZES, icons } from '../../constants'
import { NearbyJobCard, ScreenHeaderBtn } from '../../components'
import styles from '../../styles/search'

const JobSearch = () => {
    const params = useGlobalSearchParams();
    const router = useRouter()
    console.log({params});
    const [searchResult, setSearchResult] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [page, setPage] = useState(1);
    // console.log({params});
    const handleSearch = async () => {
        setSearchLoader(true);
        setSearchResult([])

        try {
            // const options = {
            //     method: "GET",
            //     url: `http://192.168.195.99:8000/search/:query`,
            //     // headers: {
            //     //     "X-RapidAPI-Key": '554c73a57emshe03124f2d676351p1edce4jsn4aa7d0fb189a',
            //     //     "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
            //     // },
            //     params: {
            //         query: params.id,
            //         page: page.toString(),
            //     },
            // };
            const token = await AsyncStorage.getItem('access_token');
            console.log("before axios", token);
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            
            const response = await axios.get(`http://192.168.1.3:8000/users/search/${params.id}`, 
            config
            )
            // request(options);
            console.log({ data: response.data.users });
            let users = response.data.users
            let orgs = response.data.organizations
            let searchResult = [...users,...orgs]
            setSearchResult(searchResult);
        } catch (error) {
            setSearchError(error);
            console.log(error);
        } finally {
            setSearchLoader(false);
        }
    };

    const handlePagination = (direction) => {
        if (direction === 'left' && page > 1) {
            setPage(page - 1)
            handleSearch()
        } else if (direction === 'right') {
            setPage(page + 1)
            handleSearch()
        }
    }

    useEffect(() => {
        handleSearch()
    }, [])
    console.log({searchResult});
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
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

            <FlatList
                data={searchResult}
                renderItem={({ item }) => (
                    <NearbyJobCard
                    item={item}
                    onPress={()=> router.push( `/(tabs)/Search/donation/${item?._id}`)}
                    />
                )}
                keyExtractor={(item,id) => `${id}`}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>{params.id}</Text>
                            <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
                        </View>
                        <View style={styles.loaderContainer}>
                            {searchLoader ? (
                                <ActivityIndicator size='large' color={COLORS.primary} />
                            ) : searchError && (
                                <Text>Oops something went wrong</Text>
                            )}
                        </View>
                    </>
                )}
                ListFooterComponent={() => (
                    <View style={styles.footerContainer}>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('left')}
                        >
                            <Image
                                source={icons.chevronLeft}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <View style={styles.paginationTextBox}>
                            <Text style={styles.paginationText}>{page}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('right')}
                        >
                            <Image
                                source={icons.chevronRight}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default JobSearch