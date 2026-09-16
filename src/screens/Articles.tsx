import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Share,
  Text,
  View,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { articles, Article } from '../data/content';
import { RootParamList } from '../navigation/types';
import { useStorage } from '../state/Storage';
import { Button, Header, Icon } from '../components/UI';
import { colors, styles as s } from '../theme';
export function ArticleCard({ article }: { article: Article }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const { data, toggleFavorite } = useStorage();
  const saved = data.favorites.includes(article.id);
  return (
    <View style={s.card}>
      <Image source={article.image} style={s.image} />
      <View style={{ padding: 14, gap: 12 }}>
        <Tag text={article.category} />
        <Text style={s.subtitle}>{article.title}</Text>
        <Text style={s.body}>{article.description}</Text>
        <View style={s.row}>
          <View style={{ flex: 1 }}>
            <Button
              title="Read"
              onPress={() => navigation.navigate('Article', { id: article.id })}
            />
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Share ${article.title}`}
            onPress={() => {
              Share.share({
                title: article.title,
                message: `${article.title}\n\n${article.paragraphs.join(
                  '\n\n',
                )}\n\nBooks Roots Archive`,
              }).catch(() =>
                Alert.alert('Unable to share', 'Please try again.'),
              );
            }}
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: colors.line,
              borderRadius: 5,
            }}
          >
            <Icon name="share" size={19} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              saved ? 'Remove from favorites' : 'Add to favorites'
            }
            accessibilityState={{ selected: saved }}
            onPress={() => toggleFavorite(article.id)}
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: colors.gold,
              borderRadius: 5,
            }}
          >
            <Icon
              name="bookmark"
              color={colors.gold}
              filled={saved}
              size={19}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
function Tag({ text }: { text: string }) {
  return (
    <View
      style={{
        alignSelf: 'flex-start',
        backgroundColor: '#AD2528',
        borderRadius: 2,
        paddingHorizontal: 8,
        paddingVertical: 4,
      }}
    >
      <Text style={{ fontSize: 9, letterSpacing: 1, color: colors.text }}>
        {text}
      </Text>
    </View>
  );
}
export function ArticlesScreen() {
  return (
    <View style={s.screen}>
      <Header title="Articles" caption="Book history" />
      <FlatList
        data={articles}
        keyExtractor={item => item.id}
        contentContainerStyle={s.content}
        renderItem={({ item }) => <ArticleCard article={item} />}
      />
    </View>
  );
}
export function FavoritesScreen() {
  const { data } = useStorage();
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const saved = articles.filter(a => data.favorites.includes(a.id));
  return (
    <View style={s.screen}>
      <Header title="Favorites" />
      {saved.length ? (
        <FlatList
          data={saved}
          keyExtractor={a => a.id}
          contentContainerStyle={s.content}
          renderItem={({ item }) => <ArticleCard article={item} />}
        />
      ) : (
        <ScrollView
          contentContainerStyle={[
            s.content,
            {
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 24,
            },
          ]}
        >
          <Image
            source={require('../assets/image-Photoroom (37) 1.png')}
            style={{ width: 220, height: 250, resizeMode: 'contain' }}
          />
          <Text style={[s.title, { textAlign: 'center' }]}>
            No Favorite Articles Yet
          </Text>
          <Text style={[s.body, { textAlign: 'center' }]}>
            Save articles you find compelling by tapping the bookmark icon. They
            will appear here for quick reference.
          </Text>
          <Button
            title="Browse articles"
            onPress={() => navigation.navigate('Main', { screen: 'Articles' })}
          />
        </ScrollView>
      )}
    </View>
  );
}
export function ArticleScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootParamList, 'Article'>) {
  const article = articles.find(a => a.id === route.params.id);
  const { data, toggleFavorite } = useStorage();
  if (!article) {
    return (
      <View style={s.content}>
        <Text style={s.title}>Article unavailable</Text>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }
  const index = articles.indexOf(article);
  return (
    <View style={s.screen}>
      <View
        style={[
          s.row,
          { padding: 16, borderBottomWidth: 1, borderColor: colors.line },
        ]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back to articles"
          onPress={() => navigation.goBack()}
          style={[s.row, { flex: 1, minHeight: 44 }]}
        >
          <Icon name="back" size={18} />
          <Text style={[s.label, { color: colors.text }]}>Articles</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            data.favorites.includes(article.id)
              ? 'Remove from favorites'
              : 'Add to favorites'
          }
          onPress={() => toggleFavorite(article.id)}
          style={{ padding: 12 }}
        >
          <Icon
            name="bookmark"
            color={colors.gold}
            filled={data.favorites.includes(article.id)}
          />
        </Pressable>
      </View>
      <ScrollView key={article.id} contentContainerStyle={s.content}>
        <Image
          source={article.image}
          style={[
            s.image,
            { borderWidth: 1, borderColor: colors.gold, borderRadius: 3 },
          ]}
        />
        <Tag text={article.category} />
        <Text style={s.title}>{article.title}</Text>
        <Text style={s.label}>
          {article.date} — {article.category}
        </Text>
        <View style={s.divider} />
        {article.paragraphs.map(p => (
          <Text key={p} style={[s.body, { fontSize: 16, lineHeight: 27 }]}>
            {p}
          </Text>
        ))}
        <Button
          title={
            index < articles.length - 1 ? 'Next article' : 'Back to articles'
          }
          onPress={() =>
            index < articles.length - 1
              ? navigation.replace('Article', { id: articles[index + 1].id })
              : navigation.goBack()
          }
        />
      </ScrollView>
    </View>
  );
}
