import { View,Button, Text } from 'react-native'
import React from 'react'
import { useTranslation, initReactI18next } from 'react-i18next';
import english from "../translate/english.json"
import nepali from "../translate/nepali.json"
import i18n from 'i18next';
import { useNavigation } from '@react-navigation/native';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: english },
      fr: { translation: nepali },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

const Language = () => {
  const navigation = useNavigation()
    const { t, i18n } = useTranslation();
   const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
    const submitLanguage = () => {
      navigation.navigate('home')
        console.log("navigating to home");
      }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{t('welcome')}</Text>
      <Text>{t('greeting')}</Text>
      <Button title="Switch to English" onPress={() => changeLanguage('en')} />
      <Button title="Switch to French" onPress={() => changeLanguage('fr')} />
      <Button title='Next' onPress={submitLanguage}/>
    </View>
  )
}

export default Language