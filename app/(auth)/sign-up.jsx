import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { React, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import { images } from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { createUser } from '../../lib/appwrite.js'

const SignUp = () => {
    const [form, setform] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = async () => {
        try {
            if (!form.username || !form.email || !form.password) {
                Alert.alert('Error', 'Please fill in all the fields')
            }

            setIsSubmitting(true)

            const result = await createUser(form.email, form.username, form.password)
            console.log(result)

            // set it to global state

            router.replace('/home')
        } catch (error) {
            console.log(error.message)
            Alert.alert('Error', error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[85vh] px-4 my-6" >
                    <Image
                        source={images.logo}
                        resizeMode='contain'
                        className="w-[115px] h-[35px]"
                    />
                    <Text className="text-2xl text-semibold font-psemibold text-white mt-10">Sign Up to Aora</Text>

                    <FormField
                        title="Username"
                        value={form.username}
                        handleChangeText={(e) => setform({ ...form, username: e })}
                        otherStyles="mt-7"
                    />

                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setform({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setform({ ...form, password: e })}
                        otherStyles="mt-7"
                    />

                    <CustomButton
                        title="Sign Up"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-gray-100 text-lg font-pregular">Have an account already?</Text>
                        <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Sign in</Link>
                    </View>
                </View >
            </ScrollView >
        </SafeAreaView >
    )
}

export default SignUp